import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        position: 'static',
        background: '#0a100d',
        color: '#edf2f4',
        alignItems: 'center',
    },
}));

export default function Header({
    value,
    partitions,
    onChange,
    handleTutorialDisplay,
}) {
    const classes = useStyles();

    if (partitions) {
        return (
            <AppBar className={classes.root}>
                <Toolbar>
                    <Tabs value={value} onChange={onChange} centered>
                        {partitions.map((partition) => {
                            return <Tab label={partition} key={partition} />;
                        })}
                        <IconButton
                            color="inherit"
                            component="span"
                            onClick={handleTutorialDisplay}
                        >
                            <HelpIcon />
                        </IconButton>
                    </Tabs>
                </Toolbar>
            </AppBar>
        );
    } else return null;
}
