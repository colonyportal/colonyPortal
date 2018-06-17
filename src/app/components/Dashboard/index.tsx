import * as React from "react";
import { SFC } from "react";
import Nav from "app/components/Nav";
import {
    Card,
    CardBody,
    CardHeader,
  } from "reactstrap";
//import * as styles from "./styles.css";
type Props = {
  domainCount: number;
  clickDomain: (domainId: number) => any;
  getDomainCount: (colonyAddress: string) => any;
  match: any
};

const dashboard: SFC<Props> = ({ domainCount, getDomainCount, match }) => {
  const { colonyAddress } = match.params;
  getDomainCount(colonyAddress);

  return (
    <div className="mx-auto" style={{ maxWidth: "2000px" }}>
    <Nav colonyAddress={colonyAddress}/>
    <Card className="mt-3">
      <CardHeader>

      </CardHeader>
      <CardBody>
      <h1>Colony Dashboard</h1>
      <p>Address: {colonyAddress}</p>
      <p>Number of domains: {domainCount}</p>
      </CardBody>
    </Card>
  </div>
  );
};

export default dashboard;