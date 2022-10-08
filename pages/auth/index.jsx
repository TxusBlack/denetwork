import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

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
            appName: "deworking.finance",
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
      address: service != "web3auth" ? connection?.account : accountWeb3Auto.account,
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
      callbackUrl: "/profile/user",
    });
    push(url);
  };

  return (
    <div className="container-fluid">
      <h3>Web3 Authentication</h3>
      <div className="flex">
        <div className="pb-2">
          <button onClick={() => handleAuth("metamask")}>
            Authenticate via Metamask
          </button>
        </div>
        <div className="pb-2">
          <button onClick={() => handleAuth("walletconnect")}>
            Authenticate via Wallet Connect
          </button>
        </div>
        <div className="pb-2">
          <button onClick={() => handleAuth("coinbase")}>
            Authenticate via Coinbase Wallet
          </button>
        </div>
        <div className="pb-2">
          <button onClick={() => handleAuth("web3auth")}>
            Authenticate via Web3Auth
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
