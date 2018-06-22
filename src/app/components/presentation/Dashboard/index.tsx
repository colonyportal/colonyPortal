import * as React from "react";
import { SFC } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import Page from "components/presentation/Page";
//import * as styles from "./styles.css";
type Props = {
  domainCount: number;
  clickDomain: (domainId: number) => any;
  getDomains: (colonyAddress: string) => any;
  match: any;
};

const DashboardPage: SFC<Props> = ({ domainCount, getDomains, match }) => {
  const { colonyAddress } = match.params;
  getDomains(colonyAddress);

  return (
    <Page colonyAddress={colonyAddress}>
      <Card className="mt-3">
        <CardHeader />
        <CardBody>
          <h1>Colony Dashboard</h1>
          <p>Address: {colonyAddress}</p>
          <p>Number of domains: {domainCount}</p>
        </CardBody>
      </Card>
    </Page>
  );
};

export default DashboardPage;
