import * as React from "react";
import LoginButton from "../Login/index";

type Props = {
  domainCount: number;
  setAddress: (address: string) => any;
  getDomainCount: () => any;
  loggedIn: boolean;
};

type State = {
  address: string
};

export class OpenColony extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      address: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ address: event.target.value });
  }

  handleSubmit(event: any) {
    this.props.setAddress(this.state.address);
    this.props.getDomainCount();
    event.preventDefault();
  }

  render() {
    const { domainCount } = this.props;
    return (
      <div>
        <h1>Add Colony</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Colony Address:
            <br />
            <input
              type="text"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Add Colony" />
        </form>
        <hr />
        <p>Number of domains in Colony: {domainCount}</p>
        <LoginButton loggedIn={this.props.loggedIn} />
      </div>
    );
  }
}
