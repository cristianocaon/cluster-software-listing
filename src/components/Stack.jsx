import React, { useState, useEffect, useRef } from 'react'
import StackRow from "./StackRow";

function StackList({ data, partition, getInfo }) {

  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [prevLevel, setPrevLevel] = useState(-1);

  const cardsRef = useRef();

  const handleClick = (event, setFlag) => {
    let rows = cardsRef.current.childNodes;
    let currBtn = event.target.innerText;

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

    console.log(level, id)

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
      } else {
        setCards(prevState => ([...prevState.slice(0, selected.length), fields]));
      }
    }
  }, [selected, level, prevLevel])

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

  if (cards) {
    return (
      <div ref={cardsRef} >
        {cards.map(card =>
          <StackRow
            data={card}
            partition={partition}
            level={level}
            index={cards.indexOf(card)}
            onClick={handleClick}
            getInfo={getInfo}
          />
        )}
      </div>
    )
  } else return null;
}

export default StackList
