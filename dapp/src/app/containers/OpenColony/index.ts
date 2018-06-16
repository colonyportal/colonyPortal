import { connect } from 'react-redux'
import { OpenColony } from "components/OpenColony";

function mapStateToProps(state: any) {
  return {
    loggedIn: state.login.loggedIn,
  };
}

export default connect(mapStateToProps)(OpenColony);
