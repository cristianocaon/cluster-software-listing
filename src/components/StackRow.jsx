import React from 'react'
import StackItem from "./StackItem";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: props => ({
    flexGrow: 1,
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: '10px',
    backgroundColor: props.level % 2 === 0 ? '#9a8c98' : '#d9d9d9',
  }),
}));

function StackRow({ data, partition, level, index, onClick, getInfo }) {

  const classes = useStyles({ level: level })

  return (
    <Card
      key={partition + "_" + index + "_" + level}
      className={classes.card}
      id={level}
    >
      {
        data.map(field => {
          return <StackItem
            key={partition + "_" + field[0] + "_" + level}
            data={field[0]}
            info={field[1]}
            level={level}
            onClick={onClick}
            getInfo={getInfo}
          />
        })
      }
    </Card>
  )
}

export default StackRow
