import { connect } from "react-redux";
import { push } from "react-router-redux";

import Dashboard from "components/presentation/Dashboard";

// TODO: Move this
import { fetchAllDomains } from "actions/colony";

function mapStateToProps(state: any, ownProps: any) {
  return {
    colonyAddress: ownProps.match.params.colonyAddress,

    // TODO: Move this
    domainCount: state.colony.domainCount,
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any) {
  const { colonyAddress } = ownProps.match.params;

  return {
    onPageNav: (route: string) => { dispatch(push(`/${colonyAddress}/${route}`)) },
    onNavHome: () => { dispatch(push('/')) },

    // TODO: Move this
    getDomains: () => dispatch(fetchAllDomains(colonyAddress))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
