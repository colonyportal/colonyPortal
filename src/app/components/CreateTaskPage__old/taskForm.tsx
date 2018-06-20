import * as React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Issue } from 'models/IssueModel';

type Props = {
  issue: Issue,
  onCancel: (() => void),
  onCreate: ((attrs) => void),
}

type State = {
  title: string,
  body: string,
  url: string,
}

export default class TaskForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: props.issue.title,
      body: props.issue.body,
      url: props.issue.url,
    };
  }

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeBody = (e) => {
    this.setState({
      body: e.target.value,
    });
  }

  onChangeUrl = (e) => {
    this.setState({
      url: e.target.value,
    });
  }

  onClickCreate = (e) => {
    this.props.onCreate(this.state);
  }

  render() {
    const { onCancel } = this.props;
    const { title, body, url } = this.state;

    return (
      <div className="mx-5">
        <Form>
          <FormGroup>
            <Label className="font-weight-bold">Name</Label>
            <Input name="title" id="title" value={title} onChange={this.onChangeTitle} />
          </FormGroup>
          <FormGroup>
            <Label className="font-weight-bold">Brief</Label>
            <Input name="body" id="body" type="textarea" value={body} onChange={this.onChangeBody} />
          </FormGroup>
          <FormGroup>
            <Label className="font-weight-bold">Issue URL</Label>
            <Input name="url" id="url" value={url} onChange={this.onChangeUrl} />
          </FormGroup>
          <div className="float-right" >
            <Button onClick={onCancel} outline>Cancel</Button>
            <Button onClick={this.onClickCreate} className="ml-3" outline color="primary">Create Task</Button>
          </div>
        </Form>
      </div>
    );
  }
}
