import * as React from "react";
import * as styles from "./styles.css";
import { ListGroup, ListGroupItem } from 'reactstrap';
import TaskForm from './taskForm';
import Nav from "app/components/Nav";

type Props = {
  colonyAddress: string
  loggedIn: boolean
  history: any,
  createColonyTask: any,
}

type State = {
  issues: any[],
  displayAllIssues: boolean,
  selectedIssue?: any,
}

export class CreateTask extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      issues: [],
      displayAllIssues: true,
      selectedIssue: null,
    };
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    if (!!!loggedIn) {
      this.props.history.push("/login");
    } else {
      const token = document.cookie.split(';').filter((item) => item.includes('token='))[0].split("token=")[1];
      fetch(`https://api.github.com/user/issues?access_token=${token}&filter=all`)
        .then(response => response.json())
        .then((data) => {
          this.setState({
            issues: data,
          })
        });
    }
  }

  onClickConvert = (e) => {
    this.setState({
      displayAllIssues: false,
      selectedIssue: this.state.issues[e.target.dataset.issueIndex],
    });
  }

  onClickCancelCreateTaskButton = () => {
    this.setState({
      displayAllIssues: true,
    })
  }

  onClickCreateTaskButton = (formAttrs) => {
    // redirect to tasks index page, use a fake colonyAddress for now
    this.props.createColonyTask(formAttrs);
    // this.props.history.push("/1/tasks");
  }

  renderIssue(issue, index) {
    return (
      <ListGroupItem key={`issue-${index}`}>
        <span className="font-weight-bold">Title: </span><p className="text-muted">{issue.title}</p>
        <span className="font-weight-bold">Descriptions: </span><p className="text-muted">{issue.body}</p>
        <span className="font-weight-bold">Link: </span>
        <div className="d-flex justify-content-between">
          <a href={issue.url}>{issue.url}</a>
          <button
            className={`${styles.convertButton}`}
            onClick={this.onClickConvert}
            data-issue-index={index}>
            Convert to Colony Task
          </button>
        </div>
      </ListGroupItem>
    );
  }

  renderSelectedIssue() {
    return (
      <TaskForm
        issue={this.state.selectedIssue}
        onCancel={this.onClickCancelCreateTaskButton}
        onCreate={this.onClickCreateTaskButton}
      />
    );
  }

  renderIssues() {
    const { issues } = this.state;
    let result;
    if (issues.length === 0) {
      result = (<div className="text-center">No Issues</div>);
    } else {
      result = (
        <ListGroup className={`mx-5 mt-3 ${styles.issueGroup}`}>
          {issues.map((issue, index) => this.renderIssue(issue, index))}
        </ListGroup>
      );
    }
    return result;
  }

  render() {
    const { displayAllIssues } = this.state;
    const { colonyAddress } = this.props

    return (
      <div>
        <Nav colonyAddress={colonyAddress} />
        <h1 className="ml-5">Create Task</h1>
        <div>
          {displayAllIssues && this.renderIssues()}
          {!!!displayAllIssues && this.renderSelectedIssue()}
        </div>
      </div>
    );
  }
}
