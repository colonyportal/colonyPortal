import * as React from "react";
import LoginButton from 'components/Login/index';

export class CreateTask extends React.Component<any, any> {
  render() {
    return <LoginButton loggedIn={this.props.loggedIn} />
  }
}
