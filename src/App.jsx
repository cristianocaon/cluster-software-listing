import React, { useState, useEffect } from 'react'
import Header from './components/layout/Header';
import ModeButton from './components/ModeButton';
import Content from './components/layout/Content';
import { makeStyles } from '@material-ui/core/styles';

import getData from './service/getData';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
  }
}));

function App() {
  const classes = useStyles();

  const [data, setData] = useState();
  const [partitions, setPartitions] = useState();
  const [headerValue, setHeaderValue] = useState(0);
  const [contentValue, setContentValue] = useState('STACK');

  useEffect(() => {
    setData(getData());
  }, [])

  useEffect(() => {
    if (data) setPartitions(Object.keys(data));
  }, [data])

  const handleHeaderChange = (event, newValue) => {
    setHeaderValue(newValue);
  };

  const handleContentChange = (event) => {
    setContentValue(event.target.innerText.replace(/\n/ig, ''));
  };

  return (
    <div className={classes.root}>
      <ModeButton handleChange={handleContentChange} />
      <Header value={headerValue} partitions={partitions} handleChange={handleHeaderChange} />
      <Content value={contentValue} />
    </div>
  );
}

export default App;
