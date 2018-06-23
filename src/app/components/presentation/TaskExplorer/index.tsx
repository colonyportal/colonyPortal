import * as React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle
} from "reactstrap";
import { Task, Domain, TaskSpecification } from "models/colony";
import { filter, findIndex, propEq } from "ramda";
import { Link } from "react-router-dom";
import Page from "app/components/presentation/Page";
import TaskList from "app/components/presentation/TaskList";
import TaskComponent from "../Task";
import { Grid } from "@material-ui/core";

type Props = {
  domains: Domain[];
  tasks: Task[];
  selectedTaskId: number;
  selectedDomainIndex: number;
  taskSpecifications: TaskSpecification[];
  tokenAddr: string;
  colonyAddress: string;

  fetchDomains: () => void;
  fetchTasks: () => void;
  setActiveDomain: (domainIndex: number) => void;
  setActiveTask: (taskId: number) => void;
  getToken: () => void;
};

export default class TaskExplorer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    props.fetchDomains();
    props.fetchTasks();
  }

  render() {
    const {
      domains,
      colonyAddress,
      setActiveDomain,
      setActiveTask,
      selectedDomainIndex,
      tasks,
      taskSpecifications,
      selectedTaskId
    } = this.props;

    const tasksForDomain = filter(
      task => task.domainId.toString() === selectedDomainIndex.toString(),
      tasks
    );
    const selectedTaskIndex: number =
      selectedTaskId < 0
        ? tasks.length - 1
        : findIndex(propEq("id", selectedTaskId))(tasks);
    console.log("selectedTask: " + selectedTaskIndex);
    return (
      <Page colonyAddress={colonyAddress}>
        <Card className="mt-3">
          <CardHeader>
            <ButtonGroup>
              {domains.map(domain => (
                <Button
                  color="info"
                  outline={domain.domainId == domain.domainId}
                  className="text-capitalize mr-3"
                  key={`btn-${domain.domainId}`}
                  onClick={() => setActiveDomain(domain.domainId)}
                  active={selectedDomainIndex == domain.domainId}
                >
                  {domain.domainId}
                </Button>
              ))}
            </ButtonGroup>
          </CardHeader>
          <CardBody>
            <ButtonGroup>
              <Link to={`/${colonyAddress}/create-new-task`}>
                <Button className="mr-2" outline>
                  Create new task
                </Button>
              </Link>

              <Link to={`/${colonyAddress}/import-issue`}>
                <Button outline>Import task from GitHub</Button>
              </Link>
            </ButtonGroup>
            <CardTitle className="mt-3">Tasks to be Pickup</CardTitle>
            <Grid container spacing={24}>
              <Grid item xs={3}>
                <TaskList
                  tasks={tasksForDomain}
                  taskSpecifications={taskSpecifications}
                  setActiveTask={setActiveTask}
                />
              </Grid>
              <Grid item xs={9}>
                {selectedTaskIndex >= 0 && tasks.length > 0 ? (
                  <TaskComponent
                    task={tasks[selectedTaskIndex]}
                    taskSpecification={taskSpecifications[selectedTaskIndex]}
                    editTask={(n: number) => console.log("edit task")}
                  />
                ) : (
                  <p>No selected task </p>
                )}
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </Page>
    );
  }
}
