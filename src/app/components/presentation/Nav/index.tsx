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
import { Link } from "react-router-dom";

type Props = {
  colonyAddress: string;
};

const nav: SFC<Props> = ({ colonyAddress }) => (
  <Navbar color="light" light>
    <NavbarBrand><Link to="/">Colony Portal</Link></NavbarBrand>
    <Collapse isOpen>
      <Nav className="ml-auto d-flex flex-row" navbar>
        <NavItem className="ml-3">
          <NavLink>
            <Link to={`/${colonyAddress}`}>Dashboard</Link>
          </NavLink>
        </NavItem>
        <NavItem className="ml-3">
          <NavLink>
            <Link to={`/${colonyAddress}/tasks`}>Tasks</Link>
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
);

export default nav;
