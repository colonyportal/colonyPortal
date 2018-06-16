import { SET_DOMAIN_COUNT } from "app/actions/colony";

const initialState = {
  domainCount: 0
};

export const colonyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DOMAIN_COUNT:
      return Object.assign({}, state, { domainCount: action.domainCount });
    default:
      return state;
  }
};
