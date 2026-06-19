import os
import json
import requests
from datetime import datetime

# API Configuration
API_URL = "https://api.aptmaintenanceinc.com"
API_KEY = "8147fe8e-1823-4842-ba71-ec1946afe42a" # From .env.local

# Export configuration
EXPORT_DIR = os.path.join(os.path.dirname(__file__), "..", "data_exports")
ACTIONS_TO_EXPORT = {
    "jobs": "getDispatchData",
    "techs": "getTechList"
    # Note: If timeRecords is added to DashboardAPI later, add it here.
    # We might need a custom query or direct sheet access for Time Records if not exposed via DashboardAPI yet.
}

def fetch_data(action):
    print(f"Fetching {action}...")
    try:
        response = requests.post(API_URL, json={
            "action": action,
            "apiKey": API_KEY
        })
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Failed to fetch {action}: {e}")
        return None

def main():
    if not os.path.exists(EXPORT_DIR):
        os.makedirs(EXPORT_DIR)
        
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    for name, action in ACTIONS_TO_EXPORT.items():
        data = fetch_data(action)
        if data and data.get("success"):
            # Ensure we export the actual list of records if nested
            export_data = data.get(name, data) 
            
            filepath = os.path.join(EXPORT_DIR, f"{name}_{timestamp}.json")
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(export_data, f, indent=2)
            print(f"Successfully exported {name} to {filepath}")
        else:
            print(f"Error or unsuccessful response for {name}: {data}")

if __name__ == "__main__":
    print("Starting legacy data extraction...")
    main()
    print("Extraction complete.")
