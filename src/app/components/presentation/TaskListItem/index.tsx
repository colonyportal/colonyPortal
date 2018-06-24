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
const trimmedSpec = (path: string, spec: TaskSpecification) => {
  var string = pathOrEmpty([path], spec);
  var length = 60;
  var trimmed = string.length > length ?
                string.substring(0, length - 3) + "..." : string;
  return trimmed;
}

const TaskListItem: React.SFC<Props> = ({
  task,
  taskSpecification,
  selectTask
}) => (
  <>
  <ListItem button onClick={() => selectTask(task.id)} className="active">
    <ListItemText
      primary={trimmedSpec("title", taskSpecification)}
      secondary={trimmedSpec("body", taskSpecification)}
    />
  </ListItem>
  <Divider />
  </>
);

export default TaskListItem;
