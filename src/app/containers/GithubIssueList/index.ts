import { connect } from "react-redux";
import { fetchIssues } from "actions/github";
import IssueList from "../../components/IssueList";
//import {compose} from "ramda"
//import { createColonyTaskAndRefreshTaskList } from "app/actions/colony";
import { setSelectedIssueIndex } from "actions/github";

function mapStateToProps(state: any) {
  return {
    issues: state.github.issues,
    loggedIn: state.login.loggedIn
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchIssues: (token: string) => dispatch(fetchIssues(token)),
    createColonyTask: (issueIndex: number ) => {
      dispatch(setSelectedIssueIndex(issueIndex))
      browserHistory
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)<any>(IssueList);
