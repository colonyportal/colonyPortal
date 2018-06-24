import { StyleRulesCallback } from "@material-ui/core/styles";

const OpenColonyStyle : StyleRulesCallback = (theme: any) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

export default OpenColonyStyle;

export const modalStyle = ({
    width: `482px`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
})
