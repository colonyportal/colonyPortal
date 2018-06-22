import { connect } from "react-redux";
import { fetchIssues } from "actions/github";
import GitHubIssueList from "components/presentation/GitHubIssueList";
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
    // hardcoded owner and repo here for the MVP. In the future, this information will be retrieved from a smart contract
    fetchIssues: (token: string) =>
      dispatch(fetchIssues("colonyportal", "colonyPortal")),
    createColonyTask: (issueIndex: number) => {
      dispatch(setSelectedIssueIndex(issueIndex));
    }
  };
}

export default (withRouter as any)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )<any>(GitHubIssueList)
);
