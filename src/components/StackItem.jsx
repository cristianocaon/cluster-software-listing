import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: (props) => ({
    '&:hover': {
      backgroundColor: props.backgroundColor,
      transition: 'opacity .4s ease-out',
      opacity: '0.5',
    },
    backgroundColor: props.backgroundColor,
    color: 'white',
    border: 0,
    borderRadius: 3,
    margin: '10px',
    marginLeft: '8px',
    marginRight: '8px',
    textTransform: 'none',
  }),
}));

function StackItem({ data, info, flag, level, onClick, getInfo }) {
  const styleProps = {
    backgroundColor: flag ? '#06d6a0' : level % 2 === 0 ? '#22223b' : '#335c67',
  };

  const classes = useStyles(styleProps);

  return (
    <Button
      key={data}
      className={classes.button}
      variant="outlined"
      onClick={(event) => {
        onClick(event);
        getInfo(info, level);
      }}
      disableElevation={true}
    >
      {data}
    </Button>
  );
}

export default StackItem;
