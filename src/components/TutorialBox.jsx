import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  box: {
    backgroundColor: '#e7ecef',
    color: '#14213d',
    margin: '1rem',
    marginLeft: '20rem',
    marginRight: '20rem',
    padding: '1rem',
    textAlign: 'center',
  },
}));

export default function TutorialBox({ clicked }) {
  const classes = useStyles();

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (clicked === '') setDisplay(true);
    else setDisplay(false);
  }, [clicked]);

  return (
    <Collapse in={display} timeout={1000}>
      <Card className={classes.box}>
        <Typography>
          Perform the following operations to find the desired outcome:
          <ol>
            <li>Select the partition at the top</li>
            <li>Choose desired application</li>
            <li>Pick version for application</li>
          </ol>
          Alternatively, you can use the input box to search for a specific
          application and version!
          <br />
          <br />
          Further information about applications/versions will appear at the
          bottom.
        </Typography>
      </Card>
    </Collapse>
  );
}
