import * as React from "react";

import { withStyles } from "@material-ui/core/styles"

import Header from "components/presentation/Header";
import SideBar from "components/presentation/SideBar";

import DashboardStyles from "components/presentation/Dashboard/styles"

type ParentProps = {
  colonyAddress: string;

  onPageNav: (route: string) => void;
  onNavHome: () => void;

  // TODO: Move this
  domainCount: number;
  getDomains: () => any;
};

type Props = ParentProps & { classes: StyleClassNames };

type State = {
  sideBarOpen: boolean;
}

class Dashboard extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      sideBarOpen: false
    };
  }

  onSideBarOpen = () => {
    this.setState({ sideBarOpen: true });
  }

  onSideBarClose = () => {
    this.setState({ sideBarOpen: false });
  }

  render() {
    const { onPageNav, onNavHome, classes } = this.props;
    const { sideBarOpen } = this.state;

    return (
      <div>
        <Header onNavHome={onNavHome} onExpand={this.onSideBarOpen} sideBarOpen={sideBarOpen} />
        <div className={classes.root}>
          <SideBar onPageNav={onPageNav} onCollapse={this.onSideBarClose} sideBarOpen={sideBarOpen} />
        </div>
      </div>
    );
  }
}

type StyleClassNames =
{
  root: string
}

export default withStyles(DashboardStyles)<ParentProps>(Dashboard as any);
