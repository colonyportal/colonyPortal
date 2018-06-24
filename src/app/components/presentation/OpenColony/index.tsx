import * as React from "react";

import OpenColonyStyle from "components/presentation/OpenColony/styles";
import { modalStyle } from "components/presentation/OpenColony/styles";
// TODO: Remove this, and move towards the other approach for defining styles
import * as styles from "components/presentation/OpenColony/styles.css";

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

import * as Web3 from "web3-utils";

type ParentProps = {
  history: any;
}

type Props = ParentProps & { classes: StyleClassNames, theme: Theme };

type State = {
  address: string;
  buttonHover: boolean;
  exiting: boolean;
  modalOpen: boolean;
};

class OpenColony extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      address: "",
      buttonHover: false,
      exiting: false,
      modalOpen: false,
    };
  }

  handleChange = (event: any) => this.setState({ address: event.target.value });

  onOpenColony = () => {
    const { address } = this.state;

    console.log("here");
    console.log(Web3);
    console.log(Web3.isAddress);

    // if not a valid address
    if (!Web3.isAddress(address)) {
      console.log("NO here");
      this.setState({ modalOpen: true });
      return;
    }

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

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      buttonHover,
      exiting
    } = this.state;

    const {
      classes
    } = this.props;

    const shadowClass = buttonHover ? 'logoShadow' : 'logoShadowHide';
    const baseStyle = exiting ? 'disabled' : 'active';

    return (
      <div className={`${styles.wrapper} ${styles[baseStyle]} text-center mt-5`}>
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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Invalid Colony Address
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              (ex: 0x4479B49eE193E6107Ed2Ad38A9b089Ee362542BA)
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

type StyleClassNames =
  {
    paper: string,
  }

export default withStyles(OpenColonyStyle, { withTheme: true })<ParentProps>(OpenColony as any);
