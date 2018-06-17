import { connect } from "react-redux";
import LoginPage from "components/Login";
import { markUserAsLoggedIn } from "actions/login";

function mapStateToProps(state: any) {
  return {};
}

function mapDispatchToProps(dispatch: any) {
  return {
    markUserAsLoggedIn: () =>
      dispatch(markUserAsLoggedIn()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
