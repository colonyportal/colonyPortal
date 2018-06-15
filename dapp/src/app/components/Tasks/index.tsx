import * as React from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Collapse, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

export class Tasks extends React.Component<any, any> {
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
            <ListGroup>
              <ListGroupItem>Portugal vs Spain</ListGroupItem>
              <ListGroupItem>Argentina vs Iceland</ListGroupItem>
              <ListGroupItem>Germany vs Mexico</ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </div>
    );
  }
}
