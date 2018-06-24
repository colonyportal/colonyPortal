import * as React from "react";
import { SFC } from "react";
import GithubIssue from "components/presentation/GithubIssue";
import { GithubIssue as InputIssue } from "models/github";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  List,
  ListSubheader,
  Button
} from "@material-ui/core";
import { StyleRulesCallback } from "@material-ui/core/styles";

type Props = {
  issues: InputIssue[];
  fetchIssues: () => void;
  createColonyTask: (issueIndex: number) => void;
  onClose: () => any;
  open: boolean;
};

const GithubIssueList: SFC<Props & { classes: StyleClassNames }> = ({
  issues,
  createColonyTask,
  fetchIssues,
  classes,
  onClose,
  open
}) => {
  if (issues.length == 0) {
    fetchIssues();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      maxWidth="md"
      className={classes.dialog}
    >
      <DialogTitle id="simple-dialog-title">
        Import issue from GitHub repo
      </DialogTitle>
      <div style={{ width: 960 }}>
        {issues.length === 0 ? (
          <div className="text-center">No Issues</div>
        ) : (
          <List
            subheader={
              <ListSubheader disableSticky={true} component="div">
                23 Open 15 closed<span style={{ float: "right" }}>
                  <Button>Author</Button> <Button>Labels</Button>{" "}
                  <Button>Projects</Button> <Button>Milestones</Button>{" "}
                  <Button>Assignee</Button> <Button>Sort</Button>
                </span>
              </ListSubheader>
            }
          >
            {issues.map((issue, index) => (
              <GithubIssue
                key={index}
                issue={issue}
                index={index}
                convertToColonyTask={createColonyTask}
              />
            ))}
          </List>
        )}
      </div>
    </Dialog>
  );
};

type StyleClassNames = {
  dialog: string;
};

const styles: StyleRulesCallback = (theme: any) => ({
  dialog: {}
});

export default withStyles(styles)(GithubIssueList);
