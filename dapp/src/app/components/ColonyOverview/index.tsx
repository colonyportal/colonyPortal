import * as React from "react";
import { SFC } from "react";
//import * as styles from "./styles.css";

type Props = {
  domainCount: number;
  clickDomain: (domainId: number) => any;
  getDomainCount: (colonyAddress: string) => any;
  match: any
};

const colonyOverview: SFC<Props> = ({ domainCount, getDomainCount, match }) => {
  const { colonyAddress } = match.params;
  getDomainCount(colonyAddress);

  return (
    <div>
      <h1>Colony Overview22</h1>
      <p>address: {colonyAddress}</p>
      <p>{domainCount}</p>
    </div>
  );
};

export default colonyOverview;
