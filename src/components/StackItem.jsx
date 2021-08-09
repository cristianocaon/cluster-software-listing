import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '10px',
    marginLeft: '8px',
    marginRight: '8px',
  }
}));

function StackItem({ data, onClick }) {
  const classes = useStyles();

  return (
    <>
      <Button className={classes.button} variant="outlined" color="primary" onClick={onClick} key={data}>{data}</Button>
    </>
  )
}

export default StackItem
