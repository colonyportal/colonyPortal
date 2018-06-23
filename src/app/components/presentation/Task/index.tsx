import * as React from "react";
import { ListGroupItem } from "reactstrap";
import { Task, TaskSpecification } from "app/models/colony";
import {} from "ramda";
type Props = {
  task: Task;
  taskSpecification: TaskSpecification;
};

const task: React.SFC<Props> = ({ task, taskSpecification }) => (
  <ListGroupItem key={`task-${task.id}`}>
    id: {task.id} - skill: {task.skillId}
    isEmpty(taskSpecification) ? (
    <h4>{taskSpecification.title}</h4>
    <p>{taskSpecification.body}</p>
    <a href={taskSpecification.url}>GitHub</a>
    ) : ""
  </ListGroupItem>
);

export default task;
