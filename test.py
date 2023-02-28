import yfinance as yf
from datetime import date, timedelta, datetime
import json
import numpy as np
import pandas as pd


end_date = date.today() - timedelta(days=1) #2023-02-25
start_date = end_date - timedelta(days=100)  # Y-m-d

# dataframe (date as index)
data = yf.download('GPRK', 
                        start=start_date, 
                        end=end_date, 
                        progress=False)


# print(data.to_dict(orient='index'))


# data["Dates"] = pd.DataFrame([datetime.fromtimestamp(timeStamp) for timeStamp in data.index])
# data = data[["Date", "Open", "High", "Low", "Close", "Adj Close", "Volume"]]
# data.set_index(["Date"], inplace = True, append = True, drop = True)

# print(data)




print(data.head())
# print(json.dumps({"data": data.to_dict(orient='index')}))