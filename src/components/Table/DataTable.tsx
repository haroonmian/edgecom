import React from 'react'
// mui-imports 
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'

interface Props {
    rows: any[],
    columns: any[],
    componentsProps:any,
    components:any,
    initialState: any
}

const DataTable: React.FC<Props>= ({rows, columns, components,initialState,componentsProps}) => {
    return (
        <Box sx={{ height: 400, width: '100%', margin: '0 auto' }}>
            <StyledDataGrid
            initialState={initialState}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={components}
                componentsProps={componentsProps}
            />
        </Box>
    )
}

export default DataTable
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },

  }))

