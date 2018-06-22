import { connect } from "react-redux";
import CreateNewTask from "components/presentation/CreateNewTask";
import { createColonyTaskAndRefreshTaskList } from "actions/colony";
import { compose } from "ramda";

function mapStateToProps(state: any, ownProps: any) {
  return {
    loggedIn: state.login.loggedIn,
    colonyAddress: state.colony.colonyAddress,
    domainId: state.colony.selectedDomainIndex,
    history: ownProps.history,
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
