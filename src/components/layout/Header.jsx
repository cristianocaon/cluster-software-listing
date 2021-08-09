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

function Header({ value, partitions, handleChange }) {
  const classes = useStyles();
  if (partitions) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} centered>
            {
              partitions.map(partition => {
                return <Tab label={partition} key={partition} />
              })
            }
          </Tabs>
        </AppBar>
      </div>
    );
  } else return null;
}

export default Header;