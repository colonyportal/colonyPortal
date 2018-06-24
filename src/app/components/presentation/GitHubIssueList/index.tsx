import * as React from "react";
import { SFC } from "react";
import GithubIssue from "components/presentation/GithubIssue";
import { GithubIssue as InputIssue } from "models/github";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, List } from "@material-ui/core";
import { StyleRulesCallback } from '@material-ui/core/styles';


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
      <DialogTitle id="simple-dialog-title">Import issue from GitHub repo</DialogTitle>
      <div>
        {issues.length === 0 ? (
          <div className="text-center">No Issues</div>
        ) : (
          <List>
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

const styles : StyleRulesCallback = (theme: any) => ({
  dialog: {
  }
});

export default withStyles(styles)(GithubIssueList);