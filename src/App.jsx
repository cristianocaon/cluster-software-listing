import React, { useState, useEffect } from 'react'
import Path from './components/Path';
import Header from './components/Header';
import Loading from './components/Loading';
import Stack from './components/Stack';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import findPathsToKey from './util/findPathsToKey';

import _ from 'lodash';

import getData from './service/getData';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
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
    marginTop: '1rem',
    padding: '1rem',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  paths: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1rem',
  }
}));

function App() {
  const classes = useStyles();

  const [data, setData] = useState();
  const [info, setInfo] = useState()
  const [input, setInput] = useState("")
  const [paths, setPaths] = useState([])
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

  useEffect(() => {
    if (data) {
      let { child } = data[partitionValue].versions['0.15.4'];
      let keyPath = findPathsToKey({ obj: child, key: input });
      if (keyPath.length > 0) {
        keyPath = keyPath.map(path => {
          let splitPath = path.split('/')
          let pathVersions = Object.keys(_.get(child, splitPath).versions);
          let filteredPath = splitPath.filter(item => item !== 'versions' && item !== 'child').join('/')
          let finalPath = pathVersions.map(version => filteredPath + "/" + version)
          return [...finalPath];
        })
      }
      let paths = [];
      for (let i = 0; i < keyPath.length; i++) {
        paths = paths.concat(keyPath[i])
      }

      let formattedPaths = []
      for (let i = 0; i < paths.length; i++) {
        let splitPath = paths[i].split('/');
        let formattedPath = "";
        for (let j = 0; j < splitPath.length; j++) {
          if (j % 2 === 0) {
            formattedPath += splitPath[j] + "/";
          } else if (j !== splitPath.length - 1) {
            formattedPath += splitPath[j] + " >>> ";
          } else {
            formattedPath += splitPath[j]
          }
        }
        formattedPaths.push(formattedPath);
      }
      setPaths(formattedPaths);
    }
  }, [data, input, partitionValue])

  const handleHeaderChange = (event, newValue) => {
    setHeaderValue(newValue);
    setPartitionValue(partitions[newValue]);
  };

  const getInfo = (info, level, isApp) => {
    // console.log(isApp);
    console.log(level)
    if (level % 2 === 0) {
      setInfo([info]);
    } else {
      setInfo(prevInfo => ([prevInfo, info]));
    }
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handlePathChange = (event) => {
    let temp = event.target.innerText.split("/").join();
    temp = temp.split(' >>> ');
    console.log(temp)
    setPaths([]);
  };

  if (!error && data) {
    let { child } = data[partitionValue].versions['0.15.4'];
    if (loading) return <Loading />
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Header className={classes.header} value={headerValue} partitions={partitions} handleChange={handleHeaderChange} />
          <div className={classes.stack}>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField margin="dense" label="Search Applications" variant="outlined" onChange={handleChange} />
            </form>
            {paths.length > 0 ?
              <Card className={classes.paths}>{paths.map(path => <Path key={path} data={path} onClick={handlePathChange} />)}</Card>
              : <Stack className={classes.stack} data={child} partition={partitionValue} getInfo={getInfo} />}
          </div>
        </div>
        <Card className={classes.text} variant="outlined">
          {info && info.length === 1 &&
            <Typography variant="h6" style={{ backgroundColor: '#fff' }}>
              <strong>Description: </strong>
              <span>{info[0]}</span>
            </Typography>
          }
          {info && info.length === 2 &&
            <>
              <Typography variant="h6" style={{ backgroundColor: '#fff' }}>
                <strong>Description: </strong>
                <span>{info[0]}</span>
              </Typography>
              <Typography variant="h6" style={{ backgroundColor: '#fff' }}>
                <strong>Info: </strong>
                <span>{info[1]}</span>
              </Typography>
            </>
          }
        </Card>
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
