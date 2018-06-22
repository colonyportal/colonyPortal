import { connect } from "react-redux";
import CreateNewTask from "components/presentation/CreateNewTask";
import { createColonyTaskAndAddItToTaskList } from "actions/colony";
import { compose } from "ramda";

function mapStateToProps(state: any, ownProps: any) {
  return {
    colonyAddress: ownProps.match.params.colonyAddress,
    domainId: state.colony.selectedDomainIndex,
    history: ownProps.history,
    taskTemplate:
      state.github.selectedIssueIndex >= 0
        ? state.github.issues[state.github.selectedIssueIndex]
        : undefined
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any) {
  return {
    onCreate: compose(
      dispatch,
      createColonyTaskAndAddItToTaskList
    ),
    onCancel: () => ownProps.history.push("/" + ownProps.match.params.colonyAddress + "/tasks")
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewTask);
