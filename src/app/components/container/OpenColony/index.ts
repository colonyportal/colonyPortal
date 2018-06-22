import { connect } from 'react-redux'
import OpenColony from "components/presentation/OpenColony";

function mapStateToProps(state: any) {
  return {
    loggedIn: state.login.loggedIn,
  };
}

export default connect(mapStateToProps)(OpenColony);
