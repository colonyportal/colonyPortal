import { connect } from 'react-redux'
import { CreateTask } from "components/CreateTask";
import { onClickCreateColonyTask } from 'actions/tasks';

function mapStateToProps(state: any) {
  return {
    loggedIn: state.login.loggedIn,
    colonyAddress: state.colony.colonyAddress
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    createColonyTask: (attrs) => dispatch(onClickCreateColonyTask(attrs)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
