from flask import Flask, request, jsonify
import yfinance as yf
from datetime import date, timedelta


end_date = date.today() #2023-02-25
start_date = end_date - timedelta(days=100)  # Y-m-d

# dataframe (date as index)
data = yf.download('AAPL', 
                      start=start_date, 
                      end=end_date, 
                      progress=False)