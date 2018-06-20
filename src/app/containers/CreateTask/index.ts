import { connect } from "react-redux";
import { CreateTask } from "components/CreateTask";
import { createColonyTaskAndRefreshTaskList } from "actions/colony";
import { compose } from "ramda";

function mapStateToProps(state: any) {
  return {
    loggedIn: state.login.loggedIn,
    colonyAddress: state.colony.colonyAddress
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    createColonyTask: compose(
      dispatch,
      createColonyTaskAndRefreshTaskList
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTask);
