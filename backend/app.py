from analysis.parse_csv import parse_csv
from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__, static_url_path="/images", static_folder="./public/images")
CORS(app)


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
    return json.dumps(results), 200


if __name__ == "__main__":
    app.run(debug=True)
