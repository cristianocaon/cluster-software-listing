import React from 'react';
import StackItem from './StackItem';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: (props) => ({
    flexGrow: 1,
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: '10px',
    backgroundColor: props.level % 2 === 0 ? '#5fa8d3' : '#bfdbf7',
  }),
}));

export default function StackRow({
  data,
  partition,
  level,
  flag,
  index,
  onClick,
  getInfo,
}) {
  const classes = useStyles({ level: level });

  return (
    <Card
      key={partition + '_' + index + '_' + level}
      className={classes.card}
      id={level}
    >
      {data.map((field) => {
        return (
          <StackItem
            key={partition + '_' + field[0] + '_' + level}
            data={field[0]}
            info={field[1]}
            flag={field[2]}
            level={level}
            onClick={onClick}
            getInfo={getInfo}
          />
        );
      })}
    </Card>
  );
}
