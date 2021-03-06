import * as React from "react";

import * as classNames from "classnames";

import { Route } from "react-router";
import { withStyles } from "@material-ui/core/styles"
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import BallotIcon from 'components/presentation/BallotIcon';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import ChartIcon from 'components/presentation/ChartIcon';
import PeopleIcon from '@material-ui/icons/People';
import BackupIcon from '@material-ui/icons/Backup';
import FolderShareIcon from '@material-ui/icons/FolderShared';
import ColoniesIcon from '@material-ui/icons/LeakAdd';

// Pages
import AccountSettings from "components/presentation/AccountSettings";
import TaskExplorer from "components/container/TaskExplorer";
import CreateNewTask from "components/container/CreateNewTask";
import ImportIssue from "components/presentation/ImportIssue";
import ColonyOverview from "components/presentation/ColonyOverview";
import Wallet from "components/presentation/Wallet";
import Analytics from "components/presentation/Analytics";
import Social from "components/presentation/Social";
import ColonyGenerator from "components/presentation/ColonyGenerator";
import ColonyDrive from "components/presentation/ColonyDrive";
import ColonyCollab from "components/presentation/ColonyCollab";

import SideBarStyle from "components/presentation/SideBar/styles";

type ParentProps = {
  onPageNav: (route: string) => void;
  onCollapse: () => void;

  sideBarOpen: boolean;
}

type Props = ParentProps & { classes: StyleClassNames, theme: Theme };

type State = {}

class SideBar extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {

    const { classes, theme, onPageNav, onCollapse, sideBarOpen } = this.props;

    return (
      <>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !sideBarOpen && classes.drawerPaperClose),
          }}
          open={sideBarOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={onCollapse}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
            <List>
              <Tooltip id="tooltip-bottom" title="Account" placement="bottom">
                <ListItem button onClick={()=>{ onPageNav("account"); }}>
                  <ListItemIcon>
                  <img
                    className={classes.avatar}
                    src="/assets/icons/user.svg"
                    alt="Colony Portal" />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItem>
              </Tooltip>
            </List>
          <Divider />
          <List>
            <div>
              <Tooltip id="tooltip-top" title="Overview" placement="top">
                <ListItem button onClick={()=>{ onPageNav("overview"); }}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Overview" />
                </ListItem>
              </Tooltip>
              <Tooltip id="tooltip-top" title="Tasks" placement="top">
                <ListItem button onClick={()=>{ onPageNav("tasks"); }}>
                  <ListItemIcon>
                  <BallotIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tasks" />
                </ListItem>
              </Tooltip>
              <Tooltip id="tooltip-top" title="Wallet" placement="top">
                <ListItem button onClick={()=>{ onPageNav("wallet"); }}>
                  <ListItemIcon>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Wallet" />
                </ListItem>
              </Tooltip>
              <Tooltip id="tooltip-top" title="Analytics" placement="top">
                <ListItem button onClick={()=>{ onPageNav("analytics"); }}>
                  <ListItemIcon>
                    <ChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
                </ListItem>
              </Tooltip>
              <Tooltip id="tooltip-top" title="Social" placement="top">
                <ListItem button onClick={()=>{ onPageNav("social"); }}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Social" />
                </ListItem>
              </Tooltip>
              <Tooltip id="tooltip-top" title="Collab" placement="top">
                <ListItem button onClick={()=>{ onPageNav("collab"); }}>
                  <ListItemIcon>
                    <ColoniesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Collab" />
                </ListItem>
              </Tooltip>
              <Tooltip id="tooltip-top" title="New Colony" placement="top">
                <ListItem button onClick={()=>{ onPageNav("generator"); }}>
                  <ListItemIcon>
                    <BackupIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Colony" />
                </ListItem>
              </Tooltip>
              <Tooltip id="tooltip-top" title="Drive" placement="top">
                <ListItem button onClick={()=>{ onPageNav("drive"); }}>
                  <ListItemIcon>
                    <FolderShareIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drive" />
                </ListItem>
              </Tooltip>
            </div>
          </List>
        </Drawer>
        <main className={classes.content}>
            <div className={classes.toolbar} />
              {/*TODO: Remove this once we have an overview page, but for the demo this is default*/}
              <Route exact path="/:colonyAddress" component={TaskExplorer} />
              
              <Route exact path="/:colonyAddress/account" component={AccountSettings} />
              <Route exact path="/:colonyAddress/overview" component={ColonyOverview} />
              <Route exact path="/:colonyAddress/tasks" component={TaskExplorer} />
              <Route exact path="/:colonyAddress/wallet" component={Wallet} />
              <Route exact path="/:colonyAddress/analytics" component={Analytics} />
              <Route exact path="/:colonyAddress/social" component={Social} />
              <Route exact path="/:colonyAddress/collab" component={ColonyCollab} />
              <Route exact path="/:colonyAddress/generator" component={ColonyGenerator} />
              <Route exact path="/:colonyAddress/drive" component={ColonyDrive} />

              {/* TODO: Move these into TaskExplore + create quick access buttons */}
              <Route path="/:colonyAddress/import-issue" component={ImportIssue} />
              <Route path="/:colonyAddress/create-new-task" component={CreateNewTask} />
              {/*import ManageTask from "components/container/ManageTask"*/
               /*<Route exact path="/:colonyAddress/tasks/:taskId" component={ManageTask} />*/}
        </main>
      </>
    );
  }
}

type StyleClassNames =
{
  root: string,
  drawerPaper: string,
  drawerPaperClose: string,
  toolbar: string,
  content: string,
  avatar: string
}

export default withStyles(SideBarStyle, {withTheme: true})<ParentProps>(SideBar as any);
