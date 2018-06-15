import { connect } from 'react-redux'
import { Tasks } from "components/Tasks";
import { TasksActions } from "actions/tasks";

function mapStateToProps(state: any) {
  return {
    tasks: state.tasks.tasks,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    loadTasks: () => dispatch(TasksActions.loadTasks()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
