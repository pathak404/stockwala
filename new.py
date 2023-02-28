import yfinance as yf
from datetime import date, timedelta


from sklearn.model_selection import train_test_split

from keras.models import Sequential
from keras.layers import Dense, LSTM

import numpy as np




end_date = date.today() #2023-02-25
start_date = end_date - timedelta(days=100)  # Y-m-d

# dataframe (date as index)
data = yf.download('AAPL', 
                      start=start_date, 
                      end=end_date, 
                      progress=False)

# validate
data["Date"] = data.index # new col Date
data = data[["Date", "Open", "High", "Low", "Close", 
             "Adj Close", "Volume"]] # format cols (move Date last to First)
# 2 Date, index & col
# drop old date index, new index - num as index
data.reset_index(drop=True, inplace=True) 
# ---------------------------------------


x = data[["Open", "High", "Low", "Volume"]]
y = data["Close"] # dataframe


x = x.to_numpy() 
y = y.to_numpy() # numpy array [150.72000122 151.28999329 147.28999329 ...]

# reshape("no of sub arrays (-1 auto)", "eles in a single sub array")
y = y.reshape(-1, 1) # [ [150.72000122] [151.28999329] [147.28999329] [...] ]



xtrain, xtest, ytrain, ytest = train_test_split(x, y, test_size=0.2, random_state=42)


model = Sequential()
model.add(LSTM(128, return_sequences=True, input_shape= (xtrain.shape[1], 1)))
model.add(LSTM(64, return_sequences=False))
model.add(Dense(25))
model.add(Dense(1))

# model.summary()


model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(xtrain, ytrain, batch_size=1, epochs=30)


#features = [Open, High, Low, Adj Close, Volume]
features = np.array([[177.089996, 180.419998, 177.070007, 74919600]])
print(model.predict(features))