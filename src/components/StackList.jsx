import React, { useState, useEffect } from 'react'
import StackItem from "./StackItem";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    flexGrow: 1,
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: '10px',
  },
  button: {
    margin: '10px',
    marginLeft: '8px',
    marginRight: '8px',
  },
  paper: {
    padding: '1rem',
  },
}));

function StackList({ data, partition, getInfo }) {
  const classes = useStyles();

  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [prevLevel, setPrevLevel] = useState(-1);

  const handleClick = (event, id, setFlag) => {
    let currBtn = event.target.innerText;
    console.log(level, prevLevel);
    if (level === id) {
      if (level % 2 === 0) {
        if (selected.length === 0) {
          setSelected([...selected, data[currBtn].versions]);
        } else {
          let lastSelected = selected[selected.length - 1];
          setSelected([...selected, lastSelected[currBtn].versions]);
        }
      } else {
        let lastSelected = selected[selected.length - 1];
        setSelected([...selected, lastSelected[currBtn].child]);
      }
      setPrevLevel(level);
      setLevel(level + 1);
    } else {
      let newSelected = selected.slice(0, id);
      if (id % 2 === 0) {
        if (newSelected.length === 0) {
          setSelected([...newSelected, data[currBtn].versions]);
        } else {
          let lastSelected = newSelected[newSelected.length - 1];
          setSelected([...newSelected, lastSelected[currBtn].versions]);
        }
      } else {
        let lastSelected = newSelected[newSelected.length - 1];
        setSelected([...newSelected, lastSelected[currBtn].child]);
      }
      setPrevLevel(level);
      setLevel(id + 1);
    }
    setFlag(true);
  }

  useEffect(() => {
    let fields = [];
    let lastSelected = selected[selected.length - 1];
    if (level % 2 !== 0) {
      fields = Object.keys(lastSelected).map(key => {
        let path = lastSelected[key].path;
        let module = lastSelected[key].module_name;
        let info = "module: " + module + " path: " + path;
        return [key, info];
      })
    } else {
      if (selected.length !== 0)
        fields = Object.keys(lastSelected).map(key => {
          let info = lastSelected[key].info;
          return [key, info];
        })
    }
    if (fields.length > 0) {
      if (level > prevLevel) {
        setCards(prevState => ([...prevState, fields]))
        // setCards([...cards, fields]);
      } else {
        setCards(prevState => ([...prevState.slice(0, selected.length), fields]));
        // setCards([...cards.slice(0, selected.length), fields, fields]);
      }
    }
  }, [selected, level, prevLevel])     // bugs at adding 'cards' dependency

  useEffect(() => {
    let fields = Object.keys(data).map(key => {
      let info = data[key].info;
      return [key, info];
    })
    setCards([fields]);
  }, [data])

  useEffect(() => {
    setLevel(0);
    setPrevLevel(-1);
    setSelected([]);
  }, [partition])

  console.log(level, prevLevel);

  if (cards) {
    return (
      cards.map(card => (
        <Card key={partition + "_" + cards.indexOf(card) + "_" + level} className={classes.card}>
          {
            card.map(field => {
              return <StackItem
                key={partition + "_" + field[0] + "_" + level}
                data={field[0]}
                info={field[1]}
                level={level}
                onClick={handleClick}
                getInfo={getInfo} />
            })
          }
        </Card>
      ))
    )
  } else return null;
}

export default StackList
