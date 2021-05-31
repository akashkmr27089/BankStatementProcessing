from flask import Flask, request, jsonify
from CONFIG import Bank, Appsetting, BankName
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)


def dataExtract(bank, filename):
    totalDebit = 0.0
    totalCredit = 0.0
    bankConfig = Bank[bank]
    FileLoc = Appsetting["FileGenericLocation"]
    data = open(FileLoc + filename)
    dataEntry = []
    count = -1
    num_lines = sum(1 for line in open(FileLoc + filename))
    print("DataExtrct", data, bank)
    print("Num of lines ", num_lines)
    for line in data:
        count += 1
        dataEntry.append([x.strip() for x in line.split('\t')])
        dataEntry[-1].insert(0, count)
        if(count >= bankConfig["Data_start"] and count < (num_lines + bankConfig["Data_end"])):
            dataEntry[-1][-1] = float(dataEntry[-1][-1].replace(',', ''))
            if(dataEntry[-1][-2] != ""):
                dataEntry[-1][-2] = float(dataEntry[-1][-2].replace(',', ''))
                totalCredit += dataEntry[-1][-2]
            else:
                dataEntry[-1][-2] = 0.0
            if(dataEntry[-1][-3] != ""):
                dataEntry[-1][-3] = float(dataEntry[-1][-3].replace(',', ''))
                totalDebit += dataEntry[-1][-3]
            else:
                dataEntry[-1][-3] = 0.0

    title = dataEntry[bankConfig["title"]][:-1]
    transactionData = dataEntry[bankConfig["Data_start"]:bankConfig["Data_end"]]
    return {"title": title, "transactionData": transactionData, "TotalDebit": totalDebit, "TotalCredit": totalCredit}


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


@ app.route('/BankOptions', methods=["GET"])
def getBankName():
    return jsonify({"BankName": "SBI"})


@ app.route('/getData', methods=['POST'])
# @cross_origin(origin='*')
def getDataFromFile():
    posted_data = request.form
    file_data = request.files
    AccFile = file_data["acc_file"]
    bankName = posted_data.get("bank_details")
    FileData = {"Bank": bankName, "AccoFile": AccFile}
    jsonData = generateJsonData(FileData)
    return jsonify(jsonData)


@ app.route('/', methods=['GET'])
def index():
    data = dataExtract("SBI", "./first.xls")
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
