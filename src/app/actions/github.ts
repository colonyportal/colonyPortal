import { getIssuesForRepo } from "integrations/github";
import { GithubIssue } from "models/github";

export const FETCH_ISSUES = "FETCH_ISSUES";
export const SET_ISSUES = "SET_ISSUES";
export const SET_SELECTED_ISSUES_INDEX = "SET_SELECTED_ISSUES_INDEX";
export const SET_DISPLAY_GITHUB_ISSUE_DIALOG = "SET_DISPLAY_GITHUB_ISSUE_DIALOG"

export const setIssues = (issues: GithubIssue[]) => ({
  type: SET_ISSUES,
  issues
});

export const setSelectedIssueIndex = (index: number) => ({
  type: SET_SELECTED_ISSUES_INDEX,
  index
});

export const setDisplayGithubIssueDialog = (show: boolean) => ({
  type: SET_DISPLAY_GITHUB_ISSUE_DIALOG,
  show
})

export const fetchIssues = (owner: string, repo:string) => async (dispatch: any) => {
  const issues = await getIssuesForRepo(owner, repo);
  dispatch(setIssues(issues));
};
