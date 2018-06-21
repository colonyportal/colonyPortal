import * as React from "react";
import * as styles from "./styles.css";

type Props = {
  domainCount: number;
  setAddress: (address: string) => any;
  getDomainCount: () => any;
  loggedIn: boolean;
  history: any; //TODO: figure out history type for react router
};

type State = {
  address: string;
  buttonHover: boolean;
};

export default class OpenColonyPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      address: "",
      buttonHover: false
    };
  }

  handleChange = (event: any) =>this.setState({ address: event.target.value });

  onOpenColony = () => {
    const { address } = this.state;
    this.props.history.push(`/${address}`);
    console.log("open colony")
  }

  onMouseEnter = () => {
    this.setState({ buttonHover: true });
  }

  onMouseLeave = () => {
    this.setState({ buttonHover: false });
  }

  render() {
    const shadowClass = this.state.buttonHover ? 'logoShadow' : 'logoShadowHide';

    return (
      <div className={`${styles.wrapper} text-center`}>
        <form className={styles.formSignin}>
          <div className="d-flex flex-column align-items-center">
            <div className={styles.logoWrapper}>
              <img
                className={styles[shadowClass]}
                src="./assets/icons/logo-shadow.svg"
                alt="Colony Portal logo shadow" />
              <img
                className={styles.logo}
                src="./assets/icons/logo.svg"
                alt="Colony Portal logo" />
            </div>
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
            <button
              className={`${styles.formButton}`}
              onClick={this.onOpenColony}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave} >
              Open Colony
            </button>
          </div>
        </form>
      </div>
    );
  }
}
