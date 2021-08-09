import StackList from '../components/StackList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function Stack({ data, partition }) {
  const classes = useStyles();

  if (data) {
    const { child } = data[partition].versions['0.15.4'];
    return <StackList data={child} />
  } else return null;
}

export default Stack
