import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Header({ value, handleChange }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Nocona" />
          <Tab label="Quanah" />
          <Tab label="Matador" />
          <Tab label="Toreador" />
          <Tab label="GPU_Build" />
          <Tab label="CC-Reserved" />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default Header;