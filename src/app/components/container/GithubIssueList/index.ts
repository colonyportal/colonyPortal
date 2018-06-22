import { connect } from "react-redux";
import { fetchIssues } from "actions/github";
import IssueList from "components/presentation/IssueList";
import { setSelectedIssueIndex } from "actions/github";
import { withRouter } from "react-router";

function mapStateToProps(state: any, ownProps: any) {
  return {
    issues: state.github.issues,
    loggedIn: state.login.loggedIn,
    history: ownProps.history,
    colonyAddress: ownProps.colonyAddress
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchIssues: (token: string) => dispatch(fetchIssues(token)),
    createColonyTask: (issueIndex: number) => {
      dispatch(setSelectedIssueIndex(issueIndex));
    }
  };
}

export default (withRouter as any)(connect(
  mapStateToProps,
  mapDispatchToProps
)<any>(IssueList));
