import { connect } from "react-redux";
import { Tasks } from "components/Tasks";
import { fetchDomainCount, fetchTaskCount } from "../../actions/colony";

function mapStateToProps(state: any) {
  return {
    domains: Array.from({ length: state.colony.domainCount }, (x, i) => ({
      name: "domain-" + i,
      id: i
    })),
    tasks: Array.from({ length: state.colony.taskCount }, (x, i) => ({
      name: "task-" + i,
      id: i
    }))
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchDomainCount: (colonyAddress: string) =>
      dispatch(fetchDomainCount(colonyAddress)),
    fetchTaskCount: (colonyAddress: string) =>
      dispatch(fetchTaskCount(colonyAddress))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
