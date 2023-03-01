import yfinance as yf
from datetime import date, timedelta


end_date = date.today() #2023-02-25
start_date = end_date - timedelta(days=100)  # Y-m-d

# dataframe (date as index)
Data = yf.download('AAPL', 
                        start=start_date, 
                        end=end_date, 
                        progress=False)


# print(data.to_dict(orient='index'))


# data["Dates"] = pd.DataFrame([datetime.fromtimestamp(timeStamp) for timeStamp in data.index])
# data = data[["Date", "Open", "High", "Low", "Close", "Adj Close", "Volume"]]
# data.set_index(["Date"], inplace = True, append = True, drop = True)

# print(data)




# print(data.head())
# print(json.dumps({"data": data.to_dict(orient='index')}))
import plotly.graph_objects as go

fig = go.Figure(data=[go.Candlestick(x=Data.index,
                open=Data['Open'],
                high=Data['High'],
                low=Data['Low'],
                close=Data['Close'])])

fig.show()

