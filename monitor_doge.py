import os
import json
import sys
import urllib.request

# Configuration
SYMBOL = "DOGEUSDT"
BUY_ZONE_TOP = 0.093
BUY_ZONE_BOTTOM = 0.090

def get_price():
    url = f"https://api.binance.com/api/v3/ticker/price?symbol={SYMBOL}"
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode())
        return float(data['price'])

def main():
    try:
        price = get_price()
        signal = None
        
        if BUY_ZONE_BOTTOM <= price <= BUY_ZONE_TOP:
            signal = f"🎯 DOGE 进入吸筹区间: ${price:.6f} (目标: $0.090 - $0.093)"
        elif price < BUY_ZONE_BOTTOM:
            signal = f"⚠️ DOGE 跌破吸筹底线: ${price:.6f}，需观察支撑是否失效"
        
        if signal:
            print(signal)
            # This output will be captured by the cron job's agentTurn
        else:
            print(f"DEBUG: DOGE current price ${price:.6f} - No signal.")
            
    except Exception as e:
        print(f"Error monitoring DOGE: {e}")

if __name__ == "__main__":
    main()
