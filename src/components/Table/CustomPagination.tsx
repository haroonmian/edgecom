import React from 'react'
// mui-imports
import { gridPageSelector, gridPageCountSelector, useGridSelector, useGridApiContext } from '@mui/x-data-grid'
import { Pagination, PaginationItem } from '@mui/material'

const CustomPagination = () =>{
const apiRef = useGridApiContext()
const page = useGridSelector(apiRef, gridPageSelector);
const pageCount = useGridSelector(apiRef, gridPageCountSelector);
return(
    <Pagination
    color="primary"
    variant="outlined"
    shape="rounded"
    page={page + 1}
    count={pageCount}
    // @ts-expect-error
    renderItem={(props) => <PaginationItem {...props} disableRipple />}
    onChange={(event: React.ChangeEvent<unknown>, value: number) =>
      apiRef.current.setPage(value - 1)
    }
    />
)}

export default CustomPagination