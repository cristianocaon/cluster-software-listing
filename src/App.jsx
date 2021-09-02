import React, { useState, useEffect } from 'react';
import Path from './components/Path';
import Header from './components/Header';
import Loading from './components/Loading';
import Stack from './components/Stack';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
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
  search: {
    width: '40%',
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
  descAndInfoCard: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    padding: '1rem',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
  },
  descContainer: {
    overflowY: 'auto',
  },
  infoContainer: {
    overflowY: 'auto',
  },
  paths: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function App() {
  const classes = useStyles();

  const [data, setData] = useState();
  const [info, setInfo] = useState();
  const [input, setInput] = useState('');
  const [paths, setPaths] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [partitions, setPartitions] = useState();
  const [headerValue, setHeaderValue] = useState(0);
  const [partitionValue, setPartitionValue] = useState('matador');

  useEffect(() => {
    getData(setData, setLoading, setError);
  }, []);

  useEffect(() => {
    if (data) setPartitions(Object.keys(data));
  }, [data]);

  useEffect(() => {
    if (data) {
      let { child } = data[partitionValue].versions['0.15.4'];
      let keyPath = findPathsToKey({ obj: child, key: input });
      if (keyPath.length > 0) {
        keyPath = keyPath.map((path) => {
          let splitPath = path.split('/');
          let pathVersions = Object.keys(_.get(child, splitPath).versions);
          let filteredPath = splitPath
            .filter((item) => item !== 'versions' && item !== 'child')
            .join('/');
          let finalPath = pathVersions.map(
            (version) => filteredPath + '/' + version
          );
          return [...finalPath];
        });
      }
      let paths = [];
      for (let i = 0; i < keyPath.length; i++) {
        paths = paths.concat(keyPath[i]);
      }

      let formattedPaths = [];
      for (let i = 0; i < paths.length; i++) {
        let splitPath = paths[i].split('/');
        let formattedPath = '';
        for (let j = 0; j < splitPath.length; j++) {
          if (j % 2 === 0) {
            formattedPath += splitPath[j] + '/';
          } else if (j !== splitPath.length - 1) {
            formattedPath += splitPath[j] + ' >>> ';
          } else {
            formattedPath += splitPath[j];
          }
        }
        formattedPaths.push(formattedPath);
      }
      setPaths(formattedPaths);
    }
  }, [data, input, partitionValue]);

  const handleHeaderChange = (event, newValue) => {
    setHeaderValue(newValue);
    setPartitionValue(partitions[newValue]);
  };

  const getInfo = (info, level) => {
    if (level % 2 === 0) {
      setInfo([info]);
    } else {
      setInfo((prevInfo) => [prevInfo, info]);
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handlePathChange = (event) => {
    let temp = event.target.innerText.split('/').join();
    temp = temp.split(' >>> ');
    console.log(temp);
    setPaths([]);
  };

  if (!error && data) {
    let { child } = data[partitionValue].versions['0.15.4'];
    if (loading) return <Loading />;
    return (
      <div className={classes.root}>
        <Header
          className={classes.header}
          value={headerValue}
          partitions={partitions}
          handleChange={handleHeaderChange}
        />
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            className={classes.search}
            margin="dense"
            label="Search Applications"
            variant="outlined"
            onChange={handleChange}
          />
        </form>
        {paths.length > 0 ? (
          <Container className={classes.paths}>
            {paths.map((path) => (
              <Path key={path} data={path} onClick={handlePathChange} />
            ))}
          </Container>
        ) : (
          <Stack data={child} partition={partitionValue} getInfo={getInfo} />
        )}
        <Card className={classes.descAndInfoCard} variant="outlined">
          <Container className={classes.descContainer} fixed>
            {info && info.length >= 1 && (
              <Typography style={{ backgroundColor: '#fff' }}>
                <strong>Description: </strong>
                <Typography>{info[0]}</Typography>
              </Typography>
            )}
          </Container>
          <Divider orientation="vertical" flexItem />
          <Container className={classes.infoContainer} fixed>
            {info && info.length === 2 && (
              <Typography style={{ backgroundColor: '#fff' }}>
                <strong>Module: </strong>
                <span>{info[1].split(' ')[1]}</span>
                <br />
                <strong>Path: </strong>
                <span>{info[1].split(' ')[3]}</span>
              </Typography>
            )}
          </Container>
        </Card>
      </div>
    );
  } else {
    return (
      <Alert severity="error" className={classes.alert}>
        <AlertTitle>Error</AlertTitle>'{error}'
      </Alert>
    );
  }
}

export default App;
