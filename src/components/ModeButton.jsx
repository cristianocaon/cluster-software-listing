import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function ModeButton({ handleChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup color="primary">
        <Button onClick={handleChange}>Stack</Button>
        <Button onClick={handleChange}>Plain</Button>
      </ButtonGroup>
    </div>
  );
}

export default ModeButton
