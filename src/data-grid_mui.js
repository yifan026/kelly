import React, {useState, useEffect} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {makeStyles} from '@mui/styles';
import Button from "@material-ui/core/Button";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import NumberFormat from 'react-number-format';

let rows = [
    createData(1, 1159, null, 24, 4.0, 1, 2, 3, 4000000),
    createData(2, 1159, null, 24, 4.0, 1, 2, 3, 4000000),
];

function createData(no, stock = null, confidence = null, ratio = null, win = null, loss = null, asset_allocation = null, roi = null, money = null) {

    return {
        id: no, stock: stock, confidence: confidence, ratio: ratio,
        win: win, loss: loss, asset_allocation: asset_allocation, roi: roi, money: money
    };
}

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const {onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function MoneyInput(props) {

    return (
        <TextField id="formatted-numberformat-input"
                   label="投資or賣出金額"
                   name="numberformat"
                   variant="outlined"
                   InputProps={{
                       inputComponent: NumberFormatCustom,
                   }}
                   value={props.moneyText}
                   onChange={props.onChange}
        />
    );


}

function Title() {

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Kelly資產配置</div>
    )
}

// function useTableStatus() {
//     const [rows, setRows] = useState(createData(1, 1159, null, 24, 4.0, 1, 2, 3, 4000000));
//
//     return rows;
// }

function AddNewRowBtn(props) {

    // useEffect(() => {
    //
    // });

    return (
        <Button id="add" variant="contained" size="large" className="addNewRow" onClick={props.onClick}>
            新增
            <Icon>add_circle</Icon>
        </Button>
    );

}


// class AddNewRowBtn extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.handleNewRow = this.handleNewRow.bind(this);
//     // }
//     //
//     // handleNewRow(e) {
//     //     // this.state.rows = createData(1, 1159, null, 24, 4.0, 1, 2, 3, 4000000)
//     //     this.props.onAddNewRow(e.target.value);
//     // }
//
//     // function handleNewRow() {
//     //
//     //     let rows = [
//     //         createData(1, 1159, null, 24, 4.0, 1, 2, 3, 4000000),
//     //     ];
//     //
//     // }
//
//     render() {
//         return (
//             <Button id="add" variant="contained" size="large" className="addNewRow" onClick={this.handleNewRow}>
//                 {/*<button className="square" onClick={props.onClick}>*/}
//                 {/*{props.value}*/}
//                 新增
//                 <Icon>add_circle</Icon>
//             </Button>
//         );
//     }
//
// }

function DataTable(props) {

    const onCellClicked = () => console.log('Cell was clicked');


    return (

        <DataGrid
            components={{
                Toolbar: GridToolbar,
            }}
            rows={props.rows}
            columns={columns}
            hideFooterPagination={true}
            onCellValueChange={onCellClicked}
            // rowsPerPageOptions={[5]}
            // isRowSelectable={(params:any) =>params.Records.Status = "success"}
            // disableSelectionOnClick
            // checkboxSelection
        />
    );

}


// class DataTable extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             rows: [],
//             moneyText: null,
//             stockNo: null,
//             confidence: null,
//             win: null,
//             loss: null
//         };
//
//         this.handleMoneyTextChange = this.handleMoneyTextChange.bind(this);
//         this.handleWinValChange = this.handleWinValChange.bind(this);
//     }
//
//
//     handleMoneyTextChange(moneyText) {
//         this.setState({
//             moneyText: moneyText
//         });
//     }
//
//     handleWinValChange(win) {
//         this.setState({
//             win: win
//         })
//     }
//
//
//     render() {
//         return (
//             <DataGrid
//                 components={{
//                     Toolbar: GridToolbar,
//                 }}
//                 rows={this.state.rows}
//                 columns={columns}
//                 hideFooterPagination={true}
//                 // rowsPerPageOptions={[5]}
//                 // isRowSelectable={(params:any) =>params.Records.Status = "success"}
//                 disableSelectionOnClick
//                 checkboxSelection
//             />
//         );
//     }
//
// }


// function DataTable(props) {
//
//     const moneyText = props.moneyText;
//     const stockNo = props.stockNo;
//     const confidence = props.confidence;
//     const win = props.win;
//     const loss = props.loss
//
//     return (
//         <DataGrid
//             components={{
//                 Toolbar: GridToolbar,
//             }}
//             rows={rows}
//             columns={columns}
//             hideFooterPagination={true}
//             // rowsPerPageOptions={[5]}
//             // isRowSelectable={(params:any) =>params.Records.Status = "success"}
//             disableSelectionOnClick
//             checkboxSelection
//         />
//     )
// }


// class KellyDataGrid extends React.Component {
//
//     render() {
//         return (
//
//         );
//     }
//
// }


// function createColumn(field,headerName,width) {
//     return {field:field,headerName:headerName,width:width};
// }


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

const DG = () => {

    const classes = useStyles();
    let [rows, setRows] = useState([createData(1,2333,20,null,1,2,null,null,null)]);
    let [count_no, setCount] = useState(2);
    const [moneyText, setMoneyText] = useState(null);
    const [stockNo, setStockNo] = useState('');
    const [confidence, setConfidence] = useState(null);
    const [win, setWin] = useState(null);
    const [loss, setLoss] = useState(null);

    const handleAddNewRowClick = () => {
        setCount(count_no + 1);

        // rows = .slice(0, this.state.stepNumber + 1);
        console.log('b',rows)

        let new_rows = [createData(count_no)];

        setRows(rows.concat(new_rows));

    }

    const handleRowsChange = (e) => {

        setRows(e.target.value);
        setStockNo(e.target.value);
        setConfidence(e.target.value);
        setWin(e.target.value);
        setLoss(e.target.value);
    }

    const handleMoneyChange = (e) => {
        setMoneyText(e.target.value)
        // console.log(e.target.value)
    }

    useEffect(() => {
        console.log(moneyText,rows);
    });

    return (
        <div>
            <Box
                // component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off">

                <Title/>

                <MoneyInput moneyText={moneyText} onChange={handleMoneyChange}/>

                <AddNewRowBtn onClick={handleAddNewRowClick}/>

            </Box>

            <div style={{height: 500, width: '100%'}} className={classes.root}>
                <DataTable rows={rows} />
            </div>
        </div>
    );


}


export default DG;