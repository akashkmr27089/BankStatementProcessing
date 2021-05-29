from flask import Flask, request, jsonify
from CONFIG import Bank, Appsetting, BankName

app = Flask(__name__)


def dataExtract(bank, filename):
    bankConfig = Bank[bank]
    FileLoc = Appsetting["FileGenericLocation"]
    data = open(FileLoc + filename)
    print("DataExtrct", data)
    dataEntry = []
    for line in data:
        dataEntry.append([x.strip() for x in line.split('\t')])
    title = dataEntry[bankConfig["title"]][:-1]
    transactionData = dataEntry[bankConfig["Data_start"]                                :bankConfig["Data_end"]]
    return {"title": title, "transactionData": transactionData}


def generateJsonData(FileData):
    AccFile = FileData["AccoFile"]
    Bank = FileData["Bank"]
    # Typechicking of the file
    # print(AccFile._parse_content_type, AccFile.content_length,
    #       AccFile.content_type, AccFile.headers)
    # Saving File

    print(AccFile, Bank)
    FileLoc = Appsetting["FileGenericLocation"]
    AccFile.save(FileLoc + AccFile.filename)
    return dataExtract(Bank, AccFile.filename)


@app.route('/BankOptions', methods=["GET"])
def getBankName():
    return jsonify({"BankName": BankName})


@app.route('/getData', methods=['POST'])
def getDataFromFile():
    posted_data = request.form
    file_data = request.files
    AccFile = file_data["acc_file"]
    bankName = posted_data.get("bank_details")
    FileData = {"Bank": bankName, "AccoFile": AccFile}
    jsonData = generateJsonData(FileData)
    return jsonify(jsonData)


@app.route('/', methods=['GET'])
def index():
    title, transactionData = dataExtract("SBI", "./first.xls")
    return jsonify({"title": title, "transactionData": transactionData})


if __name__ == "__main__":
    app.run(debug=True)
