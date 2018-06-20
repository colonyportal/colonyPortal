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
import { Task, Domain } from "../../../../types/colony";
import {filter} from "ramda"

type Props = {
  domains: Domain[];
  tasks: Task[];
  match: any;

  fetchDomains: (colonyAddress: string) => void;
  fetchTasks: (colonyAddress: string) => void;
};

export class Tasks extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedDomainId: undefined
    };
  }

  componentDidMount() {
    const { colonyAddress } = this.props.match.params;
    const {fetchDomains, fetchTasks} = this.props
    fetchDomains(colonyAddress);
    fetchTasks(colonyAddress);

    this.setState({
      selectedDomainId: 0
    });
  }

  renderTasksForDomain() {
    const { tasks } = this.props;
    if (Object.keys(tasks).length > 0) {
      const { selectedDomainId } = this.state;
      const tasksForDomain = filter(task => task.domainId.toString() === selectedDomainId.toString(), tasks); 
      return (
        <ListGroup>
          {tasksForDomain.map(task => (
            <ListGroupItem key={`task-${task.id}`}>id: {task.id} - hash: {task.specificationHash} - skill: {task.skillId}</ListGroupItem>
          ))}
        </ListGroup>
      );
    }
    return null;
  }

  onSwitchDomain = e => {
    this.setState({
      selectedDomainId: e.target.textContent
    });
  };

  renderDomainBtn(domain) {
    const selected = domain === this.state.selectedDomainName;
    return (
      <Button
        color="info"
        outline={!!!selected}
        className="text-capitalize mr-3"
        key={`btn-${domain}`}
        onClick={this.onSwitchDomain}
        active={this.state.selectedDomainId == domain}
      >
        {domain}
      </Button>
    );
  }

  render() {
    const { colonyAddress } = this.props.match.params;
    return (
      <div className="mx-auto" style={{ maxWidth: "2000px" }}>
        <Nav colonyAddress={colonyAddress}/>
        <Card className="mt-3">
          <CardHeader>
            <ButtonGroup>
              {this.props.domains.map(domain =>
                this.renderDomainBtn(domain.domainId)
              )}
            </ButtonGroup>
          </CardHeader>
          <CardBody>
            <CardTitle>Tasks to be Pickup</CardTitle>
            {this.renderTasksForDomain()}
          </CardBody>
        </Card>
      </div>
    );
  }
}
