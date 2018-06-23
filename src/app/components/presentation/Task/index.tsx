import * as React from "react";
import { ListGroupItem } from "reactstrap";
import { Task, TaskSpecification } from "app/models/colony";

type Props = {
  task: Task;
  taskSpecification: TaskSpecification;
};

const task: React.SFC<Props> = ({ task, taskSpecification }) => (
  <ListGroupItem key={`task-${task.id}`}>
    id: {task.id} - skill: {task.skillId}
    <h4>{taskSpecification != null ? taskSpecification.title : ""}</h4>
    <p>{taskSpecification != null ? taskSpecification.body : ""}</p>
    <a href={taskSpecification != null ? taskSpecification.url : ""}>GitHub</a>
  </ListGroupItem>
);

export default task;
