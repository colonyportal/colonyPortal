import { connect } from "react-redux";
import CreateNewTask from "components/presentation/CreateNewTask";
import { createColonyTaskAndAddItToTaskList } from "actions/colony";
import { TaskSpecification, Roles } from "app/models/colony";
import { push } from "react-router-redux";
import { setSelectedIssueIndex } from "../../../actions/github";

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
  const { colonyAddress } = ownProps.match.params;
  return {
    onCreate: (
      domainId: number,
      taskSpecification: TaskSpecification,
      roles: Roles
    ) => {
      dispatch(
        createColonyTaskAndAddItToTaskList({
          taskSpecification,
          roles,
          colonyAddress,
          domainId
        })
      );
      dispatch(setSelectedIssueIndex(-1))
      dispatch(push(`/${colonyAddress}/tasks`));
    },
    onCancel: () => {
      dispatch(setSelectedIssueIndex(-1))
      dispatch(push(`/${colonyAddress}/tasks`))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewTask);
