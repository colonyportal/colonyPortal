import * as React from "react";
import { GithubIssue } from "models/github";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { ErrorOutline, Link } from "@material-ui/icons";

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
    <ListItem button={true} key={`issue-${index}`} divider={true}>
      <ListItemIcon>
        <ErrorOutline style={{ color: "#28a745" }} />
      </ListItemIcon>
      <ListItemText
        onClick={() => convertToColonyTask(index)}
        primary={issue.title}
        secondary={`#${issue.number} created ${new Date(
          issue.created_at
        ).toDateString()} by ${issue.user.login}`}
      />
      <ListItemIcon style={{ float: "right" }}>
        <a href={issue.html_url} target="_blank">
          <Link />
        </a>
      </ListItemIcon>
    </ListItem>
  );
};

export default GithubIssue;
