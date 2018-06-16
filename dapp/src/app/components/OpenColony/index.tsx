import * as React from "react";
import * as styles from "./styles.css";

type Props = {
  domainCount: number;
  setAddress: (address: string) => any;
  getDomainCount: () => any;
  loggedIn: boolean;
};

type State = {
  address: string;
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
    event.preventDefault();
  }

  render() {
    return (
      <div className={`${styles.wrapper} text-center`}>
        <form onSubmit={this.handleSubmit} className={styles.formSignin}>
          <label htmlFor="inputColonyAddress" className="sr-only">
            Colony Address
          </label>
          <input
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
            id="inputColonyAddress"
            className={`${styles.formControl} ${styles.addressFiled}`}
            placeholder="Colony address"
            required
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Open colony
          </button>
        </form>
      </div>
    );
  }
}
