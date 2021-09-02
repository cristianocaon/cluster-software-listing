import React, { useState, useEffect, useRef } from 'react';
import StackRow from './StackRow';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  alert: {
    display: 'flex',
    marginTop: '1rem',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  stack: {
    height: '33rem',
    overflowY: 'auto',
  },
}));

function Stack({ data, partition, getInfo }) {
  const classes = useStyles();

  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState('');
  const [selected, setSelected] = useState([]);
  const [prevLevel, setPrevLevel] = useState(-1);

  const cardsRef = useRef();

  const handleClick = (event) => {
    let rows = cardsRef.current.childNodes;
    let currBtn = event.target.innerText;

    setClicked(currBtn);

    let curr;
    for (let i = 0; i < rows.length; i++) {
      let rowItems = rows[i].childNodes;
      for (let j = 0; j < rowItems.length; j++) {
        if (currBtn === rowItems[j].textContent) {
          curr = rowItems[j].parentElement;
        }
      }
    }

    let id;
    for (let i = 0; i < rows.length; i++) {
      if (curr.textContent === rows[i].textContent) {
        id = i;
      }
    }

    if (level === id) {
      if (id % 2 === 0) {
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
  };

  useEffect(() => {
    let fields = [];
    let lastSelected = selected[selected.length - 1];
    if (level % 2 !== 0) {
      fields = Object.keys(lastSelected).map((key) => {
        let path = lastSelected[key].path;
        let module = lastSelected[key].module_name;
        let info = 'module: ' + module + ' path: ' + path;
        return [key, info, false];
      });
    } else {
      if (selected.length !== 0)
        fields = Object.keys(lastSelected).map((key) => {
          let info = lastSelected[key].info;
          return [key, info, false];
        });
    }

    if (fields.length > 0) {
      if (level > prevLevel) {
        setCards((prevState) => [...prevState, fields]);
      } else {
        setCards((prevState) => [
          ...prevState.slice(0, selected.length),
          fields,
        ]);
      }
    }
  }, [selected, level, prevLevel]);

  useEffect(() => {
    let index = level === 0 ? 0 : level - 1;
    let currRow = cards[index];
    if (currRow) {
      for (let i = 0; i < currRow.length; i++) {
        let currBtn = currRow[i];
        if (currBtn[2] === true) {
          currBtn[2] = false;
        }
        if (currBtn[0] === clicked) {
          currBtn[2] = true;
        }
      }
    }
  }, [cards, clicked, level]);

  useEffect(() => {
    let fields = Object.keys(data).map((key) => {
      let info = data[key].info;
      return [key, info, false];
    });
    setCards([fields]);
    setLevel(0);
  }, [data]);

  useEffect(() => {
    setLevel(0);
    setPrevLevel(-1);
    setSelected([]);
  }, [partition]);

  if (cards) {
    return (
      <div style={{ height: '50vh', overflowY: 'auto' }} ref={cardsRef}>
        {cards.map((card, index) => (
          <StackRow
            data={card}
            partition={partition}
            level={index}
            index={cards.indexOf(card)}
            onClick={handleClick}
            getInfo={getInfo}
          />
        ))}
      </div>
    );
  } else {
    return (
      <Alert severity="error" className={classes.alert}>
        <AlertTitle>Error</AlertTitle>
      </Alert>
    );
  }
}

export default Stack;
