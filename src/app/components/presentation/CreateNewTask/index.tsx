import * as React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { TaskTemplate } from "models/colony";
import { pathOr } from "ramda";
import Page from "components/presentation/Page";

const pathOrEmpty = pathOr("");

type Props = {
  taskTemplate?: TaskTemplate;
  colonyAddress: string;
  domainId: number;
  onCancel: () => void;
  onCreate: (taskTemplate: TaskTemplate) => void;
  match: any;
  history: any;
};

type State = {
  title: string;
  body: string;
  url: string;
};

export default class CreateNewTask extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: pathOrEmpty(["taskTemplate", "title"], props),
      body: pathOrEmpty(["taskTemplate", "body"], props),
      url: pathOrEmpty(["taskTemplate", "url"], props)
    };
  }

  onChangeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  onChangeBody = e => {
    this.setState({
      body: e.target.value
    });
  };

  onChangeUrl = e => {
    this.setState({
      url: e.target.value
    });
  };

  onClickCreate = e => {
    const { colonyAddress, domainId } = this.props;
    console.log("colonyAddress: " + colonyAddress)
    this.props.onCreate({
      colonyAddress,
      domainId,
      issueData: this.state,
    });
    this.props.history.push(`/${colonyAddress}/tasks`);
  };

  render() {
    const { onCancel } = this.props;
    const { title, body, url } = this.state;

    return (
      <Page colonyAddress={this.props.match.params.colonyAddress}>
        <div className="mx-5">
          <p>Create a new task in the domain: {this.props.domainId}</p>
          <Form>
            <FormGroup>
              <Label className="font-weight-bold">Name</Label>
              <Input
                name="title"
                id="title"
                value={title}
                onChange={this.onChangeTitle}
              />
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold">Brief</Label>
              <Input
                name="body"
                id="body"
                type="textarea"
                value={body}
                onChange={this.onChangeBody}
              />
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold">Issue URL</Label>
              <Input
                name="url"
                id="url"
                value={url}
                onChange={this.onChangeUrl}
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
