import React, { useState, useEffect } from 'react'
import StackItem from './StackItem';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    flexGrow: 1,
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: '10px',
  }
}));

function StackList({ data }) {
  const classes = useStyles();

  const [values, setValues] = useState([]);
  const [selected, setSelected] = useState([]);
  const [type, setType] = useState('versions');

  const handleClick = (event) => {
    let curr = event.target.innerText.toLowerCase();
    setSelected([...selected, curr])
  }

  useEffect(() => {
    setValues(data)
  }, [data])

  console.log(selected)
  console.log(values)

  if (values) {
    return (
      <Card className={classes.card}>
        {Object.keys(values).map(value => <StackItem data={value} onClick={handleClick} />)}
      </Card>
    )
  }
}

export default StackList
