import { connect } from 'react-redux'
import OpenColonyPage from "components/presentation/OpenColonyPage";

function mapStateToProps(state: any) {
  return {
    loggedIn: state.login.loggedIn,
  };
}

export default connect(mapStateToProps)(OpenColonyPage);
