import {
  getDomainCount,
  getTaskCount,
  getDomains,
  getTasks
} from "../integrations/colony";
import { Task, Domain } from "../../../types/colony";
import { range } from "ramda";

export const FETCH_DOMAIN_COUNT = "GET_DOMAIN_COUNT";
export const SET_DOMAIN_COUNT = "SET_DOMAIN_COUNT";
export const SET_TASK_COUNT = "SET_TASK_COUNT";
export const SET_DOMAINS = "SET_DOMAINS";
export const SET_TASKS = "SET_TASKS";

export const setDomainCount = (domainCount: number) => ({
  type: SET_DOMAIN_COUNT,
  domainCount
});

export const setTaskCount = (taskCount: number) => ({
  type: SET_TASK_COUNT,
  taskCount
});

export const addTasks = (tasks: Task[]) => ({
  type: SET_TASKS,
  tasks
});

export const addDomains = (domains: Domain[]) => ({
  type: SET_DOMAINS,
  domains
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
  dispatch(addTasks(tasks));
};
