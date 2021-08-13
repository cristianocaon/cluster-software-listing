import React, { useState } from 'react'
import Fade from '@material-ui/core/Fade';
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
    textTransform: 'none',
  },
  paper: {
    padding: '1rem',
    width: '25%',
    height: '50%',
  },
}));

function StackItem({ data, info, level, onClick, getInfo }) {
  const classes = useStyles();

  const [id, setId] = useState("");
  const [flag, setFlag] = useState(false);

  if (!id) setId(level + "_" + data)

  const popupState = usePopupState({
    variant: 'popper',
    popupId: data + 'popper',
  })

  return (
    <>
      <Button
        {...bindHover(popupState)}
        key={data}
        className={classes.button}
        variant="outlined"
        color={!flag ? "primary" : "secondary"}
        onClick={(event) => {
          onClick(event, parseInt(id[0]), setFlag)
          getInfo(info);
        }}>
        {data}
      </Button>
    </>
  )
}

export default StackItem
