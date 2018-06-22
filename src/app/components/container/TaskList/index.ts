import { connect } from "react-redux";
import TasksList from "components/presentation/TaskList";
import { fetchAllDomains, fetchAllTasks, setDomainIndex } from "actions/colony";
import {reverse} from "ramda"

function mapStateToProps(state: any) {
  return {
    domains: state.colony.domains,
    tasks: reverse(state.colony.tasks),
    taskSpecifications: state.colony.taskSpecifications,
    selectedDomainIndex: state.colony.selectedDomainIndex
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchDomains: (colonyAddress: string) =>
      dispatch(fetchAllDomains(colonyAddress)),
    fetchTasks: (colonyAddress: string) => dispatch(fetchAllTasks(colonyAddress)),
    setDomain: (domainIndex: number) => dispatch(setDomainIndex(domainIndex))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
