import * as React from "react";
import { FormGroup, Label } from "reactstrap";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TaskTemplate, TaskSpecification, Roles } from "models/colony";
import { pathOr, assocPath } from "ramda";

const pathOrEmpty = pathOr("");

type Props = {
  colonyAddress: string,
  domainId: number,
  taskTemplate?: TaskTemplate;
  onCancel: () => void;
  onCreate: (domainId: number, taskSpecification: TaskSpecification, roles: Roles) => void;
};

type State = {
  taskSpecification: {
    title: string;
    body: string;
    url: string;
  };
  roles: {
    MANAGER?: string;
    EVALUATOR?: string;
    WORKER?: string;
  };
};

export default class CreateNewTask extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      taskSpecification: {
        title: pathOrEmpty(["taskTemplate", "title"], props),
        body: pathOrEmpty(["taskTemplate", "body"], props),
        url: pathOrEmpty(["taskTemplate", "url"], props)
      },
      roles: {
        MANAGER: "",
        WORKER: "",
        EVALUATOR: ""
      }
    };
  }

  onChange = (path: string[]) => e =>
    this.setState(assocPath(path, e.target.value, this.state));

  onClickCreate = e => {
    this.props.onCreate(
      this.props.domainId,
      this.state.taskSpecification,
      this.state.roles
    );
  };

  render() {
    const { onCancel } = this.props;
    const { title, body, url } = this.state.taskSpecification;
    const { MANAGER, EVALUATOR, WORKER } = this.state.roles;

    return (
      <div className="mx-5">
        <h1>Create a Task</h1>
        <p className="text-muted">Tasks are the smallest unit of a colony. You are the manager of this task.</p>
        <Grid container spacing={16} style={{ flexGrow: 1 }}>
          <Grid item xs={8}>
            <FormGroup>
              <Label className="font-weight-bold">Name</Label>
              <Input
                name="title"
                id="title"
                value={title}
                onChange={this.onChange(["taskSpecification", "title"])}
              />
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold">Brief</Label>
              <Input
                name="body"
                id="body"
                type="textarea"
                value={body}
                onChange={this.onChange(["taskSpecification", "body"])}
              />
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold">Issue URL</Label>
              <Input
                name="url"
                id="url"
                value={url}
                onChange={this.onChange(["taskSpecification", "url"])}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <div className="d-flex flex-column mb-3" style={{ display: 'flex', flexWrap: 'wrap' }}>
              <InputLabel className="font-weight-bold" style={{ color: 'black' }}>Manager Address</InputLabel>
              <Input
                name="manager"
                id="manager"
                value={MANAGER}
                placeholder={"No one - assign yourself"}
                onChange={this.onChange(["roles", "MANAGER"])}
              />
            </div>
            <div className="d-flex flex-column mb-3" style={{ display: 'flex', flexWrap: 'wrap' }}>
              <InputLabel className="font-weight-bold" style={{ color: 'black' }}>Worker Address</InputLabel>
              <Input
                name="worker"
                id="worker"
                value={WORKER}
                placeholder={"No one - assign yourself"}
                onChange={this.onChange(["roles", "WORKER"])}
              />
            </div>
            <div className="d-flex flex-column mb-3" style={{ display: 'flex', flexWrap: 'wrap' }}>
              <InputLabel className="font-weight-bold" style={{ color: 'black' }}>Evaluator Address</InputLabel>
              <Input
                name="evaluator"
                id="evaluator"
                value={EVALUATOR}
                placeholder={"No one - assign yourself"}
                onChange={this.onChange(["roles", "EVALUATOR"])}
              />
            </div>
            <div className="float-right">
              <Button
                style={{ backgroundColor: '#FFF', color: '#636363' }}
                onClick={onCancel}
                variant="contained"
                color="default"
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: '#090A2C', color: '#989FFF' }}
                onClick={this.onClickCreate}
                className="ml-3"
                variant="contained"
                color="primary"
              >
                Create Task
              </Button>
            </div>
          </Grid>
        </Grid>
      </div >
    );
  }
}
