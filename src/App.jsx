import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import Loading from './components/Loading';
import StackList from './components/StackList';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import getData from './service/getData';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem',
  },
  alert: {
    display: 'flex',
    marginTop: '1rem',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
  },
  stack: {
    flexGrow: '1'
  },
  text: {
    flexGrow: 0,
    textAlign: 'center',
    padding: '1rem',
    width: '30%',
  }
}));

function App() {
  const classes = useStyles();

  const [data, setData] = useState();
  const [info, setInfo] = useState()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);
  const [partitions, setPartitions] = useState();
  const [headerValue, setHeaderValue] = useState(0);
  const [partitionValue, setPartitionValue] = useState('matador');

  useEffect(() => {
    getData(setData, setLoading, setError);
  }, [])

  useEffect(() => {
    if (data) setPartitions(Object.keys(data));
  }, [data])

  const handleHeaderChange = (event, newValue) => {
    setHeaderValue(newValue);
    setPartitionValue(partitions[newValue]);
  };

  const getInfo = (text) => {
    setInfo(text);
  }

  if (!error && data) {
    let { child } = data[partitionValue].versions['0.15.4'];
    if (loading) return <Loading />
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Header value={headerValue} partitions={partitions} handleChange={handleHeaderChange} />
          <div className={classes.stack}>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField margin="dense" label="Search Applications" variant="outlined" />
            </form>
            <StackList className={classes.stack} data={child} getInfo={getInfo} />
          </div>
        </div>
        {info ?
          <Card className={classes.text} variant="outlined">
            <Typography variant="h6" style={{ backgroundColor: '#fff' }}><strong>Description</strong></Typography>
            <Typography>{info}</Typography>
          </Card>
          : null
        }
      </div>
    );
  } else {
    return (
      <Alert severity="error"
        className={classes.alert}>
        <AlertTitle>Error</AlertTitle>
        '{error}'
      </Alert>
    )
  }
}

export default App;
