import * as React from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

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
      <div>
        {this.renderNav()}
      </div>
    );
  }
}
