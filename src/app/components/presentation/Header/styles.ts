import { StyleRulesCallback } from '@material-ui/core/styles';
import { DrawerWidth } from "components/presentation/SideBar/styles"


const HeaderStyle : StyleRulesCallback = (theme: any) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: `white`,
    color: `black`,
  },
  appBarShift: {
    marginLeft: DrawerWidth,
    width: `calc(100% - ${DrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  addressButton: {
    background: 'linear-gradient(to right, #C96DD8 10%, #3023AE)',
    borderRadius: 9,
    border: 0,
    color: 'white',
    height: 38,
    padding: '5px 15px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    fontSize: '0.775rem',
  },
  addressSelector: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  logo: {
    height: 30,
    width: 30,
  }
});

export default HeaderStyle;
