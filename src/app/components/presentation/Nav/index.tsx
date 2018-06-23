import * as React from "react";
import { SFC } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";

type Props = {
  colonyAddress: string;
};

const nav: SFC<Props> = ({ colonyAddress }) => (
  <Navbar color="light" light>
    <Link to="/">Colony Portal</Link>
    <Collapse isOpen>
      <Nav className="ml-auto d-flex flex-row" navbar>
        <NavItem className="ml-3">
            <Link to={`/${colonyAddress}`}>Dashboard</Link>
        </NavItem>
        <NavItem className="ml-3">
            <Link to={`/${colonyAddress}/tasks`}>Tasks</Link>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
);

export default nav;
