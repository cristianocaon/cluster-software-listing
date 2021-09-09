import React, { useState, useEffect } from 'react';
import Path from './components/Path';
import Header from './components/Header';
import Loading from './components/Loading';
import Stack from './components/Stack';
import Description from './components/Description';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
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

export default function App() {
  const classes = useStyles();

  const [data, setData] = useState();
  const [partitions, setPartitions] = useState();
  const [headerValue, setHeaderValue] = useState(0);
  const [partitionValue, setPartitionValue] = useState('matador');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [description, setDescription] = useState([]);
  const [input, setInput] = useState('');
  const [paths, setPaths] = useState([]);
  const [pathCards, setPathCards] = useState();
  const [pathSelected, setPathSelected] = useState();

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

  const handleInfoChange = (newData, newLevel) => {
    if (newLevel % 2 === 0) {
      if (newLevel < description.length) {
        let newInfo = info.slice(0, newLevel);
        setInfo(newInfo);
        let newDescription = description.slice(0, newLevel).concat(newData);
        setDescription(newDescription);
      } else {
        let joinedDescription = description.concat(newData);
        setDescription(joinedDescription);
      }
    } else {
      if (newLevel < description.length) {
        let newDescription = description.slice(0, newLevel);
        setDescription(newDescription);
        let newInfo = info.slice(0, newLevel - 1).concat(newData);
        setInfo(newInfo);
      } else {
        let newInfo = info.slice(0, newLevel - 1).concat(newData);
        setInfo(newInfo);
      }
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handlePathChange = (event) => {
    let { child } = data[partitionValue].versions['0.15.4'];
    let temp = event.target.innerText.split('/').join();
    temp = temp.split(' >>> ');
    temp = temp.map((child) => child.split(','));

    let keys = [];
    for (let i = 0; i < temp.length; i++) {
      keys = keys.concat(temp[i]);
    }

    let paths = [];
    for (let i = 0; i < keys.length; i++) {
      if (paths.length === 0) {
        paths.push([keys[0]]);
        continue;
      }
      let temp = [];
      for (let j = 0; j < paths[i - 1].length; j++) {
        temp.push(paths[i - 1][j]);
      }
      if (i % 2 === 0) temp.push('child');
      else temp.push('versions');
      temp.push(keys[i]);
      paths.push(temp);
    }

    let selected = [];
    for (let i = 0; i < paths.length; i++) {
      if (i % 2 === 0) {
        selected.push(_.get(child, paths[i]).versions);
      } else {
        selected.push(_.get(child, paths[i]).child);
      }
    }

    let cards = [];
    let field = Object.keys(child).map((key) => {
      let info = child[key].info;
      let flag = keys.includes(key) ? true : false;
      return [key, info, flag];
    });

    cards.push(field);

    for (let i = 0; i < selected.length; i++) {
      let lastSelected = selected[i];
      let field;
      if (i % 2 === 0) {
        field = Object.keys(lastSelected).map((key) => {
          let path = lastSelected[key].path;
          let module = lastSelected[key].module_name;
          let info = 'module: ' + module + ' path: ' + path;
          let flag = keys.includes(key) ? true : false;
          return [key, info, flag];
        });
      } else {
        if (selected.length !== 0) {
          field = Object.keys(lastSelected).map((key) => {
            let info = lastSelected[key].info;
            let flag = keys.includes(key) ? true : false;
            return [key, info, flag];
          });
        }
      }
      cards.push(field);
    }
    cards.pop();

    let descriptions = [];
    let infos = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].length; j++) {
        if (cards[i][j][2]) {
          if (i % 2 === 0) {
            descriptions.push(cards[i][j][1]);
          } else {
            infos.push(cards[i][j][1]);
          }
        }
      }
    }

    setDescription(descriptions);
    setInfo(infos);
    setPathSelected(selected);
    setPathCards(cards);
    setPaths([]);
  };

  useEffect(() => {
    setInfo([]);
    setDescription([]);
  }, [partitionValue]);

  if (!error && data) {
    let { child } = data[partitionValue].versions['0.15.4'];
    if (loading) return <Loading />;
    return (
      <div className={classes.root}>
        <Header
          className={classes.header}
          value={headerValue}
          partitions={partitions}
          onChange={handleHeaderChange}
        />
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            className={classes.search}
            margin="dense"
            label="Search Applications"
            variant="outlined"
            onChange={handleInputChange}
          />
        </form>
        {paths.length > 0 ? (
          <Container className={classes.paths}>
            {paths.map((path) => (
              <Path key={path} data={path} onClick={handlePathChange} />
            ))}
          </Container>
        ) : (
          <Stack
            data={child}
            partition={partitionValue}
            handleInfoChange={handleInfoChange}
            pathSelected={pathSelected}
            pathCards={pathCards}
          />
        )}
        <Description description={description} info={info} />
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
