import * as React from "react";
import * as styles from "./styles.css";
import { Button } from "reactstrap";

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
  }

  handleChange(event: any) {
    this.setState({ address: event.target.value });
  }

  render() {
    return (
      <div className={`${styles.wrapper} text-center`}>
        <form className={styles.formSignin}>
          <img
            className={`${styles.formIcon}`}
            src="./assets/icons/logo.svg"
            alt="Colony Portal icon" />
          <img
            className={`${styles.title}`}
            src="./assets/icons/title.svg"
            alt="Colony Portal" />
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
          <Button
            style={ {backgroundImage: 'src(./assets/icons/button-border.svg)'} }
            className={`${styles.formButton} btn-lg btn-primary btn-block`}
            href={`/${this.state.address}/dashboard`}>
            Open colony
          </Button>
        </form>
      </div>
    );
  }
}
