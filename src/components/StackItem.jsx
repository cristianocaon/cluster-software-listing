import React, { useRef } from 'react';
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
        color: props.color,
        border: '1',
        borderColor: '#3f37c9',
        borderRadius: 3,
        margin: '10px',
        marginLeft: '8px',
        marginRight: '8px',
        textTransform: 'none',
    }),
}));

export default function StackItem({
    data,
    info,
    flag,
    level,
    onClick,
    handleInfoChange,
}) {
    const styleProps = {
        color: flag ? '#0019ff' : '#fbffef',
        backgroundColor: flag
            ? '#36e79b'
            : level % 2 === 0
            ? '#003f88'
            : '#858ae3',
    };

    const classes = useStyles(styleProps);

    const btnRef = useRef();

    return (
        <Button
            id={level}
            ref={btnRef}
            key={data}
            className={classes.button}
            variant="outlined"
            onClick={(event) => {
                onClick(event, btnRef);
                handleInfoChange(info, level);
            }}
            disableElevation={true}
        >
            {data}
        </Button>
    );
}
