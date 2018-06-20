import { connect } from "react-redux";
import CreateNewTask from "components/CreateNewTask";
import { createColonyTaskAndRefreshTaskList } from "actions/colony";
import { compose } from "ramda";

function mapStateToProps(state: any) {
  return {
    loggedIn: state.login.loggedIn,
    colonyAddress: state.colony.colonyAddress,
    domainId: state.colony.selectedDomainIndex,
    issue:
      state.github.selectedIssueIndex >= 0
        ? state.github.issues[state.github.selectedIssueIndex]
        : undefined
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onCreate: compose(
      dispatch,
      createColonyTaskAndRefreshTaskList
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewTask);
