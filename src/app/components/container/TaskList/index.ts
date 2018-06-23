import { connect } from "react-redux";
import TasksList from "components/presentation/TaskList";
import {
  fetchAllDomains,
  fetchAllTasks,
  setDomainIndex,
  getToken,
  getTaskDetails
} from "actions/colony";
import { reverse } from "ramda";
import { push } from "react-router-redux";

function mapStateToProps(state: any) {
  return {
    domains: state.colony.domains,
    tasks: reverse(state.colony.tasks),
    taskSpecifications: state.colony.taskSpecifications,
    taskDetails: state.colony.taskDetails,
    selectedDomainIndex: state.colony.selectedDomainIndex,
    tokenAddr: state.colony.tokenAddr
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any) {
  const { colonyAddress } = ownProps.match.params;
  return {
    fetchDomains: () => dispatch(fetchAllDomains(colonyAddress)),
    fetchTasks: () => dispatch(fetchAllTasks(colonyAddress)),
    setDomain: (domainIndex: number) => dispatch(setDomainIndex(domainIndex)),
    getToken: () => dispatch(getToken(colonyAddress)),
    getTaskDetails: (tasksId: number[], tokenAddress: string) =>
      dispatch(getTaskDetails(colonyAddress, tasksId, tokenAddress)),
    manageTask: (taskId: number) => {
      dispatch(push(`/${colonyAddress}/tasks/${taskId}`))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
