import { SET_ISSUES, SET_SELECTED_ISSUES_INDEX, SET_DISPLAY_GITHUB_ISSUE_DIALOG } from "actions/github";
import { GithubIssue } from "models/github";
import { merge } from "ramda";

const initialState = {
  issues: [] as GithubIssue[],
  selectedIssueIndex: -1,
  showGithubIssueDialog: false
};

export const githubReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ISSUES:
      return merge(state, { issues: action.issues });
    case SET_SELECTED_ISSUES_INDEX:
      return merge(state, { selectedIssueIndex: action.index });
    case SET_DISPLAY_GITHUB_ISSUE_DIALOG:
      return merge(state, { showGithubIssueDialog: action.show });
    default:
      return state;
  }
};
