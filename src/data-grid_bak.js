import React from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {makeStyles} from '@mui/styles';

function createData(no, stock, confidence, ratio, win, loss, asset_allocation, roi, money) {
    return {
        id: no, stock: stock, confidence: confidence, ratio: ratio,
        win: win, loss: loss, asset_allocation: asset_allocation, roi: roi, money: money
    };
}

// function createColumn(field,headerName,width) {
//     return {field:field,headerName:headerName,width:width};
// }

const rows = [
    createData(1, 1159, null, 24, 4.0, 1, 2, 3, 4000000),
    createData(2, 2317, null, 37, 4.3, 1, 2, 3, 4),
    createData(3, 2162, null, 24, 6.0, 1, 2, 3, 4),
    createData(4, 305, null, 67, 4.3, 1, 2, 3, 4),
    createData(5, 356, null, 49, 3.9, 1, 2, 3, 4),
    // createData(6, 356, 16.0, 49, 3.9, 1, 2, 3, 4),
];

const columns = [
    {
        field: 'id',
        headerName: '數量',
        align: 'center',
        headerAlign: "center",
        width: 80,
        sortable: false,
        disableColumnMenu: true
    },
    {
        field: 'stock', width: 150,
        headerName: '股票代號', cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--cell',
        editable: true, align: 'center', headerAlign: "center"

    },
    {
        field: 'confidence', type: 'number',
        headerName: '信心度(%)', width: 150,
        editable: true, align: 'center', headerAlign: "center",
        renderCell: (params) => (
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Confidence"
                    defaultValue=""
                    // onChange={handleChange}
                >
                    {[0, 20, 40, 60, 80, 100].map((item, index) =>
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    )}
                </Select>
            </FormControl>
        ),
        // valueGetter: (params) => params,
    },
    {
        field: 'ratio',
        headerName: '建議比例(%)',
        type: 'number',
        width: 165, align: 'center', headerAlign: "center"
    },
    {
        field: 'win',
        type: 'number',
        headerName: '停利(%)', cellClassName: 'super-app-positive', headerClassName: 'super-app-positive',
        description: 'This column has a value getter and is not sortable.',
        align: 'center', headerAlign: "center", editable: true,
        width: 135
    },
    {
        field: 'loss', headerName: '停損(%)', cellClassName: 'super-app-negative', headerClassName: 'super-app-negative',
        type: 'number', width: 135, align: 'center', editable: true, headerAlign: "center"
    },
    {
        field: 'asset_allocation',
        headerName: '資產配置比率(%)',
        type: 'number',
        width: 190,
        align: 'center',
        headerAlign: "center"
    },
    {field: 'roi', headerName: '可能投報率(%)', type: 'number', width: 180, align: 'center', headerAlign: "center"},
    {
        field: 'money',
        headerName: '建議配置金額',
        type: 'number',
        width: 170,
        align: 'center',
        headerAlign: "center",
        valueFormatter: ({value}) => currencyFormatter.format(Number(value)),
    }
];

const currencyFormatter = new Intl.NumberFormat('en-US', {maximumSignificantDigits: 3});

const useStyles = makeStyles({
    root: {
        '& .super-app-theme--cell': {
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app-negative': {
            backgroundColor: 'rgba(71,178,29,0.49)',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app-positive': {
            backgroundColor: '#e97986',
            color: '#1a3e72',
            fontWeight: '600',
        },
    },
});

export default function DataGridDemo() {
    const classes = useStyles();

    return (
        <div style={{height: 500, width: '100%'}} className={classes.root}>
            <DataGrid
                components={{
                    Toolbar: GridToolbar,
                }}
                rows={rows}
                columns={columns}
                hideFooterPagination={true}
                // rowsPerPageOptions={[5]}
                // isRowSelectable={(params:any) =>params.Records.Status = "success"}
                disableSelectionOnClick
                checkboxSelection
            />
        </div>
    );
}
