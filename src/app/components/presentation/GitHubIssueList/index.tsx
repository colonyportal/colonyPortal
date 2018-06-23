import * as React from "react";
import { SFC } from "react";
import { ListGroup } from "reactstrap";
import * as styles from "./styles.css";
import Issue from "components/presentation/Issue";
import { Issue as InputIssue } from "models/github";

type Props = {
  issues: InputIssue[];
  fetchIssues: () => void;
  createColonyTask: (issueIndex: number) => void;
};

const IssueList: SFC<Props> = ({
  issues,
  createColonyTask,
  fetchIssues
}) => {
  if (issues.length == 0) {
    fetchIssues();
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
          convertToColonyTask={createColonyTask}
        />
      ))}
    </ListGroup>
  );
};

export default IssueList;
