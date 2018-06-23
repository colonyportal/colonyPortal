import * as React from "react";
import { ListGroupItem } from "reactstrap";
import { Task, TaskSpecification } from "app/models/colony";
import { pathOr } from "ramda";
import * as styles from "./styles.css";

type Props = {
  task: Task;
  taskSpecification: TaskSpecification;
  proposePayout: (taskId: number) => void
};

const pathOrEmpty = pathOr("");

const task: React.SFC<Props> = ({ task, taskSpecification, proposePayout }) => (
  <ListGroupItem key={`task-${task.id}`}>
    id: {task.id} - skill: {task.skillId}
    <div>
      <h4>{pathOrEmpty(["title"], taskSpecification)}</h4>
      <p>{pathOrEmpty(["body"], taskSpecification)}</p>
      <a href={pathOrEmpty(["url"], taskSpecification)}>GitHub</a>
      <div className="d-flex justify-content-between">
        <button
          className={`${styles.convertButton}`}
          onClick={() => proposePayout(task.id)}
        >
          Set propose payout
        </button>
      </div>
    </div>
  </ListGroupItem>
);

export default task;
