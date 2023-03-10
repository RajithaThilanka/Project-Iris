import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';
import { Stack,Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 150,
    editable: false
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: false
  },
  {
    field: "reportType",
    headerName: "Report Type",
    type: "number",
    width: 110,
    editable: false
  },


{
  field: 'action',
  headerName: 'Action',
  width: 180,
  sortable: false,
  disableClickEventBubbling: true,
  
  renderCell: (params) => {
      const onClick = (e) => {
        const currentRow = params.row;
        // return alert(JSON.stringify(currentRow, null, 4));
      };
      
      return (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" onClick={onClick}><MessageIcon /></IconButton>
          <IconButton size="small" onClick={onClick}><VisibilityIcon /></IconButton>
          <IconButton size="small" onClick={onClick}><DeleteIcon /></IconButton>
        </Stack>
      );
  },
}



];

const rows = [
  { id: 1, fullName: "Snow", email: "Jon@gmail.com", reportType: "Fake profile"},
  
  {
    id: 2,
    fullName: "Lannister",
    email: "Cersei@gmail.com",
    reportType: "hatespeech",
    
  }

];

export default function Profilereports() {
  return (
    
    <Box sx={{ height: 400, width: 800,justifyContent: 'center', textAlign:'center'  }}>
    <Typography variant='h6'>Account Reports </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
