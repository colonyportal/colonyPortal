import * as React from "react";
import { GithubIssue } from "models/github";
import { ListItem, ListItemText } from "@material-ui/core";

type Props = {
  index: number;
  issue: GithubIssue;
  convertToColonyTask: (issueIndex: number) => void;
};

const GithubIssue: React.SFC<Props> = ({
  index,
  issue,
  convertToColonyTask
}) => {
  return (
    <ListItem button={true} key={`issue-${index}`} onClick={() => convertToColonyTask(index)} divider={true}>
      <ListItemText
        primary={issue.title}
        secondary={`#${issue.number} created ${new Date(issue.created_at).toDateString()} by ${
          issue.user.login
        }`}
      />
    </ListItem>
  );
};

export default GithubIssue;
