
try:
    # For Python 3.0 and later
    from urllib.request import urlopen
except ImportError:
    # Fall back to Python 2's urllib2
    from urllib2 import urlopen
import json

#JSON扱う関数
def get_jsonparsed_data(url):
   
    response = urlopen(url)
    data = response.read().decode("utf-8")
    return json.loads(data)

def company_key_stats(ticker):
    url = (f"https://financialmodelingprep.com/api/v3/profile/{ticker}?apikey=5842748c314022fcf8977671201db246")
    return get_jsonparsed_data(url)

def company_key_ratio(ticker):
    url = (f"https://financialmodelingprep.com/api/v3/ratios/{ticker}?apikey=e2ee1a735db59729b0e0945c76b4245a")
 
    return get_jsonparsed_data(url)

def company_score(ticker):
    url = (f"https://financialmodelingprep.com/api/v3/rating/{ticker}?apikey=e2ee1a735db59729b0e0945c76b4245a")
 
    return get_jsonparsed_data(url)

def stock_price(ticker):
    url = (f"https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?apikey=5842748c314022fcf8977671201db246")
   
    return get_jsonparsed_data(url)
