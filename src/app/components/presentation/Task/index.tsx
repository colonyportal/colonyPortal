import * as React from "react";
import { Task, TaskSpecification } from "app/models/colony";
import { pathOr } from "ramda";
import Markdown from "react-remarkable";
import { Card, CardContent, Typography, Chip, Grid } from "@material-ui/core";
import { Check, Warning } from "@material-ui/icons";
import * as styles from "components/presentation/Task/styles.css";

type Props = {
  task: Task;
  taskSpecification: TaskSpecification;
  editTask: (taskId: number) => void;
  roles: any;
};

const pathOrEmpty = pathOr("");

const Task: React.SFC<Props> = ({ task, taskSpecification, editTask, roles }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        {pathOrEmpty(["title"], taskSpecification)}
      </Typography>
      <Chip style={{ marginBottom: 15 }} label={"skill-" + task.skillId} />
      <Grid container>
        <Grid item xs={3}>
          <Typography className="text-uppercase text-muted" variant="subheading">Due Date</Typography>
          <Typography>{pathOr("TBD", ["dueDate"], task)}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className="text-uppercase text-muted" variant="subheading">Issue Number</Typography>
          <Typography>#{task.id}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className="text-uppercase text-muted" variant="subheading">Finalized</Typography>
          <Typography>
            {task.finalized ? (
              <Check style={{ color: "#28a745" }} />
            ) : (
                <Warning style={{ color: "red" }} />
              )}
          </Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container>
        <Grid item xs={9}>
          <Typography
            variant="subheading"
            gutterBottom
            className="text-muted text-uppercase"
          >
            Brief
          </Typography>
          <Typography component="div" className={`${styles.markdownWrapper}`}>
            <Markdown source={pathOrEmpty(["body"], taskSpecification)} />
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            marginTop: 30,
            paddingLeft: 60
          }}
        >
          <Typography className="font-weight-bold" variant="subheading" gutterBottom>
            Worker
          </Typography>
          <Typography>{pathOr("TBD", ["worker", "address"], roles)}</Typography>
          <Typography className="font-weight-bold" variant="subheading" gutterBottom>
            Evaluator
          </Typography>
          <Typography>{pathOr("TBD", ["evaluator", "address"], roles)}</Typography>
          <Typography className="font-weight-bold" variant="subheading" gutterBottom>
            Manager
          </Typography>
          <Typography>{pathOr("TBD", ["manager", "address"], roles)}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default Task;
