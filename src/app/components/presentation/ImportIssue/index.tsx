import * as React from "react";
import GitHubIssueList from "components/container/GitHubIssueList";

interface Props {
  match: any;
  history: any;
}

const ImportIssue: React.SFC<Props> = props => {
  const { colonyAddress } = props.match.params;
  return (
    <>
      <h3>Import issue from GitHub</h3>
      <GitHubIssueList colonyAddress={colonyAddress}/>
    </>
  );
};

export default ImportIssue;
