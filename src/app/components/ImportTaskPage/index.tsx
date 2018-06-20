import * as React from "react";
import GithubIssueList from "../../containers/GithubIssueList";
import Page from "app/components/Page";

interface Props {
  match: any;
  history: any;
}

const ImportTaskPage: React.SFC<Props> = props => {
  const { colonyAddress } = props.match.params;
  return (
    <Page colonyAddress={colonyAddress}>
      <h1>Import tasks</h1>
      <button onClick= {() => props.history.push(`/${colonyAddress}/create-new-task`)}>Create task manually</button>
      <h3>Import task from GitHub</h3>
      <GithubIssueList colonyAddress={colonyAddress}/>
    </Page>
  );
};

export default ImportTaskPage;
