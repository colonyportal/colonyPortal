import * as React from "react";
import { SFC } from "react";
import { ListGroup } from "reactstrap";
import * as styles from "./styles.css";
import Issue from "../../components/Issue";
import { Issue as InputIssue } from "../../models/IssueModel";

type Props = {
  issues: InputIssue[];
  fetchIssues: (token: string) => void;
  loggedIn: boolean;
  colonyAddress: string;
  history: any;
  createColonyTask: (issueIndex: number) => void;
};

const IssueList: SFC<Props> = ({
  issues,
  loggedIn,
  colonyAddress,
  history,
  createColonyTask,
  fetchIssues
}) => {
  if (loggedIn) {
    if (issues.length == 0) {
      // TODO: investigate why this check is required
      const token = document.cookie
        .split(";")
        .filter(item => item.includes("token="))[0]
        .split("token=")[1];
      fetchIssues(token);
    }
  } else {
    history.push("/login");
  }
  return issues.length === 0 ? (
    <div className="text-center">No Issues</div>
  ) : (
    <ListGroup className={`mx-5 mt-3 ${styles.issueGroup}`}>
      {issues.map((issue, index) => (
        <Issue
          key={index}
          issue={issue}
          index={index}
          convertToColonyTask={(issueIndex: number) => {
            console.log("history IN xxxx: " + JSON.stringify(history))

            createColonyTask(issueIndex);
            history.push(`/${colonyAddress}/create-new-task`);
          }}
        />
      ))}
    </ListGroup>
  );
};

export default IssueList;
