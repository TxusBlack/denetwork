import Moralis from "moralis";

const config = {
  domain: process.env.APP_DOMAIN,
  statement: "Esta firma es para autenticar tu usuario",
  uri: process.env.NEXTAUTH_URL,
  timeout: 60,
};

const handler = async (req, res) => {
  console.log(req.body)
  const { address, chain, network } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      network,
      ...config,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error });
    console.error(error);
  }
};

export default handler;
