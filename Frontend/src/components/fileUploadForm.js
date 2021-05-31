import React from 'react';
import { useState } from 'react';
import "../css/FormCss.css";



const FileUploadForm = () => {
    const [bank, setBank] = useState('');
    const [file, setFile] = useState('');
    const [title, setTitle] = useState('');
    const [data, setData] = useState('');
    const [totalDebit, setTDebit] = useState("");
    const [totalCredit, setTCredit] = useState("");


    const fetchData = async (formData) => {
        // fetch("http://127.0.0.1:5000/", {
        //     method: "GET",
        // }).then(res => res.json()).then((rep) => console.log(rep))
        //     .catch(error => console.log("error", error));

        //GetRequest for taking data 
        // var result = await fetch("http://127.0.0.1:5000/", {
        //     method: "GET",
        // }).then(res => res.json())
        //     .catch(error => console.log("error", error));
        // setTitle(result.title);
        // setData(result.transactionData);
        // console.log({ title }, { data });


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
        setTDebit(response.TotalDebit);
        setTCredit(response.TotalCredit);
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
        console.log("acc_file", formData.get("acc_file"));
        console.log("bank_details", formData.get("bank_details"));

        //Fetch command for putting post request 
        fetchData(formData);
    };

    return (
        <div className="container">
            <form >
                <div className="form-control">
                    <label htmlFor="BankOptions">Bank</label>
                    <input className="formTextInput" id="BankOptions" type="text" placeholder="Bank" onChange={(e) => setBank(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="AccSumFile">Account Summary File</label><br />
                    <input className="formFileChoose" id="AccSumFile" type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <button id="FileSubmit" type="button" className="btn btn-dark" type="submit" value="Submit" onClick={onFileUpload}>Submit</button>
            </form>
        </div>
    )
}

export default FileUploadForm
