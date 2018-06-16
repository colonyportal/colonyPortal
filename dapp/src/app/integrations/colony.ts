const { providers, Wallet } = require("ethers");
const { default: EthersAdapter } = require("@colony/colony-js-adapter-ethers");
const { TrufflepigLoader } = require("@colony/colony-js-contract-loader-http");

const { default: ColonyNetworkClient } = require("@colony/colony-js-client");
const loader = new TrufflepigLoader();

const getNetworkClient = async () => {
  const metaMaskWeb3 = (window as any).web3;
  const isMetaMaskEnabled = () => !!metaMaskWeb3;
  if (!isMetaMaskEnabled()) {
    alert("MetaMask is not enabled.");
    return;
  }
  const provider = new providers.Web3Provider(metaMaskWeb3.currentProvider);

  const { privateKey } = await loader.getAccount(0);
  const wallet = new Wallet(privateKey, provider);
  const adapter = new EthersAdapter({
    loader,
    provider,
    wallet
  });
  const networkClient = new ColonyNetworkClient({ adapter });
  await networkClient.init();
  return networkClient;
};

let colonyClient: any;
let currentColonyAddress: string;

const getColonyClient = async (colonyAddress: string): Promise<any> => {
  if (colonyAddress !== currentColonyAddress || colonyClient == null) {
    const networkClient = await getNetworkClient();
    colonyClient = await networkClient.getColonyClientByAddress(colonyAddress);
  }
  return colonyClient;
};

export const getDomainCount = async (colonyAddress: string) => {
  const colonyClient = await getColonyClient(colonyAddress);
  const res = await colonyClient.getDomainCount.call();
  return res.count;
};
