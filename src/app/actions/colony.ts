import {
  getDomainCount,
  getTaskCount,
  getDomains,
  getTasks,
  createColonyTask,
  getTaskSpecifications
} from "integrations/colony";
import { Task, Domain, TaskTemplate, TaskSpecification } from "models/colony";
import { range } from "ramda";

export const FETCH_DOMAIN_COUNT = "FETCH_DOMAIN_COUNT";
export const SET_DOMAIN_COUNT = "SET_DOMAIN_COUNT";
export const SET_SELECTED_DOMAIN_INDEX = "SET_SELECTED_DOMAIN_INDEX";
export const ADD_TASK = "ADD_TASK";
export const ADD_TASK_SPECIFICATION = "ADD_TASK_SPECIFICATION"
export const SET_TASK_COUNT = "SET_TASK_COUNT";
export const SET_DOMAINS = "SET_DOMAINS";
export const SET_TASKS = "SET_TASKS";
export const SET_TASK_SPECIFICATIONS = "SET_TASK_SPECIFICATIONS"
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

export const addTask = (task: Task) => ({
  type: ADD_TASK,
  task
});

export const addTaskSpecification = (taskSpecification: TaskSpecification) => ({
  type: ADD_TASK_SPECIFICATION,
  taskSpecification
});

export const setTaskSpecifications = (taskSpecifications: TaskSpecification[]) => ({
  type: SET_TASK_SPECIFICATIONS,
  taskSpecifications
});

export const setDomains = (domains: Domain[]) => ({
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
  dispatch(setDomains(domains));
};

export const fetchAllTasks = (colonyAddress: string) => async (
  dispatch: any
) => {
  const taskCount = await getTaskCount(colonyAddress);
  dispatch(setTaskCount(taskCount));
  const tasks = await getTasks(colonyAddress, range(1, taskCount+1));
  dispatch(setTasks(tasks));
  const taskSpecifications = await getTaskSpecifications(tasks)
  dispatch(setTaskSpecifications(taskSpecifications))
};

export const createColonyTaskAndAddItToTaskList = (
  taskTemplate: TaskTemplate
) => async (dispatch: any) => {
  const newTask = await createColonyTask(taskTemplate);
  dispatch(addTask(newTask));
  const newTaskSpecification: any = await getTaskSpecifications([newTask])
  dispatch(addTaskSpecification(newTaskSpecification[0]))
};
