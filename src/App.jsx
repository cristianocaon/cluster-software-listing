import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import Loading from './components/Loading';
import StackList from './components/StackList';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import getData from './service/getData';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
  },
  alert: {
    display: 'flex',
    marginTop: '1rem',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  }
}));

function App() {
  const classes = useStyles();

  const [data, setData] = useState();
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

  if (!error && data) {
    let { child } = data[partitionValue].versions['0.15.4'];
    if (loading) return <Loading />
    return (
      <div className={classes.root}>
        <Header value={headerValue} partitions={partitions} handleChange={handleHeaderChange} />
        <StackList data={child} />
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
