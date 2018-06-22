import * as React from "react";
import GitHubIssueList from "components/container/GitHubIssueList";
import Page from "components/presentation/Page";

interface Props {
  match: any;
  history: any;
}

const ImportIssue: React.SFC<Props> = props => {
  const { colonyAddress } = props.match.params;
  return (
    <Page colonyAddress={colonyAddress}>
      <h3>Import issue from GitHub</h3>
      <GitHubIssueList colonyAddress={colonyAddress}/>
    </Page>
  );
};

export default ImportIssue;
