from analysis.parse_csv import parse_csv
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 256mb max file upload
app.config["MAX_CONTENT_LENGTH"] = 1024 * 1024 * 256
app.config["UPLOAD_EXTENSIONS"] = [".csv"]
app.config["UPLOAD_FOLDER"] = "./uploads"


@app.route("/upload", methods=["POST"])
def upload_file():
    print(request.files)
    networkActivityCSV = request.files["networkActivityCSV"]
    if networkActivityCSV.filename == "":
        return "No networkActivityCSV provided", 400
    macAddressCSV = request.files["macAddressCSV"]
    if macAddressCSV.filename == "":
        return "No macAddressCSV provided", 400
    results = parse_csv(networkActivityCSV, macAddressCSV)
    return "Analysis!", 200


if __name__ == "__main__":
    app.run(debug=True)
