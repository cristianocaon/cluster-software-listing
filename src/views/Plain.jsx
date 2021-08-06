import React, { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: '10px',
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(153, 193, 222, 0.7)',
    },
    '& .MuiDataGrid-row.Mui-even:not(:hover)': {
      backgroundColor: 'rgba(188, 212, 230, 0.3)'
    }
  }
}));

function Plain() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [fields, setFields] = useState([]);

  return (
    <div className={classes.table}>
      <DataGrid
        rows={rows}
        columns={fields}
        pageSize={25}
        autoHeight={true}
        disableColumnMenu={true}
        disableSelectionOnClick={true}
        rowsPerPageOptions={[]}
      />
    </div>
  )
}

export default Plain
