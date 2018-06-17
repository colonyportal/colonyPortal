import * as React from "react";
import * as styles from "./styles.css";
import LoginButton from 'components/Login/index';

export class CreateTask extends React.Component<any, any> {
  render() {
    const { loggedIn, markUserAsLoggedIn } = this.props;

    return (
      <div className={styles.wrapper}>
        <LoginButton loggedIn={loggedIn} markUserAsLoggedIn={markUserAsLoggedIn} />
      </div>
    );
  }
}
