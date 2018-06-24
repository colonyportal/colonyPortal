import {
  getDomainCount,
  getTaskCount,
  getDomains,
  getTasks,
  createColonyTask,
  getTaskSpecifications,
  setRoles,
  getColonyToken,
  getTaskPayout
} from "integrations/colony";
import { Task, Domain, TaskTemplate, TaskSpecification } from "models/colony";
import { range } from "ramda";
import { TaskDetail } from "models/taskDetail";

export const FETCH_DOMAIN_COUNT = "FETCH_DOMAIN_COUNT";
export const SET_DOMAIN_COUNT = "SET_DOMAIN_COUNT";
export const SET_SELECTED_DOMAIN_INDEX = "SET_SELECTED_DOMAIN_INDEX";
export const SET_SELECTED_TASK_ID = "SET_SELECTED_TASK_ID";
export const ADD_TASK = "ADD_TASK";
export const ADD_TASK_SPECIFICATION = "ADD_TASK_SPECIFICATION";
export const SET_TASK_COUNT = "SET_TASK_COUNT";
export const SET_DOMAINS = "SET_DOMAINS";
export const SET_TASKS = "SET_TASKS";
export const SET_TASK_SPECIFICATIONS = "SET_TASK_SPECIFICATIONS";
export const CREATE_COLONY_TASK = "CREATE_COLONY_TASK";
export const SET_TOKEN_ADDRESS = "SET_TOKEN_ADDRESS";
export const SET_TASK_DETAILS = "SET_TASK_DETAILS";
export const SET_WAITING = "SET_WAITING";

export const setWaiting = (waiting: boolean) => ({
  type: SET_WAITING,
  waiting
});

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

export const setTaskSpecifications = (
  taskSpecifications: TaskSpecification[]
) => ({
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

export const setSelectedTaskId = (id: number) => ({
  type: SET_SELECTED_TASK_ID,
  id
});

export const setTokenAddress = (tokenAddress: string) => ({
  type: SET_TOKEN_ADDRESS,
  tokenAddress
});

export const setTaskDetails = (taskDetails: TaskDetail[]) => ({
  type: SET_TASK_DETAILS,
  taskDetails
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
  dispatch(setWaiting(true))
  const taskCount = await getTaskCount(colonyAddress);
  dispatch(setTaskCount(taskCount));
  const tasks = await getTasks(colonyAddress, range(1, taskCount + 1));
  dispatch(setTasks(tasks));
  const taskSpecifications = await getTaskSpecifications(tasks);
  dispatch(setTaskSpecifications(taskSpecifications));
  dispatch(setWaiting(false))
};

export const createColonyTaskAndAddItToTaskList = (
  taskTemplate: TaskTemplate
) => async (dispatch: any) => {
  dispatch(setWaiting(true))
  const newTask: Task = await createColonyTask(taskTemplate);
  setRoles(taskTemplate.colonyAddress, newTask.id, taskTemplate.roles);
  dispatch(addTask(newTask));
  const newTaskSpecification: any = await getTaskSpecifications([newTask]);
  dispatch(addTaskSpecification(newTaskSpecification[0]));
  dispatch(setWaiting(false))
};

export const getToken = (colonyAddress: string) => async (dispatch: any) => {
  const tokenAddr = await getColonyToken(colonyAddress);
  dispatch(setTokenAddress(tokenAddr));
};

export const getTaskDetails = (
  colonyAddress: string,
  taskIds: number[],
  tokenAddress: string
) => async (dispatch: any) => {
  const taskDetails = await Promise.all(
    taskIds.map(async id => ({
      taskId: id,
      managerPayout: await getTaskPayout(
        colonyAddress,
        id,
        "MANAGER",
        tokenAddress
      ),
      workerPayout: await getTaskPayout(
        colonyAddress,
        id,
        "WORKER",
        tokenAddress
      ),
      evaluatorPayout: await getTaskPayout(
        colonyAddress,
        id,
        "EVALUATOR",
        tokenAddress
      )
    }))
  );
  dispatch(setTaskDetails(taskDetails));
};
