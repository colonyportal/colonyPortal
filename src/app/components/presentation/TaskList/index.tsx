import * as React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ListGroup
} from "reactstrap";
import { Task, Domain, TaskSpecification } from "models/colony";
import { filter } from "ramda";
import { Link } from "react-router-dom";
import TaskComponent from "../Task";

type Props = {
  domains: Domain[];
  tasks: Task[];
  selectedDomainIndex: number;
  match: any;
  history: any;
  taskSpecifications: TaskSpecification[];
  tokenAddr: string;

  fetchDomains: () => void;
  fetchTasks: () => void;
  setDomain: (domainIndex: number) => void;
  getToken: () => void;
  manageTask: (taskId: number) => void;
  getTaskDetails: (
    tasksId: number[],
    tokenAddr: string
  ) => void;
};

export default class TaskList extends React.Component<Props> {
  componentDidMount() {
    const {
      fetchDomains,
      fetchTasks,
      getToken,
      tasks,
      tokenAddr,
      getTaskDetails
    } = this.props;
    fetchDomains();
    fetchTasks();
    getToken();
    // TODO: we need to wait until we get tasks and token address so get task details
    const tasksId = tasks.map(task => task.id);
    getTaskDetails(tasksId, tokenAddr);
  }

  renderTasksForDomain() {
    const { tasks, taskSpecifications, manageTask } = this.props;
    if (Object.keys(tasks).length > 0) {
      const tasksForDomain = filter(
        task =>
          task.domainId.toString() ===
          this.props.selectedDomainIndex.toString(),
        tasks
      );
      return (
        <ListGroup>
          {tasksForDomain.map(task => (
            <TaskComponent
              key={'task-' + task.id}
              manageTask={manageTask}
              task={task}
              taskSpecification={taskSpecifications[task.id - 1]}
            />
          ))}
        </ListGroup>
      );
    }
    return null;
  }

  onSwitchDomain = e => {
    this.props.setDomain(parseInt(e.target.textContent));
  };

  renderDomainBtn(domain) {
    const selected = domain === this.props.selectedDomainIndex;
    return (
      <Button
        color="info"
        outline={!!!selected}
        className="text-capitalize mr-3"
        key={`btn-${domain}`}
        onClick={this.onSwitchDomain}
        active={this.props.selectedDomainIndex == domain}
      >
        {domain}
      </Button>
    );
  }

  render() {
    const { colonyAddress } = this.props.match.params;
    return (
      <Card className="mt-3">
        <CardHeader>
          <ButtonGroup>
            {this.props.domains.map(domain =>
              this.renderDomainBtn(domain.domainId)
            )}
          </ButtonGroup>
        </CardHeader>
        <CardBody>
          <ButtonGroup>
            <Link to={`/${colonyAddress}/create-new-task`}>
              <Button className="mr-2" outline>
                Create new task
              </Button>
            </Link>

            <Link to={`/${colonyAddress}/import-issue`}>
              <Button outline>Import task from GitHub</Button>
            </Link>
          </ButtonGroup>
          <CardTitle className="mt-3">Tasks to be Pickup</CardTitle>
          {this.renderTasksForDomain()}
        </CardBody>
      </Card>
    );
  }
}
