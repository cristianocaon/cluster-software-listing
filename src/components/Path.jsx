import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: props => ({
    '&:hover': {
      backgroundColor: props.backgroundColor,
      transition: 'opacity .4s ease-out',
      opacity: '0.5',
    },
    backgroundColor: props.backgroundColor,
    color: 'white',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(200, 200, 200, .3)',
    margin: '10px',
    marginLeft: '8px',
    marginRight: '8px',
    textTransform: 'none',
    width: '50%'
  })
}));

function Path({ data }) {
  const classes = useStyles({ backgroundColor: '#073b4c' });

  return (
    <Button
      key={data}
      className={classes.button}
      variant="outlined"
      disableElevation={true}>
      {data}
    </Button>
  )
}

export default Path
