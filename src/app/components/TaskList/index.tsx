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
import Nav from "../Nav";
import { Task, Domain } from "../../models/ColonyModel";
import { filter } from "ramda";

type Props = {
  domains: Domain[];
  tasks: Task[];
  selectedDomainIndex: number,
  match: any;
  history: any;

  fetchDomains: (colonyAddress: string) => void;
  fetchTasks: (colonyAddress: string) => void;
  setDomain: (domainIndex: number) => void
};

export default class TaskList extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    console.log("xxxxxxxxxxxxxxxxx ::::: " + props.selectedDomainIndex)

  }

  componentDidMount() {
    const { colonyAddress } = this.props.match.params;
    const { fetchDomains, fetchTasks } = this.props;
    fetchDomains(colonyAddress);
    fetchTasks(colonyAddress);
  }

  renderTasksForDomain() {
    const { tasks } = this.props;
    if (Object.keys(tasks).length > 0) {
      const tasksForDomain = filter(
        task => task.domainId.toString() === this.props.selectedDomainIndex.toString(),
        tasks
      );
      return (
        <ListGroup>
          {tasksForDomain.map(task => (
            <ListGroupItem key={`task-${task.id}`}>
              id: {task.id} - hash: {task.specificationHash} - skill:{" "}
              {task.skillId}
            </ListGroupItem>
          ))}
        </ListGroup>
      );
    }
    return null;
  }

  onSwitchDomain = e => {
    this.props.setDomain(parseInt(e.target.textContent))
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
              <button onClick= {() => this.props.history.push(`/${colonyAddress}/create-new-task`)}>Create new task</button>
              <button onClick= {() => this.props.history.push(`/${colonyAddress}/import-task`)}>Import task from GitHub</button>
            </ButtonGroup>
            <CardTitle>Tasks to be Pickup</CardTitle>
            {this.renderTasksForDomain()}
          </CardBody>
        </Card>
      </div>
    );
  }
}
