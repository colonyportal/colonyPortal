import * as React from "react";
import * as styles from "./styles.css";

type Props = {
  history: any; //TODO: figure out history type for react router
};

type State = {
  address: string;
  buttonHover: boolean;
  exiting: boolean;
};

export default class OpenColonyPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      address: "",
      buttonHover: false,
      exiting: false
    };
  }

  handleChange = (event: any) =>this.setState({ address: event.target.value });

  onOpenColony = () => {
    const { address } = this.state;

    // Go to the next page after half a second
    setTimeout(
      () => { this.props.history.push(`/${address}`); },
      500
    );

    console.log("open colony")

    this.setState({ exiting: true });
  }

  onMouseEnter = () => {
    this.setState({ buttonHover: true });
  }

  onMouseLeave = () => {
    this.setState({ buttonHover: false });
  }

  render() {
    const {
      buttonHover,
      exiting
    } = this.state;

    const shadowClass = buttonHover ? 'logoShadow' : 'logoShadowHide';
    const baseStyle = exiting ? 'disabled' : 'active';

    return (
      <div className={`${styles.wrapper} ${styles[baseStyle]} text-center`}>
        <div className="d-flex flex-column align-items-center">
          <div className={`${styles.logoWrapper}`}>
            <img
              className={`${styles[shadowClass]}`}
              src="./assets/icons/logo-shadow.svg"
              alt="Colony Portal logo shadow" />
            <img
              className={`${styles.logo}`}
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
            className={`${styles.textBox} ${styles.addressFiled}`}
            placeholder="Colony address"
            required
          />
          <button
            className={`${styles.button}`}
            onClick={this.onOpenColony}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave} >
            Open Colony
          </button>
        </div>
      </div>
    );
  }
}
