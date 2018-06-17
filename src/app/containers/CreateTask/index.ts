import { connect } from 'react-redux'
import { CreateTask } from "components/CreateTask";

function mapStateToProps(state: any) {
  return {
    loggedIn: state.login.loggedIn,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
