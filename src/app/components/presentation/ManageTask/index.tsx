import * as React from "react";
import { Task, TaskSpecification } from "app/models/colony";
import { pathOr } from "ramda";

type Props = {
  task: Task;
  taskSpecification: TaskSpecification;
  confirm: () => void;
  cancel: () => void;
};

const pathOrEmpty = pathOr("");

const ManageTask: React.SFC<Props> = ({
  task,
  taskSpecification,
  confirm,
  cancel
}) => (
  <>
    id: {task.id} - skill: {task.skillId}
    <div>
      <h4>{pathOrEmpty(["title"], taskSpecification)}</h4>
      <p>{pathOrEmpty(["body"], taskSpecification)}</p>
      <a href={pathOrEmpty(["url"], taskSpecification)}>GitHub</a>
      <div className="d-flex justify-content-between" />
      <button onClick={confirm}>Confirm</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  </>
);

export default ManageTask;
