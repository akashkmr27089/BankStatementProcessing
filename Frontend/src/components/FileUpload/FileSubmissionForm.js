import React from 'react'

const FileSubmissionForm = ({ setBank, setFile, onFileUpload }) => {

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

export default FileSubmissionForm
