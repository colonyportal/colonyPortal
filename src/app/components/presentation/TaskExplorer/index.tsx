import * as React from "react";
import { Task, Domain, TaskSpecification } from "models/colony";
import { filter, findIndex, propEq, findLast, last, pathOr } from "ramda";
import TaskList from "components/presentation/TaskList";
import TaskComponent from "components/presentation/Task";
import {
  Grid,
  Tabs,
  Paper,
  Tab,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import GithubIssueList from "../../container/GitHubIssueList";

type Props = {
  domains: Domain[];
  tasks: Task[];
  selectedTaskId: number;
  selectedDomainIndex: number;
  taskSpecifications: TaskSpecification[];
  colonyAddress: string;
  showGithubIssueList: boolean;
  waiting: boolean;
  rolesCurrentTask: any;

  createNewTask: () => void;
  importTaskFromGithub: () => void;
  fetchDomains: () => void;
  fetchTasks: () => void;
  setActiveDomain: (domainIndex: number) => void;
  setActiveTask: (taskId: number) => void;
  openGithubIssueList: () => void;
  closeGithubIssueList: () => void;
};

export default class TaskExplorer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    props.fetchDomains();
    props.fetchTasks();
  }

  render() {
    const {
      colonyAddress,
      domains,
      setActiveDomain,
      setActiveTask,
      selectedDomainIndex,
      tasks,
      taskSpecifications,
      selectedTaskId,
      createNewTask,
      showGithubIssueList,
      openGithubIssueList,
      closeGithubIssueList,
      waiting,
      rolesCurrentTask
    } = this.props;

    const tasksForDomain = filter(
      task => task.domainId.toString() === selectedDomainIndex.toString(),
      tasks
    );
    const selectedTaskIndex: number | undefined =
      selectedTaskId < 0
        ? (pathOr as any)(0, ["id"], last(tasksForDomain)) - 1
        : findIndex(propEq("id", selectedTaskId))(tasks);
    console.log("selectedTask: " + selectedTaskIndex);
    return (
      <>
        <GithubIssueList
          colonyAddress={colonyAddress}
          open={showGithubIssueList}
          onClose={closeGithubIssueList}
        />
        <Paper>
          <Tabs
            value={selectedDomainIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event: object, value: number) => {
              const newestTaskInDomain = findLast(
                propEq("domainId", value),
                tasks
              );
              setActiveTask(
                newestTaskInDomain != null ? newestTaskInDomain.id : -1
              );
              setActiveDomain(value);
            }}
          >
            {domains.map(domain => (
              <Tab
                label={`Domain-${domain.domainId}`}
                key={`btn-${domain.domainId}`}
                value={domain.domainId}
              />
            ))}
          </Tabs>
        </Paper>
        <Typography component="div" style={{ padding: 8 * 3 }}>
          <div>
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: 10 }}
              onClick={createNewTask}
            >
              Create Task
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: 10, marginLeft: 10 }}
              onClick={openGithubIssueList}
            >
              Import Task From Gitub
            </Button>
            {waiting ? (
              <CircularProgress style={{ float: "right" }} size={50} />
            ) : (
              ""
            )}
          </div>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <TaskList
                tasks={tasksForDomain}
                taskSpecifications={taskSpecifications}
                setActiveTask={setActiveTask}
              />
            </Grid>
            <Grid item xs={9}>
              {selectedTaskIndex != undefined &&
              selectedTaskIndex >= 0 &&
              tasks.length > 0 ? (
                <TaskComponent
                  roles={rolesCurrentTask}
                  task={tasks[selectedTaskIndex]}
                  taskSpecification={taskSpecifications[selectedTaskIndex]}
                  editTask={(n: number) => console.log("edit task")}
                />
              ) : (
                <p>No selected task </p>
              )}
            </Grid>
          </Grid>
        </Typography>
      </>
    );
  }
}
