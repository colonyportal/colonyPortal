import {
  getDomainCount,
  getTaskCount,
  getDomains,
  getTasks,
  createColonyTask
} from "../integrations/colony";
import { Task, Domain } from "../models/ColonyModel";
import { range } from "ramda";
import { Issue } from "../models/GitHubModel";

export const FETCH_DOMAIN_COUNT = "FETCH_DOMAIN_COUNT";
export const SET_DOMAIN_COUNT = "SET_DOMAIN_COUNT";
export const SET_SELECTED_DOMAIN_INDEX = "SET_SELECTED_DOMAIN_INDEX";
export const SET_TASK_COUNT = "SET_TASK_COUNT";
export const SET_DOMAINS = "SET_DOMAINS";
export const SET_TASKS = "SET_TASKS";
export const CREATE_COLONY_TASK = "CREATE_COLONY_TASK";

export const setDomainCount = (domainCount: number) => ({
  type: SET_DOMAIN_COUNT,
  domainCount
});

export const setTaskCount = (taskCount: number) => ({
  type: SET_TASK_COUNT,
  taskCount
});

export const setTasks = (tasks: Task[]) => ({
  type: SET_TASKS,
  tasks
});

export const addDomains = (domains: Domain[]) => ({
  type: SET_DOMAINS,
  domains
});

export const setDomainIndex = (domainIndex: number) => ({
  type: SET_SELECTED_DOMAIN_INDEX,
  domainIndex
});

export const fetchAllDomains = (colonyAddress: string) => async (
  dispatch: any
) => {
  const domainCount = await getDomainCount(colonyAddress);
  dispatch(setDomainCount(domainCount));
  const domains = await getDomains(colonyAddress, range(0, domainCount));
  dispatch(addDomains(domains));
};

export const fetchAllTasks = (colonyAddress: string) => async (
  dispatch: any
) => {
  const taskCount = await getTaskCount(colonyAddress);
  dispatch(setTaskCount(taskCount));
  const tasks = await getTasks(colonyAddress, range(0, taskCount));
  dispatch(setTasks(tasks));
};

export const createColonyTaskAndRefreshTaskList = (colonyAddress: string, domainId: number, issue: Issue) => async (
  dispatch: any
) => {
  console.log('------')
  console.log('dispatching')
  console.log('------')
  await createColonyTask(colonyAddress, domainId, issue);
  fetchAllTasks(colonyAddress)
};