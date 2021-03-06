import React, { useState, useEffect, useRef } from 'react';
import StackRow from './StackRow';
import TutorialBox from './TutorialBox';
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

export default function Stack({
    data,
    partition,
    handleInfoChange,
    pathSelected,
    pathCards,
    setPathCards,
    setPathSelected,
    isTutorialDisplay,
}) {
    const classes = useStyles();

    const [level, setLevel] = useState(0);
    const [cards, setCards] = useState([]);
    const [changed, setChanged] = useState(0);
    const [clicked, setClicked] = useState('');
    const [selected, setSelected] = useState([]);
    const [prevLevel, setPrevLevel] = useState(-1);
    const [isTutorial, setIsTutorial] = useState(true);

    const cardsRef = useRef();

    const handleClick = (event, btnRef) => {
        let rows = cardsRef.current.childNodes;
        let currBtn = event.target.innerText;

        setClicked(currBtn);

        let curr = [];
        for (let i = 0; i < rows.length; i++) {
            let rowItems = rows[i].childNodes;
            for (let j = 0; j < rowItems.length; j++) {
                if (currBtn === rowItems[j].textContent) {
                    curr.push(rowItems[j].parentElement);
                }
            }
        }

        let currTemp;
        if (curr.length > 1) {
            for (let i = 0; i < curr.length; i++) {
                if (
                    curr[i].attributes[1].nodeValue ===
                    btnRef.current.attributes[3].nodeValue
                ) {
                    currTemp = curr[i];
                }
            }
        } else {
            currTemp = curr[0];
        }

        let id;
        for (let i = 0; i < rows.length; i++) {
            if (currTemp.textContent === rows[i].textContent) {
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
                    setSelected([
                        ...newSelected,
                        lastSelected[currBtn].versions,
                    ]);
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
                return [key, info, false, level];
            });
        } else {
            if (selected.length !== 0)
                fields = Object.keys(lastSelected).map((key) => {
                    let info = lastSelected[key].info;
                    return [key, info, false, level];
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
    }, [selected, level, prevLevel, pathSelected]);

    useEffect(() => {
        let index = level === 0 ? 0 : level - 1;
        let currRow = cards[index];
        if (currRow) {
            for (let i = 0; i < currRow.length; i++) {
                let currBtn = currRow[i];
                if (currBtn[2] === true && typeof pathCards === 'undefined') {
                    currBtn[2] = false;
                }
                if (currBtn[0] === clicked) {
                    currBtn[2] = true;
                }
            }
            if (pathCards && pathSelected) {
                setPathCards();
                setPathSelected();
            }
            setChanged((prevState) => prevState + 1);
            setPathCards();
            setPathSelected();
        }
    }, [cards, clicked, level]);

    useEffect(() => {
        let fields = Object.keys(data).map((key) => {
            let info = data[key].info;
            return [key, info, false, level];
        });
        setCards([fields]);
        setLevel(0);
    }, [data]);

    useEffect(() => {
        setLevel(0);
        setPrevLevel(-1);
        setSelected([]);
        setClicked('');
    }, [partition]);

    useEffect(() => {
        if (pathSelected && pathCards) {
            setSelected(pathSelected);
            setCards(pathCards);
            setLevel(pathSelected.length);
            setPrevLevel(pathSelected.length - 1);
            setChanged((prevState) => prevState + 1);
        }
    }, [pathSelected, pathCards]);

    useEffect(() => {
        if (isTutorialDisplay) {
            let fields = Object.keys(data).map((key) => {
                let info = data[key].info;
                return [key, info, false, level];
            });
            setCards([fields]);
            setIsTutorial(isTutorialDisplay);
            setLevel(0);
            setPrevLevel(-1);
            setSelected([]);
            setClicked('');
        }
    }, [isTutorialDisplay]);

    if (cards) {
        return (
            <div
                style={{
                    height: isTutorialDisplay ? '100vh' : '55vh',
                    overflowY: isTutorialDisplay ? 'hidden' : 'auto',
                }}
                ref={cardsRef}
            >
                {cards.map((card, index) => (
                    <>
                        <StackRow
                            key={partition + '_' + index + '_' + card}
                            data={card}
                            partition={partition}
                            level={index}
                            index={cards.indexOf(card)}
                            onClick={handleClick}
                            handleInfoChange={handleInfoChange}
                        />
                        {clicked === '' && level === 0 && isTutorial && (
                            <TutorialBox clicked={clicked} />
                        )}
                    </>
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
