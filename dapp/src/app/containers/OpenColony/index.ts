import { connect } from 'react-redux'
import { OpenColony } from "components/OpenColony";
import { setColonyAddress, fetchDomainCount } from "actions/colony";

function mapStateToProps(state: any) {
  return {
    domainCount: state.colony.domainCount,
    loggedIn: state.login.loggedIn,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setAddress: (address: string) => dispatch(setColonyAddress(address)),
    getDomainCount: () => dispatch(fetchDomainCount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenColony);
