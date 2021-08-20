import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: props => ({
    '&:hover': {
      backgroundColor: props.backgroundColor,
      transition: 'opacity .4s ease-out',
      opacity: '0.5',
    },
    backgroundColor: props.backgroundColor,
    color: 'white',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(200, 200, 200, .3)',
    margin: '10px',
    marginLeft: '8px',
    marginRight: '8px',
    textTransform: 'none',
  }),
}));

function StackItem({ data, info, level, onClick, getInfo }) {


  const [id, setId] = useState("");
  const [flag, setFlag] = useState(false);

  const styleProps = {
    backgroundColor: flag ?
      '#06d6a0'
      : '#073b4c'
  };

  const classes = useStyles(styleProps);

  if (!id) setId(level + "_" + data)

  return (
    <Button
      key={data}
      className={classes.button}
      variant="outlined"
      onClick={(event) => {
        onClick(event, parseInt(id[0]), setFlag)
        getInfo(info);
      }}
      disableElevation={true}>
      {data}
    </Button>
  )
}

export default StackItem
