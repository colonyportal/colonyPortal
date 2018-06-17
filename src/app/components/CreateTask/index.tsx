import * as React from "react";
import * as styles from "./styles.css";
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

type State = {
  issues: any[],
}

export class CreateTask extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      issues: [],
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

  renderIssue(issue) {
    return (
      <ListGroupItem>
        <span className="font-weight-bold">Title: </span><p className="text-muted">{issue.title}</p>
        <span className="font-weight-bold">Descriptions: </span><p className="text-muted">{issue.body}</p>
        <span className="font-weight-bold">Link: </span>
        <div className="d-flex justify-content-between">
          <a href={issue.url}>{issue.url}</a>
          <Button color="primary" outline>Convert to Colony Task</Button>
        </div>
      </ListGroupItem>
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
          {issues.map((issue) => this.renderIssue(issue))}
        </ListGroup>
      );
    }
    return result;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1 className="ml-5">Create Task</h1>
        <div>
          {this.renderIssues()}
        </div>
      </div>
    );
  }
}
