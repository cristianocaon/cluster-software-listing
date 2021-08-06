import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: '10px',
  },
  button: {
    margin: '10px',
    marginLeft: '8px',
    marginRight: '8px',
  }
}));

function Stack() {
  const classes = useStyles();

  const handleClick = () => {
    console.log("display")
  }

  return (
    <Card className={classes.card}>
      <Button className={classes.button} variant="outlined" color="primary" onClick={handleClick}>GCC</Button>
      <Button className={classes.button} variant="outlined" color="primary" onClick={handleClick}>Intel</Button>
      <Button className={classes.button} variant="outlined" color="primary" onClick={handleClick}>Matlab</Button>
      <Button className={classes.button} variant="outlined" color="primary" onClick={handleClick}>Git</Button>
    </Card>
  )
}

export default Stack
