import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "antd";
// import "../../styles/auth.css";

const AuthPage = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const connectWeb3Auth = useConnect({
    connector: new Web3AuthConnector({
      options: {
        enableLogging: true,
        clientId:
          "BDkHfbxZnIwxozPM9sN5bf4xWeAs1aLC0Md0EE7ZmPAQPseOh0mv0h6j7dzE_ivrDESZcVs8iEeOiSiHNUCt8oM", // Get your own client id from https://dashboard.web3auth.io
        network: "testnet", // web3auth network
        chainId: "0x1", // chainId that you want to connect with
      },
    }),
  });

  const handleAuth = async (service) => {
    if (isConnected) {
      await disconnectAsync();
    }

    let connection;
    let accountWeb3Auto;

    if (service == "metamask") {
      connection = await connectAsync({
        connector: new MetaMaskConnector(),
      });
    }

    if (service == "walletconnect") {
      connection = await connectAsync({
        connector: new WalletConnectConnector({
          options: {
            qrcode: true,
          },
        }),
      });
    }

    if (service == "coinbase") {
      connection = await connectAsync({
        connector: new CoinbaseWalletConnector({
          options: {
            appName: "denetwork.finance",
          },
        }),
      });
    }

    if (service == "web3auth") {
      console.log("env");
      console.log("env", process.env.CLIENT_ID);
      accountWeb3Auto = await connectWeb3Auth.connectAsync();
    }

    const userData = {
      address:
        service != "web3auth" ? connection?.account : accountWeb3Auto.account,
      chain: service != "web3auth" ? connection?.chain.id : "0x1",
      network: "evm",
    };

    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });

    const message = data.message;

    const signature = await signMessageAsync({ message });

    const { url } = await signIn("credentials", {
      message,
      signature,
      redirect: false,
      // callbackUrl: "/profile/user",
      callbackUrl: "/auth/new-user",
    });
    push(url);
  };

  return (
    <div style={{ backgroundColor: "black", color: "white" }} className="vh-100">
      <div className="container pt-3">
        <h3 className="text-center">Web3 Authentication</h3>
        <div className="row">
          <div className="col d-flex justify-content-end">
            <Button
              className="mb-4 p-3 card-login"
              onClick={() => handleAuth("metamask")}
              type="primary"
            >
              <p>Authenticate via Metamask</p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                alt="Login with Metamask"
                srcset="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                className="img-fluid"
              />
            </Button>
          </div>
          <div className="col d-flex justify-content-start">
            <Button
              className="mb-4 p-3 card-login"
              onClick={() => handleAuth("walletconnect")}
              type="primary"
            >
              <p>Authenticate via Wallet Connect</p>
              <img
                src="https://images.opencollective.com/walletconnect/4d377ed/logo/256.png"
                alt="Login with Wallet Connect"
                srcset="https://images.opencollective.com/walletconnect/4d377ed/logo/256.png"
                className="img-fluid"
              />
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-end">
            <Button
              className="mb-4 p-3 card-login"
              onClick={() => handleAuth("coinbase")}
              type="primary"
            >
              <p>Authenticate via Coinbase Wallet</p>
              <img
                src="https://avatars.githubusercontent.com/u/18060234?s=280&v=4"
                alt="Login with Coinbase Wallet"
                srcset="https://avatars.githubusercontent.com/u/18060234?s=280&v=4"
                className="img-fluid"
              />
            </Button>
          </div>
          <div className="col d-flex justify-content-start">
            <Button
              className="mb-4 p-3 card-login"
              onClick={() => handleAuth("web3auth")}
              type="primary"
            >
              <p>Authenticate via Web3Auth</p>
              <img
                src="https://tor.us/images/Web3Auth.svg"
                alt="Login with Web3Auth"
                srcset="https://tor.us/images/Web3Auth.svg"
                className="img-fluid"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
