import { StyleRulesCallback } from '@material-ui/core/styles';

const DashboardStyles : StyleRulesCallback = (theme: any) => ({
  root: {
    flexGrow: 1,
    height: `100%`,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  }
});

export default DashboardStyles;
