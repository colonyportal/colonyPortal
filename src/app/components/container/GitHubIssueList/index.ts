import { connect } from "react-redux";
import { fetchIssues } from "actions/github";
import GitHubIssueList from "components/presentation/GitHubIssueList";
import { setSelectedIssueIndex } from "actions/github";
import { push } from "react-router-redux";

type Props = {
  colonyAddress: string;
};

function mapStateToProps(state: any) {
  return {
    issues: state.github.issues
  };
}

function mapDispatchToProps(dispatch: any, ownProps: Props) {
  return {
    // hardcoded owner and repo here for the MVP. In the future, this information will be retrieved from a smart contract
    fetchIssues: () =>
      dispatch(fetchIssues("colonyportal", "colonyPortal")),
    createColonyTask: (issueIndex: number) => {
      dispatch(setSelectedIssueIndex(issueIndex));
      dispatch(push(`/${ownProps.colonyAddress}/create-new-task`));
    }
  };
}

export default connect<any, any, Props>(
  mapStateToProps,
  mapDispatchToProps
)<any>(GitHubIssueList);
