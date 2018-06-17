import { connect } from "react-redux";
import LoginPage from "components/Login";
import { LoginActions } from "actions/login";

function mapStateToProps(state: any) {
  return {};
}

function mapDispatchToProps(dispatch: any) {
  return {
    markUserAsLoggedIn: dispatch(LoginActions.markUserAsLoggedIn),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
