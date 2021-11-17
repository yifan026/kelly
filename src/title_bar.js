import React from 'react';
// import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import SendIcon from '@mui/icons-material/Send';
import Icon from '@mui/material/Icon';
// import * as React from "react";

function AddNewRow(props) {
    return (
        <Button id="add" variant="contained" size="large" className="addNewRow" onClick={console.log('hello')}>
            {/*<button className="square" onClick={props.onClick}>*/}
            {/*{props.value}*/}
            新增
            <Icon>add_circle</Icon>
        </Button>
    );
}

export default function BasicTable() {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off">

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Kelly資產配置</div>

            <TextField id="outlined-basic" label="投資or賣出金額" variant="outlined"/>

            {/*<Button id="compute" variant="contained" size="large" endIcon={<SendIcon/>} onClick={sayHello}>開始計算</Button>*/}

            <AddNewRow />

        </Box>

    );
}