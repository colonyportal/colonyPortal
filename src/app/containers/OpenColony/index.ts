import { connect } from 'react-redux'
import OpenColonyPage from "components/OpenColonyPage";

function mapStateToProps(state: any) {
  return {
    loggedIn: state.login.loggedIn,
  };
}

export default connect(mapStateToProps)(OpenColonyPage);
