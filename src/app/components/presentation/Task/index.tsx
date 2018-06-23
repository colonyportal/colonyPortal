import * as React from "react";
import { ListGroupItem } from "reactstrap";
import { Task, TaskSpecification } from "app/models/colony";
import { pathOr } from "ramda";
import * as styles from "./styles.css";

type Props = {
  task: Task;
  taskSpecification: TaskSpecification;
  manageTask: (taskId: number) => void;
};

const pathOrEmpty = pathOr("");

const task: React.SFC<Props> = ({ task, taskSpecification, manageTask }) => (
  <ListGroupItem>
    id: {task.id} - skill: {task.skillId}
    <div>
      <h4>{pathOrEmpty(["title"], taskSpecification)}</h4>
      <p>{pathOrEmpty(["body"], taskSpecification)}</p>
      <div className="d-flex justify-content-between">
        {/* TODO: Should check if the currently active account is the manager, worker or evaluator of the task and only display this button if they are */}
        <a href={pathOrEmpty(["url"], taskSpecification)}>GitHub</a>
        <button
          className={`${styles.convertButton}`}
          onClick={() => manageTask(task.id)}
        >
          Manage task
        </button>
      </div>
    </div>
  </ListGroupItem>
);

export default task;
