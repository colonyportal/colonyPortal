import { SET_COLONY_ADDRESS, SET_DOMAIN_COUNT } from "app/actions/colony";

const initialState = {
  colonyAddress: "",
  domainCount: -1
};

export const colonyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_COLONY_ADDRESS:
      return Object.assign({}, state, { colonyAddress: action.address });
    case SET_DOMAIN_COUNT:
      return Object.assign({}, state, { domainCount: action.count });
    default:
      return state;
  }
};
