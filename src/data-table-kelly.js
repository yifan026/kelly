import React, {useState, useEffect, useRef} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {DataService} from './service/DataService';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
// import {FileUpload} from 'primereact/fileupload';
// import {Rating} from 'primereact/rating';
import {Toolbar} from 'primereact/toolbar';
// import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from 'primereact/dropdown';
// import {RadioButton} from 'primereact/radiobutton';
import {InputNumber} from 'primereact/inputnumber';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import './asset/css/data_table.css';

const DTK = () => {

    let emptyStock = {
        id: null,
        code: '0000',
        confidence: 0.2,
        ratio: 0,
        win: 1,
        loss: 1,
        asset_allocation: 0,
        roi: 0,
        asset_money: 0
    };

    const confidenceSelectItems = [
        {label: '0%', value: 0},
        {label: '20%', value: 0.2},
        {label: '40%', value: 0.4},
        {label: '60%', value: 0.6},
        {label: '80%', value: 0.8},
        {label: '100%', value: 1}
    ];

    const [stocks, setStocks] = useState([]);
    // const [confidence, setConfidence] = useState(null);
    // const [ratio, setRatio] = useState(null);
    // const [asset_allocation, setAssetAllocation] = useState(null);
    // const [roi, setRoi] = useState(null);
    const [inputMoney, setInputMoney] = useState(null);

    const [stockDialog, setStockDialog] = useState(false);
    const [deleteStockDialog, setDeleteStockDialog] = useState(false);
    const [deleteStocksDialog, setDeleteStocksDialog] = useState(false);
    const [stock, setStock] = useState(emptyStock);
    const [selectedStocks, setSelectedStocks] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const stockService = new DataService();

    useEffect(() => {
        // stockService.getProducts().then(data => setStocks(data));
        stockService.getStocks().then(data => setStocks(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    const formatPercent = (value) => {
        return value.toLocaleString('en-US', {style: 'percent'});
    }

    const formatPercentWith2Fixed = (value) => {
        return value.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: 2});
    }

    const openNew = () => {
        if (!inputMoney) {
            toast.current.show({
                severity: 'warn',
                summary: 'Warning',
                detail: 'The money value must be provided',
                life: 3000
            });
        } else {
            setStock(emptyStock);
            // setSubmitted(true);
            saveStock();

            // setStockDialog(true);
        }

    }

    const hideDialog = () => {
        setSubmitted(false);
        setStockDialog(false);
    }

    const hideDeleteStockDialog = () => {
        setDeleteStockDialog(false);
    }

    const hideDeleteStocksDialog = () => {
        setDeleteStocksDialog(false);
    }

    const saveStock = () => {
        console.log("saveStock", stock)
        if (!stock.code) {
            toast.current.show({
                severity: 'warn',
                summary: 'Warning',
                detail: 'The stock code must be provided',
                life: 3000
            });
        } else {

            setSubmitted(true);

            if (stock.code.trim()) {
                let _stocks = [...stocks];
                let _stock = {...stock};
                if (stock.id) {
                    const index = findIndexById(stock.id);
                    console.log("findIndexById(stock.id)", index);
                    _stocks[index] = _stock;
                    toast.current.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Stock Updated',
                        life: 3000
                    });
                } else {
                    _stock.id = createId();
                    _stock.image = 'product-placeholder.svg';
                    _stocks.push(_stock);
                    toast.current.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Stock Created',
                        life: 3000
                    });
                }

                setStocks(_stocks);
                setStockDialog(false);
                setStock(emptyStock);
            }
        }
    }

    const editStock = (stock) => {
        console.log("editStock", stock)
        if (inputMoney) {
            setStock({...stock});
            setStockDialog(true);
        } else {
            toast.current.show({
                severity: 'warn',
                summary: 'Warning',
                detail: 'The money value must be provided',
                life: 3000
            });
        }

    }

    const confirmDeleteStock = (stock) => {
        setStock(stock);
        setDeleteStockDialog(true);
    }

    const deleteStock = () => {
        let _stocks = stocks.filter(val => val.id !== stock.id);
        setStocks(_stocks);
        setDeleteStockDialog(false);
        setStock(emptyStock);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Stock Deleted', life: 3000});
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < stocks.length; i++) {
            if (stocks[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    //
    // const importCSV = (e) => {
    //     const file = e.files[0];
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const csv = e.target.result;
    //         const data = csv.split('\n');
    //
    //         // Prepare DataTable
    //         const cols = data[0].replace(/['"]+/g, '').split(',');
    //         data.shift();
    //
    //         const importedData = data.map(d => {
    //             d = d.split(',');
    //             const processedData = cols.reduce((obj, c, i) => {
    //                 obj[c] = d[i].replace(/['"]+/g, '');
    //                 return obj;
    //             }, {});
    //
    //             processedData['id'] = createId();
    //             return processedData;
    //         });
    //
    //         const _stocks = [...stocks, ...importedData];
    //
    //         setStocks(_stocks);
    //     };
    //
    //     reader.readAsText(file, 'UTF-8');
    // }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    // const exportExcel = () => {
    //     import('xlsx').then(xlsx => {
    //         const worksheet = xlsx.utils.json_to_sheet(products);
    //         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //         const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //         saveAsExcelFile(excelBuffer, 'products');
    //     });
    // }
    //
    // const saveAsExcelFile = (buffer, fileName) => {
    //     import('file-saver').then(FileSaver => {
    //         let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //         let EXCEL_EXTENSION = '.xlsx';
    //         const data = new Blob([buffer], {
    //             type: EXCEL_TYPE
    //         });
    //         FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    //     });
    // }
    //
    // const exportPdf = () => {
    //     import('jspdf').then(jsPDF => {
    //         import('jspdf-autotable').then(() => {
    //             const doc = new jsPDF.default(0, 0);
    //             doc.autoTable(exportColumns, products);
    //             doc.save('products.pdf');
    //         })
    //     })
    // }

    const confirmDeleteSelected = () => {
        setDeleteStocksDialog(true);
    }

    const deleteSelectedStocks = () => {
        let _stocks = stocks.filter(val => !selectedStocks.includes(val));
        setStocks(_stocks);
        setDeleteStocksDialog(false);
        setSelectedStocks(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Stocks Deleted', life: 3000});
    }

    const kellyFormula = (obj) => {

        let ratio = obj.confidence - ((1 - obj.confidence) / ((obj.win / obj.loss)));

        if (ratio < 0) {
            return 0;
        } else {
            return ratio;
        }

    }

    function sumDataReduce(arr) {
        return arr.reduce((a, b) => a + b);
    }

    const assetAllocationFormula = (aa_this, aa_list) => {
        // console.log(aa_this,sumDataReduce(aa_list))
        return aa_this / sumDataReduce(aa_list);
    }

    const roiFormula = (aa, c) => {

        return aa * (1 + c);

    }

    const updateDataObject = (data,index) => {
        let new_ratio = data['ratio'];
        let new_confidence = data['confidence'];

        console.log("舊的stock info", {...stock})
        console.log("index", index)
        console.log("新的建議比例", data['ratio'])

        let _stocks = [...stocks]; //要如何取到已先更新後的value?????
        let stocks_length = _stocks.length;

        //更新該obj的ratio
        _stocks[index]['ratio'] = new_ratio;
        _stocks[index]['confidence'] = new_confidence;

        console.log(stocks_length)

        // if (stocks_length > 0) {

        let new_ratio_list = _stocks.map(i => i.ratio);
        let asset_allocation_value = assetAllocationFormula(new_ratio, new_ratio_list);
        let roi = roiFormula(asset_allocation_value, new_confidence);
        //ROI(單個)
        data['roi'] = roi;

        //變動資產配置率(單個)
        data['asset_allocation'] = asset_allocation_value;
        //資產配置金額(單個)
        data['asset_money'] = inputMoney * asset_allocation_value;


        _stocks[index]['roi'] = roi;
        _stocks[index]['asset_allocation'] = asset_allocation_value;
        _stocks[index]['asset_money'] = inputMoney * asset_allocation_value;

        console.log("全部建議比例",);
        console.log("資產配置率", asset_allocation_value);
        console.log("ROI", roi);

        // all_stocks = updateAllStock(_stocks, new_ratio_list, index);
        updateAllStock(_stocks, new_ratio_list, index);


        // }

        console.log("更新後的單筆data", data)
        console.log(_stocks);
        setStock(data); //通知react渲染單筆UI
        // setStocks(all_stocks); //通知react渲染全部UI
    }

    const onConfidenceChange = (e) => {
        let _stock = {...stock}; //原始的obj
        // let all_stocks = null;
        // console.log("_stock",_stock)

        let index = findIndexById(stock.id);

        let new_confidence = e.value;
        // console.log(typeof new_confidence)
        _stock['confidence'] = new_confidence; //新的value

        //變動建議比例
        let new_ratio = kellyFormula({
            confidence: new_confidence,
            win: _stock['win'],
            loss: _stock['loss']
        });

        _stock['ratio'] = new_ratio
        setStock(_stock); //通知react渲染UI

        // _stock = {...stock};

        updateDataObject(_stock,index);

    }

    const updateAllStock = (stocks_obj, new_ratio_list, updated_index) => {

        for (let i = 0; i < stocks_obj.length; i++) {

            if (i === updated_index) continue;
            let current_ration = stocks_obj[i].ratio;
            let current_confidence = stocks_obj[i].confidence;

            let asset_allocation_value = assetAllocationFormula(current_ration, new_ratio_list);
            let roi = roiFormula(asset_allocation_value, current_confidence);

            stocks_obj[i].asset_allocation_value = asset_allocation_value;
            stocks_obj[i].roi = roi;
            stocks_obj[i]['asset_money'] = inputMoney * asset_allocation_value;

        }

        return stocks_obj;
        // setStocks(stocks_obj); //通知react渲染全部UI
    }

    // const onWinChange = (e) => {
    //     let _stock = {...stock};
    //     _stock['win'] = e.value;
    //     setStock(_stock);
    // }

    // const onCategoryChange = (e) => {
    //     let _stock = {...stock};
    //     _stock['category'] = e.value;
    //     setStock(_stock);
    // }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _stock = {...stock};
        _stock[`${name}`] = val;

        setStock(_stock);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _stock = {...stock};
        let index = findIndexById(stock.id);

        _stock[`${name}`] = val;

        _stock['ratio'] = kellyFormula({
            confidence: _stock['confidence'],
            win: _stock['win'],
            loss: _stock['loss']
        });

        //ration,asset_,roi,input_money

        setStock(_stock);

        updateDataObject(_stock,index);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew}/>
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}
                        disabled={!selectedStocks || !selectedStocks.length}/>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/*<FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php"*/}
                {/*            accept=".csv" chooseLabel="Import" className="p-mr-2 p-d-inline-block"*/}
                {/*            onUpload={importCSV}/>*/}
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}/>
            </React.Fragment>
        )
    }

    // const imageBodyTemplate = (rowData) => {
    //     return <img src={`showcase/demo/images/product/${rowData.image}`}
    //                 onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
    //                 alt={rowData.image} className="product-image"/>
    // }

    const assetAllocationBodyTemplate = (rowData) => {
        return formatPercentWith2Fixed(rowData.asset_allocation);
    }

    const assetMoneyBodyTemplate = (rowData) => {
        return formatCurrency(rowData.asset_money);
    }

    // const percentBodyTemplate = (rowData) => {
    //     // if (rowData.confidence) {
    //     //     return formatPercent(rowData.confidence);
    //     // } else if (rowData.ratio) {
    //     //     return formatPercent(rowData.win);
    //     // } else if (rowData.win) {
    //     //     return formatPercent(rowData.loss);
    //     // } else if (rowData.loss) {
    //     //     return formatPercent(rowData.loss);
    //     // }
    //
    //     // rowData.map(i => {
    //     //     return formatPercent(rowData[i])
    //     // });
    //
    // }

    // const confidenceBodyTemplate = (option, props) => {
    //     console.log(option, props)
    //     // if (option) {
    //     //     return (
    //     //         <div className="country-item country-item-value">
    //     //             <img alt={option.label} src="images/flag/flag_placeholder.png" className={`flag flag-${option.value.toLowerCase()}`} />
    //     //             <div>{option.label}</div>
    //     //         </div>
    //     //     );
    //     // }
    //     //
    //     // return (
    //     //     <span>
    //     //     {props.placeholder}
    //     // </span>
    //     // );
    // }
    const confidenceBodyTemplate = (rowData) => {
        return formatPercent(rowData.confidence);
    }

    const ratioBodyTemplate = (rowData) => {
        return formatPercent(rowData.ratio);
    }

    const winBodyTemplate = (rowData) => {
        return formatPercent(rowData.win / 100);
    }

    const lossBodyTemplate = (rowData) => {
        return formatPercent(rowData.loss / 100);
    }

    const roiBodyTemplate = (rowData) => {
        return formatPercentWith2Fixed(rowData.roi);
    }

    // const confirmTemplate = (show_string) => {
    //     return (
    //         <Dialog visible={deleteStockDialog} className="dialog-width" header="Confirm" modal
    //                 footer={deleteStockDialogFooter} onHide={hideDeleteStockDialog}>
    //             <div className="confirmation-content">
    //                 <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
    //                 {stock && <span>Are you sure you want to delete <b>{stock.code}</b>?</span>}
    //             </div>
    //         </Dialog>
    //     );
    // }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2"
                        onClick={() => editStock(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => confirmDeleteStock(rowData)}/>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-mx-0 p-my-1">Manage Stocks</h5>
            <span className="p-input-icon-left">
                {/*<i className="pi pi-dollar"/>*/}
                <InputNumber id="inputMoney" placeholder="Input money..." min={0} value={inputMoney}
                             onValueChange={(e) => setInputMoney(e.value)}
                    // onChange={()=>console.log(inputMoney)}
                             mode="currency" currency="USD"
                             locale="en-US" required className={classNames({'p-invalid': !inputMoney})}/>
                {!inputMoney && <small className="p-error">Money is required.</small>}
            </span>

            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
            </span>
        </div>
    );
    const stockDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveStock}/>
        </React.Fragment>
    );
    const deleteStockDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteStockDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteStock}/>
        </React.Fragment>
    );
    const deleteStocksDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteStocksDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedStocks}/>
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast}/>

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={stocks} selection={selectedStocks}
                           onSelectionChange={(e) => setSelectedStocks(e.value)}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} stocks"
                           globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{width: '3rem'}} exportable={false}></Column>
                    <Column field="id" header="ID" sortable className="datatable-column" hidden></Column>
                    <Column field="code" header="股票代號" sortable className="datatable-column"></Column>
                    {/*<Column field="image" header="Image" body={imageBodyTemplate}></Column>*/}

                    <Column field="confidence" header="信心度"
                            sortable body={confidenceBodyTemplate}
                            className="datatable-column"></Column>

                    <Column field="ratio" header="建議比例" sortable body={ratioBodyTemplate}
                            className="datatable-column"></Column>

                    <Column field="win" header="停利" sortable body={winBodyTemplate}
                            className="datatable-column"></Column>

                    <Column field="loss" header="停損" sortable body={lossBodyTemplate}
                            className="datatable-column"></Column>

                    <Column field="asset_allocation" header="資產配置率" sortable body={assetAllocationBodyTemplate}
                            className="datatable-column"></Column>

                    <Column field="roi" header="投報率" sortable body={roiBodyTemplate}
                            className="datatable-column"></Column>

                    <Column field="asset_money" header="建議配置金額" sortable body={assetMoneyBodyTemplate}
                            className="datatable-column"></Column>
                    {/*<Column field="category" header="Category" sortable style={{minWidth: '10rem'}}></Column>*/}
                    {/*<Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable*/}
                    {/*        style={{minWidth: '12rem'}}></Column>*/}
                    {/*<Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable*/}
                    {/*        style={{minWidth: '12rem'}}></Column>*/}
                    <Column body={actionBodyTemplate} exportable={false} className="datatable-column"></Column>
                </DataTable>
            </div>

            <Dialog visible={stockDialog} header="Stock Details" modal className={["p-fluid", "dialog-width"]}
                    footer={stockDialogFooter} onHide={hideDialog}>
                {/*{stock.image && <img src={`showcase/demo/images/product/${stock.image}`}*/}
                {/*                       onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}*/}
                {/*                       alt={stock.image} className="product-image p-d-block p-m-auto p-pb-3"/>}*/}
                <div className="p-field">
                    <label htmlFor="code">股票代號</label>
                    <InputText id="code" value={stock.code || ''} onChange={(e) => onInputChange(e, 'code')} required
                               autoFocus className={classNames({'p-invalid': submitted && !stock.code})}/>
                    {!stock.code && <small className="p-error">Code is required</small>}

                    {/*<label htmlFor="name">Name</label>*/}
                    {/*<InputText id="name" value={stock.name} onChange={(e) => onInputChange(e, 'name')} required*/}
                    {/*           autoFocus className={classNames({'p-invalid': submitted && !stock.name})}/>*/}
                    {/*{submitted && !stock.name && <small className="p-error">Name is required.</small>}*/}
                </div>
                {/*<div className="p-field">*/}
                {/*    <label htmlFor="description">Description</label>*/}
                {/*    <InputTextarea id="description" value={stock.description}*/}
                {/*                   onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20}/>*/}
                {/*</div>*/}
                <div className="p-field">
                    <label htmlFor="confidence">信心度(%)</label>
                    <Dropdown value={stock.confidence} options={confidenceSelectItems} optionLabel='label'
                              optionValue="value"
                              onChange={onConfidenceChange}
                        // valueTemplate={confidenceBodyTemplate}
                        // onChange={(e) => setConfidence(e.value)}
                              placeholder="Select a confidence value"/>
                    {/*{!stock.confidence && <small className="p-error">Confidence is required.</small>}*/}
                </div>

                {/*<div className="p-field">*/}
                {/*    <label className="p-mb-3">Category</label>*/}
                {/*    <div className="p-formgrid p-grid">*/}
                {/*        <div className="p-field-radiobutton p-col-6">*/}
                {/*            <RadioButton inputId="category1" name="category" value="Accessories"*/}
                {/*                         onChange={onCategoryChange} checked={stock.category === 'Accessories'}/>*/}
                {/*            <label htmlFor="category1">Accessories</label>*/}
                {/*        </div>*/}
                {/*        <div className="p-field-radiobutton p-col-6">*/}
                {/*            <RadioButton inputId="category2" name="category" value="Clothing"*/}
                {/*                         onChange={onCategoryChange} checked={stock.category === 'Clothing'}/>*/}
                {/*            <label htmlFor="category2">Clothing</label>*/}
                {/*        </div>*/}
                {/*        <div className="p-field-radiobutton p-col-6">*/}
                {/*            <RadioButton inputId="category3" name="category" value="Electronics"*/}
                {/*                         onChange={onCategoryChange} checked={stock.category === 'Electronics'}/>*/}
                {/*            <label htmlFor="category3">Electronics</label>*/}
                {/*        </div>*/}
                {/*        <div className="p-field-radiobutton p-col-6">*/}
                {/*            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange}*/}
                {/*                         checked={stock.category === 'Fitness'}/>*/}
                {/*            <label htmlFor="category4">Fitness</label>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="win">停利(%)</label>
                        <InputNumber id="win" value={stock.win} min={1} max={100}
                                     onValueChange={(e) => onInputNumberChange(e, 'win')} integeronly/>
                        {!stock.win && <small className="p-error">Lock in gain is must greater than 0</small>}

                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="loss">停損(%)</label>
                        <InputNumber id="loss" value={stock.loss} min={1} max={100}
                                     onValueChange={(e) => onInputNumberChange(e, 'loss')} integeronly/>
                        {!stock.loss && <small className="p-error">Stop-loss point is must greater than 0</small>}

                    </div>
                </div>

            </Dialog>

            {/*<Dialog visible={deleteStockDialog} className="dialog-width" header="Confirm" modal*/}
            {/*        footer={deleteStockDialogFooter} onHide={hideDeleteStockDialog}>*/}
            {/*    <div className="confirmation-content">*/}
            {/*        <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>*/}
            {/*        {stock && <span>Are you sure you want to delete <b>{stock.code}</b>?</span>}*/}
            {/*    </div>*/}
            {/*</Dialog>*/}


            <Dialog visible={deleteStockDialog} className="dialog-width" header="Confirm" modal
                    footer={deleteStockDialogFooter} onHide={hideDeleteStockDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                    {stock && <span>Are you sure you want to delete <b>{stock.code}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteStocksDialog} className="dialog-width" header="Confirm" modal
                    footer={deleteStocksDialogFooter} onHide={hideDeleteStocksDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                    {stock && <span>Are you sure you want to delete the selected stocks?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default DTK;