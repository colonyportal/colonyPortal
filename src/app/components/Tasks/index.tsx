import * as React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Collapse,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap";

type Props = {
  domains: any[];
  tasks: any[];
  match: any;

  fetchDomainCount: (colonyAddress: string) => void;
  fetchTaskCount: (colonyAddress: string) => void;
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
    this.props.fetchDomainCount(colonyAddress);
    this.props.fetchTaskCount(colonyAddress);

    this.setState({
      selectedDomainId: 0
    });
  }

  renderNav() {
    return (
      <Navbar color="light" light>
        <NavbarBrand>John Smith</NavbarBrand>
        <Collapse isOpen>
          <Nav className="ml-auto d-flex flex-row" navbar>
            <NavItem className="ml-3">
              <NavLink href="/">Dashboard</NavLink>
            </NavItem>
            <NavItem className="ml-3">
              <NavLink href="/my_tasks">My Tasks</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  renderTasksForDomain() {
    const { tasks } = this.props;
    if (Object.keys(tasks).length > 0) {
      //const { selectedDomainId } = this.state;
      const tasksForDomain = tasks; //tasks[selectedDomainId];
      return (
        <ListGroup>
          {tasksForDomain.map(task => (
            <ListGroupItem key={`task-${task.id}`}>{task.name}</ListGroupItem>
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
      >
        {domain}
      </Button>
    );
  }

  render() {
    return (
      <div className="mx-auto" style={{ maxWidth: "2000px" }}>
        {this.renderNav()}
        <Card className="mt-3">
          <CardHeader>
            {this.props.domains.map(domain =>
              this.renderDomainBtn(domain.name)
            )}
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
