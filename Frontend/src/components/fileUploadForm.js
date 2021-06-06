import React from 'react';
import { useState } from 'react';
import "../css/FormCss.css";
import FileSubmissionForm from "./FileUpload/FileSubmissionForm.js";
import DataTable from "./Detatable/dataTable.js";
import ApexPieChart from './Graph/ApexPieChart';
import { useSelector, useDispatch } from "react-redux";
import { setCreditDebitValue } from '../redux/transaction'

const FileUploadForm = () => {
    const [bank, setBank] = useState('');
    const [file, setFile] = useState('');
    const [title, setTitle] = useState('');
    const [data, setData] = useState('');

    const dispatch = useDispatch();
    const { totalCredit, totalDebit } = useSelector(state => state.transaction)

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
        dispatch(setCreditDebitValue(JSON.stringify({ 'totalCredit': response.TotalCredit, 'totalDebit': response.TotalDebit })));
        console.log({ title }, { data }, { totalDebit }, { totalCredit })
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
    };

    const DebitCreditChart = {
        // series: [{ totalDebit }.totalDebit, { totalCredit }.totalCredit],
        series: [totalDebit, totalCredit],
        chartOptions: {
            labels: ['Total Debit', 'Total Credit']
        },
        title: "Testing"
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <FileSubmissionForm key="FileSubmissionForm" onFileUpload={onFileUpload} setFile={setFile} setBank={setBank} />
                </div>
            </div>
            <div className="row" id="GraphView">
                <div className="col" id="AccountSumView">
                    {/* Graphs */}
                    {(totalDebit || totalCredit) && <ApexPieChart type="donut" options={{ width: "500" }} data={DebitCreditChart} />}
                </div>
            </div>
            <div className="row">
                <div className="col AccountDataSubmission">
                    <DataTable key="datatable" heading="Transaction" titleValue={title} dataValue={data} />
                </div>

            </div>
        </div>
    )
}

export default FileUploadForm
