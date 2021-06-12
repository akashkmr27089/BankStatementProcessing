import React from 'react';
import { useState } from 'react';
import "../css/FormCss.css";
import "../css/toggle.css";
import FileSubmissionForm from "./FileUpload/FileSubmissionForm.js";
import DataTable from "./Detatable/dataTable.js";
import ApexPieChart from './Graph/ApexPieChart';
import { useSelector, useDispatch } from "react-redux";
import { setCreditDebitValue, setBankData, fetchCategoryInitializationData, setCategoryData } from '../redux/transaction'
import LineChart from './Graph/LineChartsOne';
import DropDownDefault from './HtmlTags/DefaultDropDown';

const FileUploadForm = () => {
    const [analyticsFlag, setAnalytics] = useState(false);
    const [bank, setBank] = useState('');
    const [file, setFile] = useState('');
    const [title, setTitle] = useState('');
    const [data, setData] = useState('');


    const dispatch = useDispatch();
    const { totalCredit, totalDebit, PresentBalanceData, CreditDebitData, Category } = useSelector(state => state.transaction)

    const fetchData = async (formData) => {

        // Working Post Request
        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: formData,
        };

        var response = await fetch('http://127.0.0.1:5000/getData', requestOptions)
            .then(res => res.json());
        setTitle(response.title)
        setData(response.transactionData);
        dispatch(setBankData(response.transactionData));
        dispatch(setCreditDebitValue(JSON.stringify({ 'totalCredit': response.TotalCredit, 'totalDebit': response.TotalDebit })));
        console.log({ title }, { data }, { totalDebit }, { totalCredit })
        console.log("testing ", PresentBalanceData.Data);
    }

    //For Form Submission 
    const onFileUpload = (e) => {
        e.preventDefault();
        var formData = new FormData();
        var fileData = { file }
        var bankData = { bank }

        //Form data for keeping all the form data
        formData.append(
            "acc_file",
            fileData.file
        );
        formData.append(
            "bank_details",
            bankData.bank
        );
        // console.log("acc_file", formData.get("acc_file"));
        // console.log("bank_details", formData.get("bank_details"));

        //Fetch command for putting post request 
        fetchData(formData);
        dispatch(fetchCategoryInitializationData());
    };

    const DebitCreditChart = {
        // series: [{ totalDebit }.totalDebit, { totalCredit }.totalCredit],
        series: [totalDebit, totalCredit],
        chartOptions: {
            labels: ['Total Debit', 'Total Credit']
        },
        title: "Testing"
    };

    const LineGraphTotal = {
        LineSeries: [
            {
                name: "High - 2014",
                data: PresentBalanceData.Data
            },
        ],
        categories: PresentBalanceData.categories,
        Labels: { xlabel: "Progress", ylabel: "Money" },
        title: "Total Balanace",
        initalValue: { min: PresentBalanceData.min - PresentBalanceData.offSet, max: PresentBalanceData.max + PresentBalanceData.offSet },
    };

    const LineGraphCreditDebit = {
        LineSeries: [
            {
                name: "Credit",
                data: CreditDebitData.CreditData
            },
            {
                name: "Debit",
                data: CreditDebitData.DebitData
            },
        ],
        categories: PresentBalanceData.categories,
        Labels: { xlabel: "Progress", ylabel: "Money" },
        title: "Total Balanace",
        initalValue: { min: CreditDebitData.min - CreditDebitData.offSet, max: CreditDebitData.max + CreditDebitData.offSet },
    }

    let AccountDetailsTemplate = (<div className="row" id="TransactionDetails">
        <div className="col AccountDataSubmission" >
            <DataTable key="datatable" heading="Transaction" titleValue={title} dataValue={data} />
        </div>
    </div>);

    let AnalitcsTemplate = (<div className="row">
        <div className="col">
            {(totalDebit || totalCredit) && <LineChart data={LineGraphTotal} /> || ""}
        </div>
        <div className="col">
            {(totalDebit || totalCredit) && <LineChart data={LineGraphCreditDebit} /> || ""}
        </div>
    </div>);

    let GraphTemplate = (<div className="row" id="GraphView">
        <div className="col m-3" id="AccountSumView">
            {/* Graphs */}
            <div className="row">
                <div className="col">
                    {(totalDebit || totalCredit) && <ApexPieChart type="donut" options={{ width: "450" }} data={DebitCreditChart} /> || ""}
                </div>
                <div className="col">
                    {(totalDebit || totalCredit) && <ApexPieChart type="donut" options={{ width: "450" }} data={DebitCreditChart} /> || ""}
                </div>
            </div>
            {/* Analytics Graph */}
            {analyticsFlag && AnalitcsTemplate}
        </div>
    </div>);

    let analyticsToggleBtn = (
        <div className="row">
            <div className="col-11"></div>
            <div className="outerDivFull col-1 container" >
                <span>Enable Analytics</span>
                <div className="switchToggle">
                    <input type="checkbox" id="switch" onChange={() => setAnalytics(!analyticsFlag)} />
                    <label for="switch">Analytics</label>
                </div>
            </div>
        </div>);


    // dispatch(fetchCategoryInitializationData());
    // { Category.Options.map(x => console.log(" Testing ", x)) }

    // let Options = Category.Options.map(x => <option value={x}>{x}</option>);

    // let DropDownDefault = (
    //     <div className="row">
    //         <div className="col-6">
    //             <select name="department" className="form-control" required>
    //                 <option disabled selected value> -- Select an Department -- </option>
    //                 {Options}
    //             </select>
    //         </div>
    //     </div>
    // );

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <FileSubmissionForm key="FileSubmissionForm" onFileUpload={onFileUpload} setFile={setFile} setBank={setBank} />
                </div>
            </div>
            {analyticsToggleBtn}
            {GraphTemplate}
            {AccountDetailsTemplate}
            {/* {DropDownDefault} */}
            <DropDownDefault dropdownValues={Category.Options} index={2} selectedIndex={3} />
        </div >
    )
}

export default FileUploadForm
