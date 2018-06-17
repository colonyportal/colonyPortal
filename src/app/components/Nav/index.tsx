import * as React from "react";
import { SFC } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap";

type Props = {};

const nav: SFC<Props> = ({}) => (
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

export default nav;
