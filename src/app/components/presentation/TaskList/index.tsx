import * as React from "react";
import { SFC } from "react";
import { Task, TaskSpecification } from "models/colony";
import TaskListItem from "../TaskListItem";
import { reverse } from "ramda";
import { List, Card } from "@material-ui/core";

type Props = {
  setActiveTask: (taskId: number) => void;
  tasks: Task[];
  taskSpecifications: TaskSpecification[];
};

export const TaskList: SFC<Props> = ({
  tasks,
  taskSpecifications,
  setActiveTask
}) => (
  <Card>
    <List component="nav">
      {reverse(tasks).map(task => (
        <TaskListItem
          key={"task-" + task.id}
          selectTask={() => setActiveTask(task.id)}
          task={task}
          taskSpecification={taskSpecifications[task.id - 1]}
        />
      ))}
    </List>
  </Card>
);

export default TaskList;
