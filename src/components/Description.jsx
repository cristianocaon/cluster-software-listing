import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    descAndInfoCard: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'left',
        padding: '1rem',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '20%',
    },
    descContainer: {
        overflowY: 'auto',
    },
    infoContainer: {
        overflowY: 'auto',
    },
}));

export default function Description({ description, info }) {
    const classes = useStyles();

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (description.length !== 0) setDisplay(true);
        else setDisplay(false);
    }, [description]);

    return (
        <Slide direction="up" in={display} timeout={1000}>
            <Card className={classes.descAndInfoCard} variant="outlined">
                <Container className={classes.descContainer} fixed>
                    {description && description.length > 0 ? (
                        <>
                            <Typography variant={'h6'}>
                                <strong>Description: </strong>
                            </Typography>
                            <Typography component={'span'} variant={'body2'}>
                                {description[description.length - 1]}
                            </Typography>
                        </>
                    ) : (
                        <div></div>
                    )}
                </Container>
                <Divider orientation="vertical" flexItem />
                <Container className={classes.infoContainer} fixed>
                    {info &&
                    info.length > 0 &&
                    info.length === description.length ? (
                        <>
                            <Typography variant={'h6'}>
                                <strong>Module: </strong>
                            </Typography>
                            <Typography component={'span'} variant={'body2'}>
                                {info[info.length - 1].split(' ')[1]}
                            </Typography>
                            <Divider style={{ margin: '0.5rem' }} />
                            <Typography variant={'h6'}>
                                <strong>Path: </strong>
                            </Typography>
                            <Typography component={'span'} variant={'body2'}>
                                {info[info.length - 1].split(' ')[3]}
                            </Typography>
                        </>
                    ) : (
                        <div></div>
                    )}
                </Container>
            </Card>
        </Slide>
    );
}
