import { Task, Domain } from "../models/ColonyModel";
import { Issue } from "../models/GitHubModel";

const ecp = require('./ecp');

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
  //const provider = new providers.JsonRpcProvider('http://localhost:8545/');

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

export const getColonyClient = async (colonyAddress: string): Promise<any> => {
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

export const getTaskCount = async (colonyAddress: string) => {
  const colonyClient = await getColonyClient(colonyAddress);
  const res = await colonyClient.getTaskCount.call();
  return res.count;
};

export const getTasks = async (
  colonyAddress: string,
  taskIds: number[]
): Promise<Task[]> => {
  console.log("getTasks");
  const colonyClient = await getColonyClient(colonyAddress);
  console.log("taskIds: " + taskIds);
  return Promise.all(
    taskIds.map(
      taskId => colonyClient.getTask.call({ taskId }) as Promise<Task>
    )
  );
};

export const createColonyTask = async (colonyAddress: string, domainId: number, issue: Issue) => {
  // Initialise the Extended Colony Protocol
  await ecp.init();
  console.log('after ecp init');
  const colonyClient = await getColonyClient(colonyAddress);
  console.log('after get colony client');
  // Create a task!
  // taskAttributes are from TaskForm - title, body and url for now
  const specificationHash = await ecp.saveTaskSpecification(issue);

  // Unique, immutable hash on IPFS
  console.log('Specification hash', specificationHash);

  // Create a task in the root domain
  // TODO: we need to figure out domainId
  const { eventData: { taskId } } = await colonyClient.createTask.send({ specificationHash, domainId: domainId });

  // Let's take a look at the newly created task
  const task = await colonyClient.getTask.call({ taskId })
  console.log(task);

  // Do some cleanup
  await ecp.stop();
}

export const getDomains = async (
  colonyAddress: string,
  domainIds: number[]
): Promise<Domain[]> => {
  console.log("getDomains");

  const colonyClient = await getColonyClient(colonyAddress);
  return Promise.all(
    domainIds.map(
      domainId =>
        colonyClient.getDomain
          .call({ domainId })
          .then(res => ({ ...res, domainId })) //as Promise<Domain>
    )
  );
};
