from flask import Flask, jsonify, request
import yfinance as yf
from datetime import date, timedelta
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense, LSTM
import numpy as np


app = Flask(__name__)

@app.route("/", methods=["GET"])
def message():
    return onSuccess({"message": "Welcome :)"})



@app.route("/<symbol>", methods=["GET"])
def getData(symbol):
    end_date = date.today()
    start_date = end_date - timedelta(days=6)
    data = yf.download(symbol, start=start_date, end=end_date, progress=False)
    if(data.empty):
        return onError({"message": "Unable to retrive market data"})
    else:
        formatedDataSet = formatData(data)
        last = formatedDataSet.tail(1)
        return onSuccess({ 
                "open":   (last["Open"].to_list())[0],
                "high":   (last["High"].to_list())[0],
                "low":    (last["Low"].to_list())[0], 
                "vol": (last["Volume"].to_list())[0] 
            })





@app.route("/<symbol>/predict", methods=["GET"])
def index(symbol):
    open = float(request.args.get('open'))
    high = float(request.args.get('high'))
    low = float(request.args.get('low'))
    vol = int(request.args.get('vol'))
    if(symbol):
        dataSet = getHistoricalData(symbol)
        if(dataSet.empty):
            return onError({"message": "Unable to retrive market data"})
        else:
            formatedDataSet = formatData(dataSet)
            return mainModal(formatedDataSet, open, high, low, vol)

    return onError({"message": "Invalid params"})



def mainModal(data, Open, High, Low, Volume):
    x = data[["Open", "High", "Low", "Volume"]]
    y = data["Close"]
    x = x.to_numpy() 
    y = y.to_numpy()
    y = y.reshape(-1, 1)
    xtrain, xtest, ytrain, ytest = train_test_split(x, y, test_size=0.2, random_state=42)
    model = Sequential()
    model.add(LSTM(128, return_sequences=True, input_shape= (xtrain.shape[1], 1)))
    model.add(LSTM(64, return_sequences=False))
    model.add(Dense(25))
    model.add(Dense(1))

    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(xtrain, ytrain, batch_size=1, epochs=30)

    features = np.array([[Open, High, Low, Volume]])
    return onSuccess({"prediction": (model.predict(features).tolist())[0]})



def getHistoricalData(symbol):
    end_date = date.today() 
    start_date = end_date - timedelta(days=80) 
    return yf.download(symbol, start=start_date, end=end_date, progress=False)


def formatData(data):
    data["Date"] = data.index
    data = data[["Date", "Open", "High", "Low", "Close", "Adj Close", "Volume"]]
    data.reset_index(drop=True, inplace=True) 
    return data


def onError(message):
    resp = jsonify({"status": 0, "data": message})
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp


def onSuccess(message):
    resp = jsonify({"status": 1, "data": message})
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp





if(__name__ == "__main__"):
    app.run()
    # app.run(host='0.0.0.0')


