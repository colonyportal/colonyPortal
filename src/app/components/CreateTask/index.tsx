import * as React from "react";
import * as styles from "./styles.css";

export class CreateTask extends React.Component<any, any> {
  componentDidMount() {
    const { loggedIn } = this.props;
    if (!!!loggedIn) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Create Task</h1>
      </div>
    );
  }
}
