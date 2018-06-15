const { providers, Wallet } = require("ethers");
const { default: EthersAdapter } = require("@colony/colony-js-adapter-ethers");
const { TrufflepigLoader } = require("@colony/colony-js-contract-loader-http");

const { default: ColonyNetworkClient } = require("@colony/colony-js-client");
const loader = new TrufflepigLoader();
const provider = new providers.JsonRpcProvider("http://localhost:8545/");

const getNetworkClient = async () => {
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

export const SET_COLONY_ADDRESS = "SET_COLONY_ADDRESS";
export const FETCH_DOMAIN_COUNT = "GET_DOMAIN_COUNT";
export const SET_DOMAIN_COUNT = "SET_DOMAIN_COUNT ";

let colonyClient: any;
let currentColonyAddress: string;

const getColonyClient = async (colonyAddress: string): Promise<any> => {
  if (colonyAddress !== currentColonyAddress || colonyClient == null) {
    const networkClient = await getNetworkClient();
    colonyClient = await networkClient.getColonyClientByAddress(colonyAddress);
  }
  return colonyClient;
};

export const setColonyAddress = (address: string) => ({
  type: SET_COLONY_ADDRESS,
  address
});

export const setDomainCount = (domainCount: number) => ({
  type: SET_DOMAIN_COUNT,
  domainCount
});

export const fetchDomainCount = () => async (
  dispatch: any,
  getState: () => any
) => {
  const colonyClient = await getColonyClient(getState().colony.colonyAddress);
  const res = await colonyClient.getDomainCount.call();
  dispatch(setDomainCount(res.count));
};
