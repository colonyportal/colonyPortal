import { connect } from "react-redux";
import ManageTask from "components/presentation/ManageTask";
import { push } from "react-router-redux";

function mapStateToProps(state: any, ownProps: any) {
  const { taskId } = ownProps.match.params;
  console.log("taskId: " + taskId)
  return {
    task: state.colony.tasks[taskId],
    taskSpecification: state.colony.taskSpecifications[taskId]
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any) {
  const { colonyAddress } = ownProps.match.params;
  return {
    confirm: () => {
      dispatch(push(`/${colonyAddress}/tasks`));
    },
    cancel: () => dispatch(push(`/${colonyAddress}/tasks`))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTask);
