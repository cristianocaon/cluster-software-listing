import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';

export default function Header({ value, partitions, onChange }) {
  if (partitions) {
    return (
      <AppBar
        position="static"
        style={{ background: '#0a100d', color: '#edf2f4' }}
      >
        <Tabs value={value} onChange={onChange} centered>
          {partitions.map((partition) => {
            return <Tab label={partition} key={partition} />;
          })}
        </Tabs>
      </AppBar>
    );
  } else return null;
}
