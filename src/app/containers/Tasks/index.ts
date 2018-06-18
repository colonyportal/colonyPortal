import { connect } from "react-redux";
import { Tasks } from "components/Tasks";
import { fetchAllDomains, fetchAllTasks } from "../../actions/colony";

function mapStateToProps(state: any) {
  return {
    domains: state.colony.domains,
    tasks: state.colony.tasks
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchDomains: (colonyAddress: string) =>
      dispatch(fetchAllDomains(colonyAddress)),
    fetchTasks: (colonyAddress: string) => dispatch(fetchAllTasks(colonyAddress))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
