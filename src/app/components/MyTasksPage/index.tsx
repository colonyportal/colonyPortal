import * as React from "react";
import Page from "app/components/Page";

type Props = {
  match: any;
};

const MyTasksPage: React.SFC<Props> = props => {
  const { colonyAddress } = props.match.params;
  return (
    <Page colonyAddress={colonyAddress}>
      <h1>Hello World Cup</h1>
      <h3>Portugal VS Spain right now</h3>
      <p>but this should be a my task page LOL</p>
    </Page>
  );
};

export default MyTasksPage;
