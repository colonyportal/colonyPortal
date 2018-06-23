import * as React from "react";
import { Task, TaskSpecification } from "app/models/colony";
import { pathOr } from "ramda";
import { ListItem, ListItemText, Divider } from "@material-ui/core";

type Props = {
  task: Task;
  taskSpecification: TaskSpecification;
  selectTask: (taskId: number) => void;
};

const pathOrEmpty = pathOr("");

const TaskListItem: React.SFC<Props> = ({
  task,
  taskSpecification,
  selectTask
}) => (
  <>
  <ListItem button onClick={() => selectTask(task.id)} className="active">
    <ListItemText
      primary={pathOrEmpty(["title"], taskSpecification)}
      secondary={pathOrEmpty(["body"], taskSpecification)}
    />
  </ListItem>
  <Divider />
  </>
);

export default TaskListItem;
