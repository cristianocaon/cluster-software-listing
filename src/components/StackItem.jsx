import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {
  usePopupState,
  bindHover,
  bindPopper,
} from 'material-ui-popup-state/hooks'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '10px',
    marginLeft: '8px',
    marginRight: '8px',
  },
  paper: {
    padding: '1rem',
  },
}));

function StackItem({ data, info, level, onClick }) {
  const classes = useStyles();

  const [id, setId] = useState("");

  if (!id) setId(level + "_" + data)

  const [flag, setFlag] = useState(false);

  const popupState = usePopupState({
    variant: 'popper',
    popupId: data + 'popper',
  })

  console.log(data)

  return (
    <>
      <Button
        {...bindHover(popupState)}
        key={data}
        className={classes.button}
        variant="outlined"
        color={!flag ? "primary" : "secondary"}
        onClick={(event) => onClick(event, parseInt(id[0]), setFlag)}>
        {data}
      </Button>
      <Popper {...bindPopper(popupState)} transition>
        <Paper className={classes.paper}>
          <Typography>{info}</Typography>
        </Paper>
      </Popper>
    </>
  )
}

export default StackItem
