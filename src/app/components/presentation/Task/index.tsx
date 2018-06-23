import * as React from "react";
import { ListGroupItem } from "reactstrap";
import { Task, TaskSpecification } from "app/models/colony";
import { pathOr } from "ramda";
type Props = {
  task: Task;
  taskSpecification: TaskSpecification;
};

const pathOrEmpty = pathOr("");

const task: React.SFC<Props> = ({ task, taskSpecification }) => (
  <ListGroupItem key={`task-${task.id}`}>
    id: {task.id} - skill: {task.skillId}
    <div>
      <h4>{pathOrEmpty(["title"], taskSpecification)}</h4>
      <p>{pathOrEmpty(["body"], taskSpecification)}</p>
      <a href={pathOrEmpty(["url"], taskSpecification)}>GitHub</a>
    </div>
  </ListGroupItem>
);

export default task;
