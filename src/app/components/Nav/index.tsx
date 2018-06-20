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

type Props = {
    colonyAddress: string
};

const nav: SFC<Props> = ({colonyAddress}) => (
  <Navbar color="light" light>
    <NavbarBrand href={"/"}>Colony Portal</NavbarBrand>
    <Collapse isOpen>
      <Nav className="ml-auto d-flex flex-row" navbar>
        <NavItem className="ml-3">
          <NavLink href={`/${colonyAddress}`}>Dashboard</NavLink>
        </NavItem>
         <NavItem className="ml-3">
          <NavLink href={`/${colonyAddress}/tasks`}>Tasks</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
);

export default nav;
