import * as React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { TaskTemplate, TaskSpecification, Roles } from "models/colony";
import { pathOr, assocPath } from "ramda";
import Page from "components/presentation/Page";

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
      <Page colonyAddress={this.props.colonyAddress}>
        <div className="mx-5">
          <p>Create a new task in the domain: {this.props.domainId}</p>
          <Form>
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
            <FormGroup>
              <Label className="font-weight-bold">Manager address</Label>
              <Input
                name="manager"
                id="manager"
                value={MANAGER}
                onChange={this.onChange(["roles", "MANAGER"])}
              />
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold">Worker address</Label>
              <Input
                name="worker"
                id="worker"
                value={WORKER}
                onChange={this.onChange(["roles", "WORKER"])}
              />
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold">Evaluator address</Label>
              <Input
                name="evaluator"
                id="evaluator"
                value={EVALUATOR}
                onChange={this.onChange(["roles", "EVALUATOR"])}
              />
            </FormGroup>
            <div className="float-right">
              <Button onClick={onCancel} outline>
                Cancel
              </Button>
              <Button
                onClick={this.onClickCreate}
                className="ml-3"
                outline
                color="primary"
              >
                Create Task
              </Button>
            </div>
          </Form>
        </div>
      </Page>
    );
  }
}
