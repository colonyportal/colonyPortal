import { connect } from "react-redux";
import TasksList from "components/presentation/TaskList";
import { fetchAllDomains, fetchAllTasks, setDomainIndex, getToken, getTaskDetails } from "actions/colony";
import { reverse } from "ramda"

function mapStateToProps(state: any) {
  return {
    domains: state.colony.domains,
    tasks: reverse(state.colony.tasks),
    taskSpecifications: state.colony.taskSpecifications,
    taskDetails: state.colony.taskDetails,
    selectedDomainIndex: state.colony.selectedDomainIndex,
    tokenAddr: state.colony.tokenAddr,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchDomains: (colonyAddress: string) =>
      dispatch(fetchAllDomains(colonyAddress)),
    fetchTasks: (colonyAddress: string) => dispatch(fetchAllTasks(colonyAddress)),
    setDomain: (domainIndex: number) => dispatch(setDomainIndex(domainIndex)),
    getToken: (colonyAddress: string) => dispatch(getToken(colonyAddress)),
    getTaskDetails: (tasksId: number[], tokenAddress: string) => dispatch(getTaskDetails(tasksId, tokenAddress)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
