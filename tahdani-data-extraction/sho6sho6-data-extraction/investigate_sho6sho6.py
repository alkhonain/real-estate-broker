import requests
import json
from datetime import datetime

def investigate_api():
    """
    Investigate sho6sho6.com API structure
    """
    session = requests.Session()
    
    # Headers from the captured request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': '*/*',
        'Accept-Language': 'ar,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://sho6sho6.com/',
        'Origin': 'https://sho6sho6.com',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'baggage': 'sentry-environment=production,sentry-release=084539e7bbb0fcc157c5d713b93150989e867dda,sentry-public_key=8019fcbbb8591fd3ed621194f65d07cd,sentry-trace_id=a8047aae1d931203b29b640e2b862f09,sentry-sampled=false'
    }
    
    print("Investigating sho6sho6.com API structure...")
    print("="*50)
    
    # Test main page
    print("\n1. Testing main page...")
    try:
        response = session.get('https://sho6sho6.com/', headers=headers)
        print(f"Status: {response.status_code}")
        print(f"Cookies received: {session.cookies.get_dict().keys()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test choose page
    print("\n2. Testing /choose endpoint...")
    try:
        response = session.get('https://sho6sho6.com/choose', headers=headers)
        print(f"Status: {response.status_code}")
        
        # Try with RSC parameter
        response = session.get('https://sho6sho6.com/choose?_rsc=stz3x', headers=headers)
        print(f"Status with _rsc: {response.status_code}")
        
        # Save response for analysis
        with open('choose_response.txt', 'wb') as f:
            f.write(response.content)
        print("Response saved to choose_response.txt")
        
    except Exception as e:
        print(f"Error: {e}")
    
    # Test auth session
    print("\n3. Testing /api/auth/session...")
    try:
        response = session.get('https://sho6sho6.com/api/auth/session', headers=headers)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            try:
                data = response.json()
                print(f"Response: {json.dumps(data, indent=2)}")
            except:
                print("Could not parse as JSON")
    except Exception as e:
        print(f"Error: {e}")
    
    print("\n" + "="*50)
    print("Investigation complete. Check choose_response.txt for category data.")

if __name__ == "__main__":
    investigate_api()