import * as React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import Nav from "components/presentation/Nav";
import { Task, Domain, TaskSpecification } from "models/colony";
import { filter } from "ramda";
import { Link } from "react-router-dom";

type Props = {
  domains: Domain[];
  tasks: Task[];
  selectedDomainIndex: number;
  match: any;
  history: any;
  taskSpecifications: TaskSpecification[];

  fetchDomains: (colonyAddress: string) => void;
  fetchTasks: (colonyAddress: string) => void;
  setDomain: (domainIndex: number) => void;
};

export default class TaskList extends React.Component<Props> {
  componentDidMount() {
    const { colonyAddress } = this.props.match.params;
    const { fetchDomains, fetchTasks } = this.props;
    fetchDomains(colonyAddress);
    fetchTasks(colonyAddress);
  }

  renderTasksForDomain() {
    const { tasks, taskSpecifications } = this.props;
    if (Object.keys(tasks).length > 0) {
      const tasksForDomain = filter(
        task =>
          task.domainId.toString() ===
          this.props.selectedDomainIndex.toString(),
        tasks
      );
      return (
        <ListGroup>
          {tasksForDomain.map((task, index) => (
            <ListGroupItem key={`task-${task.id}`}>
              id: {task.id} - skill: {task.skillId}
              <h4>
                {taskSpecifications[parseInt(task.id) - 1] != null
                  ? taskSpecifications[parseInt(task.id) - 1].title
                  : ""}
              </h4>
              <p>
                {taskSpecifications[parseInt(task.id) - 1] != null
                  ? taskSpecifications[parseInt(task.id) - 1].body
                  : ""}
              </p>
              <a
                href={
                  taskSpecifications[parseInt(task.id) - 1] != null
                    ? taskSpecifications[parseInt(task.id) - 1].url
                    : ""
                }
              >
                GitHub
              </a>
            </ListGroupItem>
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
      <div className="mx-auto" style={{ maxWidth: "2000px" }}>
        <Nav colonyAddress={colonyAddress} />
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
                <button>Create new task</button>
              </Link>

              <Link to={`/${colonyAddress}/import-issue`}>
                <button>Import task from GitHub</button>
              </Link>
            </ButtonGroup>
            <CardTitle>Tasks to be Pickup</CardTitle>
            {this.renderTasksForDomain()}
          </CardBody>
        </Card>
      </div>
    );
  }
}
