import { getDomainCount, getTaskCount  } from "../integrations/colony";

export const FETCH_DOMAIN_COUNT = "GET_DOMAIN_COUNT";
export const SET_DOMAIN_COUNT = "SET_DOMAIN_COUNT ";
export const SET_TASK_COUNT = "SET_TASK_COUNT ";

export const setDomainCount = (domainCount: number) => ({
  type: SET_DOMAIN_COUNT,
  domainCount
});

export const setTaskCount = (taskCount: number) => ({
  type: SET_TASK_COUNT,
  taskCount
});

export const fetchDomainCount = (colonyAddress: string) => async (
  dispatch: any,
) => {
  const domainCount = await getDomainCount(colonyAddress)
  dispatch(setDomainCount(domainCount));
};

export const fetchTaskCount = (colonyAddress: string) => async (
  dispatch: any
) => {
  const taskCount = await getTaskCount(colonyAddress)
  dispatch(setTaskCount(taskCount));
}

export const fetchDomain = (colonyAddress: string, domainId: number) => async (
  dispatch: any
) => {

}

export const fetchTask = (colonyAddress: string, domainId: number) => async (
  dispatch: any
) => {

}