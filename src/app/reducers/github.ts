import { SET_ISSUES, SET_SELECTED_ISSUES_INDEX } from "actions/github";
import { Issue } from "models/github";
import { merge } from "ramda";

const initialState = {
  issues: [] as Issue[],
  selectedIssueIndex: -1
};

export const githubReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ISSUES:
      return merge(state, { issues: action.issues });
    case SET_SELECTED_ISSUES_INDEX:
      return merge(state, { selectedIssueIndex: action.index });
    default:
      return state;
  }
};
