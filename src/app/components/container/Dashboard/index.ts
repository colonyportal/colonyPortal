import { connect } from "react-redux";
import { fetchAllDomains } from "actions/colony";
import Dashboard from "components/presentation/Dashboard";

function mapStateToProps(state: any, ownProps: any) {
  return {
    colonyAddress: ownProps.match.params.colonyAddress,
    domainCount: state.colony.domainCount
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any) {
  const { colonyAddress } = ownProps.match.params;
  return {
    getDomains: () => dispatch(fetchAllDomains(colonyAddress))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
