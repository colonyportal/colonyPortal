import { SET_DOMAIN_COUNT, SET_TASK_COUNT } from "app/actions/colony";

const initialState = {
  domainCount: 0,
  taskCount: 0
};

export const colonyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DOMAIN_COUNT:
      return Object.assign({}, state, { domainCount: action.domainCount });
    case SET_TASK_COUNT:
      return Object.assign({}, state, { taskCount: action.taskCount });
    default:
      return state;
  }
};
