const { providers, Wallet } = require("ethers");
const { default: EthersAdapter } = require("@colony/colony-js-adapter-ethers");
const { TrufflepigLoader } = require("@colony/colony-js-contract-loader-http");

// Import the ColonyNetworkClient
const { default: ColonyNetworkClient } = require("@colony/colony-js-client");

// Create an instance of the Trufflepig contract loader
const loader = new TrufflepigLoader();

// Create a provider for local TestRPC (Ganache)
const provider = new providers.JsonRpcProvider("http://localhost:8545/");

const getNetworkClient = async () => {
  // Get the private key from the first account from the ganache-accounts
  // through trufflepig
  const { privateKey } = await loader.getAccount(0);

  // Create a wallet with the private key (so we have a balance we can use)
  const wallet = new Wallet(privateKey, provider);

  // Create an adapter (powered by ethers)
  const adapter = new EthersAdapter({
    loader,
    provider,
    wallet
  });

  // Connect to ColonyNetwork with the adapter!
  const networkClient = new ColonyNetworkClient({ adapter });
  await networkClient.init();
  return networkClient;
};

export const SET_COLONY_ADDRESS = "SET_COLONY_ADDRESS";
export const FETCH_DOMAIN_COUNT = "GET_DOMAIN_COUNT";
export const SET_DOMAIN_COUNT = "SET_DOMAIN_COUNT ";

let colonyClient: any;
let currentColonyAddress: string;

const getColonyClient = async (colonyAddress: string): Promise<any> => {
  if (colonyAddress !== currentColonyAddress || colonyClient != null) {
    const networkClient = await getNetworkClient();
    colonyClient = await networkClient.getColonyClientByAddress(colonyAddress);
  }
  return colonyClient;
};

export const setColonyAddress = (address: string) => ({
  type: SET_COLONY_ADDRESS,
  address
});

export const setDomainCount = (count: number) => ({
  type: SET_DOMAIN_COUNT,
  count
});

export const fetchDomainCount = () => async (
  dispatch: any,
  getState: () => any
) => {
  const colonyClient = await getColonyClient(getState().colonyAddress);
  const { count } = await colonyClient.getDomainCount.call();
  dispatch(setDomainCount(count));
};
