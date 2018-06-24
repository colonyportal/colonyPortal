import * as React from "react";
import { Task, TaskSpecification } from "app/models/colony";
import { pathOr } from "ramda";
import Markdown from "react-remarkable";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip
} from "@material-ui/core";
import * as styles from "components/presentation/Task/styles.css";

type Props = {
  task: Task;
  taskSpecification: TaskSpecification;
  editTask: (taskId: number) => void;
};

const pathOrEmpty = pathOr("");

const Task: React.SFC<Props> = ({ task, taskSpecification, editTask }) => (
  <Card>
    <CardContent>
      <Chip style={{marginBottom: 15, float: "right"}} label={"skill-" + task.skillId} />
      <Typography gutterBottom variant="headline" component="h2">
        {pathOrEmpty(["title"], taskSpecification)}
      </Typography>
      <Typography component="p">
        <div className={`${styles.markdownWrapper}`} >
          <Markdown className={`${styles.markdown}`} source={pathOrEmpty(["body"], taskSpecification)} />
        </div>
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary" onClick={() => editTask(task.id)}>
        Edit task
      </Button>
    </CardActions>
  </Card>
);

export default Task;
