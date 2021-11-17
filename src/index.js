import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import TB from './table';
import DG from './data-grid';
// import App from './App';
// import Table from './table';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';

ReactDOM.render(
    <React.Fragment>
        <CssBaseline/>
        <Container maxWidth="xl">
            {/*<TB/>*/}
            {/*<Table sx={{ bgcolor: '#cfe8fc' }} />*/}
            <DG/>
        </Container>
    </React.Fragment>,
    document.getElementById('root')
);


// export default function SimpleContainer() {
//     return (
//         <React.Fragment>
//             <CssBaseline />
//             <Container maxWidth="sm">
//                 <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
//             </Container>
//         </React.Fragment>
//     );
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();