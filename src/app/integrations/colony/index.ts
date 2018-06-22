import {
  Task,
  Domain,
  TaskTemplate,
  TaskSpecification,
  Roles
} from "models/colony";

import {
  getTaskSpecification,
  saveTaskSpecification,
  stop as stopEcp,
  init as initEcp
} from "./ecp";

const { providers, Wallet } = require("ethers");
const { default: EthersAdapter } = require("@colony/colony-js-adapter-ethers");
const { TrufflepigLoader } = require("@colony/colony-js-contract-loader-http");

const { default: ColonyNetworkClient } = require("@colony/colony-js-client");
const loader = new TrufflepigLoader();
import { map, isEmpty } from "ramda";

const getNetworkClient = async () => {
  const metaMaskWeb3 = (window as any).web3;
  const isMetaMaskEnabled = () => !!metaMaskWeb3;
  if (!isMetaMaskEnabled()) {
    alert("MetaMask is not enabled.");
    return;
  }

  //const provider = new providers.Web3Provider(metaMaskWeb3.currentProvider);
  const provider = new providers.JsonRpcProvider("http://localhost:8545/");

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
  const colonyClient = await getColonyClient(colonyAddress);
  return Promise.all(
    taskIds.map(
      taskId => colonyClient.getTask.call({ taskId }) as Promise<Task>
    )
  );
};

/* Takes in a TaskTemplate and creates a task */
export const createColonyTask = async ({
  colonyAddress,
  domainId,
  issueData
}: TaskTemplate) => {
  // Initialise the Extended Colony Protocol
  await initEcp();
  console.log("after ecp init");
  const colonyClient = await getColonyClient(colonyAddress);
  console.log("after get colony client");
  // Create a task!
  // taskAttributes are from TaskForm - title, body and url for now
  const specificationHash = await saveTaskSpecification(issueData);

  // Unique, immutable hash on IPFS
  console.log("Specification hash", specificationHash);

  // Create a task in the root domain
  const {
    eventData: { taskId }
  } = await colonyClient.createTask.send({
    specificationHash,
    domainId: domainId
  });

  // Let's take a look at the newly created task
  const task = await colonyClient.getTask.call({ taskId });
  console.log(task);

  // Do some cleanup
  try {
    await stopEcp();
  } catch (e) {}
  return task;
};

export const getTaskSpecifications = async (
  tasks: Task[]
): Promise<TaskSpecification[]> => {
  await initEcp();
  const result = await Promise.all<TaskSpecification>(
    map((task: any) => getTaskSpecification(task.specificationHash), tasks)
  );

  try {
    await stopEcp();
  } catch (e) {
    console.log("Error: " + e);
  }
  return result;
};

export const getDomains = async (
  colonyAddress: string,
  domainIds: number[]
): Promise<Domain[]> => {
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

/**
 * Returns true if the operation is successfully.
 */
const setRole = (colonyAddress: string, taskId: number) => async (
  roleName: string,
  address: string
): Promise<boolean> => {
  const colonyClient = await getColonyClient(colonyAddress);
  const { successful } = await colonyClient.setTaskRoleUser.send({
    taskId,
    role: roleName,
    user: address
  });
  return successful;
};

export const setRoles = async (
  colonyAddress: string,
  taskId: number,
  newRoles: Roles
) => {
  // promises has to be resolved in series for the nonce to be correct, and
  // we have to set the manger last, because only the manager can set the other roles

  const roleSetter = setRole(colonyAddress, taskId);
  const roles = ["EVALUATOR", "WORKER", "MANAGER"];
  for (const roleIndex in roles) {
    if (!isEmpty(newRoles[roles[roleIndex]])) {
      try {
        await roleSetter(roles[roleIndex], newRoles[roles[roleIndex]]);
      } catch (e) {
        console.log(
          "Error: head problems with setting a role on the task: " + e
        );
      }
    }
  }
};
