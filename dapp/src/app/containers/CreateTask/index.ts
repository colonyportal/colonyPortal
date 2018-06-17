import { connect } from 'react-redux'
import { CreateTask } from "components/CreateTask";
import { LoginActions } from "actions/login";

function mapStateToProps(state: any) {
  return {
    loggedIn: state.login.loggedIn,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    markUserAsLoggedIn: dispatch(LoginActions.markUserAsLoggedIn),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
