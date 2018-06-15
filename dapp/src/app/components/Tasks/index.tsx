import * as React from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Collapse, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

export class Tasks extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedDomainName: undefined,
    }
  }

  componentDidMount() {
    this.props.loadTasks();

    this.setState({
      selectedDomainName: 'front-end',
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
      const { selectedDomainName } = this.state;
      const tasksForDomain = tasks[selectedDomainName];
      return (
        <ListGroup>
          {
            tasksForDomain.map((task) => (
              <ListGroupItem>{task.id}</ListGroupItem>
            ))
          }
        </ListGroup>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="mx-auto" style={{ maxWidth: '2000px' }}>
        {this.renderNav()}
        <Card className="mt-3">
          <CardHeader>
            {['front-end', 'back-end', 'wireframe', 'ux analytic'].map((domain => {
              return <Button color="info" outline className="text-capitalize mr-3">{domain}</Button>
            }))}
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
