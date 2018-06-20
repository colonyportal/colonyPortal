import {
  SET_DOMAIN_COUNT,
  SET_TASK_COUNT,
  SET_DOMAINS,
  SET_TASKS
} from "app/actions/colony";
import { Task, Domain } from "../models/ColonyModel";
import { merge } from "ramda";

const initialState = {
  domainCount: 0,
  taskCount: 0,
  tasks: [] as Task[],
  domains: [] as Domain[]
};

export const colonyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DOMAIN_COUNT:
      return merge(state, { domainCount: action.domainCount });
    case SET_TASK_COUNT:
      return merge(state, { taskCount: action.taskCount });
    case SET_TASKS:
      return merge(state, { tasks: action.tasks });
    case SET_DOMAINS:
      return merge(state, { domains: action.domains });
    default:
      return state;
  }
};
