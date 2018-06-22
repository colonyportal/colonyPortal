import * as React from "react";
import GithubIssueList from "components/container/GithubIssueList";
import Page from "components/presentation/Page";

interface Props {
  match: any;
  history: any;
}

const ImportTaskPage: React.SFC<Props> = props => {
  const { colonyAddress } = props.match.params;
  return (
    <Page colonyAddress={colonyAddress}>
      <h3>Import task from GitHub</h3>
      <GithubIssueList colonyAddress={colonyAddress}/>
    </Page>
  );
};

export default ImportTaskPage;
