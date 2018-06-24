import {
  SET_DOMAIN_COUNT,
  SET_TASK_COUNT,
  SET_DOMAINS,
  SET_TASKS,
  SET_SELECTED_DOMAIN_INDEX,
  ADD_TASK,
  SET_TASK_SPECIFICATIONS,
  ADD_TASK_SPECIFICATION,
  SET_TOKEN_ADDRESS,
  SET_TASK_DETAILS,
  SET_SELECTED_TASK_ID,
  SET_WAITING,
  SET_TASK_ROLES
} from "actions/colony";
import { Task, Domain, TaskSpecification } from "models/colony";
import { TaskDetail } from "models/taskDetail";
import { merge } from "ramda";

const initialState = {
  selectedDomainIndex: 0,
  selectedTaskId: -1,
  domainCount: 0,
  taskCount: 0,
  tasks: [] as Task[],
  taskSpecifications: [] as TaskSpecification[],
  taskDetails: [] as TaskDetail[],
  domains: [] as Domain[],
  tokenAddress: "",
  waiting: 0,
  rolesCurrentTask: {}
};

export const colonyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DOMAIN_COUNT:
      return merge(state, { domainCount: action.domainCount });
    case SET_SELECTED_DOMAIN_INDEX:
      return merge(state, { selectedDomainIndex: action.domainIndex });
    case SET_TASK_COUNT:
      return merge(state, { taskCount: action.taskCount });
    case SET_TASKS:
      return merge(state, { tasks: action.tasks });
    case ADD_TASK_SPECIFICATION:
      return merge(state, {
        taskSpecifications: [
          ...state.taskSpecifications,
          action.taskSpecification
        ]
      });
    case SET_TASK_SPECIFICATIONS:
      return merge(state, { taskSpecifications: action.taskSpecifications });
    case ADD_TASK:
      return merge(state, {
        tasks: [...state.tasks, action.task],
        taskCount: state.taskCount + 1
      });
    case SET_DOMAINS:
      return merge(state, { domains: action.domains });
    case SET_TOKEN_ADDRESS:
      return merge(state, { tokenAddress: action.tokenAddress });
    case SET_WAITING:
      return merge(state, {
        waiting: action.waiting ? state.waiting+1 : state.waiting-1
      });
    case SET_SELECTED_TASK_ID:
      return merge(state, { selectedTaskId: action.id });
      case SET_TASK_ROLES: 
      return merge(state, {rolesCurrentTask: action.taskRoles})
    case SET_TASK_DETAILS:
      return merge(state, { taskDetails: action.taskDetails });
    default:
      return state;
  }
};
