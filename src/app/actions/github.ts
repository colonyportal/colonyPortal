import { getIssues } from "../integrations/github";
import { Issue } from "../models/github";

export const FETCH_ISSUES = "FETCH_ISSUES";
export const SET_ISSUES = "SET_ISSUES";
export const SET_SELECTED_ISSUES_INDEX = "SET_SELECTED_ISSUES_INDEX";

export const setIssues = (issues: Issue[]) => ({
  type: SET_ISSUES,
  issues
});

export const setSelectedIssueIndex = (index: number) => ({
  type: SET_SELECTED_ISSUES_INDEX,
  index
});

export const fetchIssues = (token: string) => async (dispatch: any) => {
  const issues = await getIssues(token);
  dispatch(setIssues(issues));
};
