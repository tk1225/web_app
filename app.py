from flask import Flask
from flask import render_template
from flask import request
import json

import api


app = Flask(__name__)

@app.route('/')
def index():
   
    return render_template("stocks.html")

#検索ボタンでその銘柄のデータを渡す
@app.route("/api", methods=["GET", "POST"])
def api():
    #ここで読み込まないと動かない？
    import api
    print(request.json)
    input_data=request.json
    ticker=input_data["ticker"]
    print(ticker)
    data=api.company_key_stats(ticker)
    print(data)
    #returnにリストを渡すとエラーとなる。
    return data[0]
  

#検索ボックスに入れると検索候補をデータで渡す
@app.route("/api_ratio", methods=["GET", "POST"])
def api_ratio():
    #ここで読み込まないと動かない？
    import api
    print(request.json)
    input_data=request.json
    ticker=input_data["ticker"]
    print(ticker)
    data=api.company_key_ratio(ticker)
    print(data)
    #returnにリストを渡すとエラーとなる。
    return data[0]

@app.route("/api_score", methods=["GET", "POST"])
def api_score():
    #ここで読み込まないと動かない？
    import api
    print(request.json)
    input_data=request.json
    ticker=input_data["ticker"]
    print(ticker)
    data=api.company_score(ticker)
    print(data)
    #returnにリストを渡すとエラーとなる。
    return data[0] 

@app.route("/search", methods=["GET", "POST"])
def search():
    #ここで読み込まないと動かない？
    import api

   

    data=api.search()
    print(data)
    #returnにリストを渡すとエラーとなる。
    return data[0] 
    


if __name__ == "__main__":
    app.run(debug=True)