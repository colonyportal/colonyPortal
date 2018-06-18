import { connect } from 'react-redux'
import { fetchAllDomains } from "actions/colony";
import Dashboard from 'app/components/Dashboard';

function mapStateToProps(state: any) {
  return {
    domainCount: state.colony.domainCount,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getDomains: (colonyAddress) => dispatch(fetchAllDomains(colonyAddress))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);