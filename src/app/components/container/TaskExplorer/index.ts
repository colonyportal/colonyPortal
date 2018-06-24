import { connect } from "react-redux";
import TaskExplorer from "components/presentation/TaskExplorer";
import {
  fetchAllDomains,
  fetchAllTasks,
  setDomainIndex,
  getToken,
  getTaskDetails,
  setSelectedTaskId
} from "actions/colony";
import { push } from "react-router-redux";
import { setDisplayGithubIssueDialog } from "app/actions/github";
function mapStateToProps(state: any, ownProps) {
  return {
    colonyAddress: ownProps.match.params.colonyAddress,
    domains: state.colony.domains,
    selectedTaskId: state.colony.selectedTaskId,
    tasks: state.colony.tasks,
    taskSpecifications: state.colony.taskSpecifications,
    taskDetails: state.colony.taskDetails,
    selectedDomainIndex: state.colony.selectedDomainIndex,
    tokenAddr: state.colony.tokenAddr,
    showGithubIssueList: state.github.showGithubIssueDialog
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any) {
  const { colonyAddress } = ownProps.match.params;
  return {
    fetchDomains: () => dispatch(fetchAllDomains(colonyAddress)),
    fetchTasks: () => dispatch(fetchAllTasks(colonyAddress)),
    setActiveDomain: (domainIndex: number) =>
      dispatch(setDomainIndex(domainIndex)),
    setActiveTask: (taskId: number) => dispatch(setSelectedTaskId(taskId)),
    createNewTask: () => dispatch(push(`/${colonyAddress}/create-new-task`)),
    importTaskFromGithub: () =>
      dispatch(push(`/${colonyAddress}/import-issue`)),
    getToken: () => dispatch(getToken(colonyAddress)),
    getTaskDetails: (tasksId: number[], tokenAddress: string) =>
      dispatch(getTaskDetails(colonyAddress, tasksId, tokenAddress)),
    openGithubIssueList: () => dispatch(setDisplayGithubIssueDialog(true)),
    closeGithubIssueList: () => dispatch(setDisplayGithubIssueDialog(false))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskExplorer);
