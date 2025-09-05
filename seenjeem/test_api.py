import requests
import json

# Configuration
BASE_URL = "https://api.seenjeemkw.com/api"
AUTH_TOKEN = "Bearer 27718cb9f8e472d683e5da434337bfff:324b10bc7e737053134d4f46466202be19605a43ab84da436abba0fda138e06ed686099869bb05789a45e2580d5c5624317119e910d3b84a94804518580643a920108c09623160bbab4693f7cded39eb6aca0a1f8e0c112034ef6af4b4f4d8d0be9d46badf9e5341beb3d2c5d425114f9aec11681880492c50fa3cc7445cec72ef0751487cecf2ca890dcc4bed134d8e36afa06ec6673743552bc8f7b9642048"

# Headers for authenticated requests
headers = {
    "Authorization": AUTH_TOKEN,
    "Content-Type": "application/json"
}

# Test countries API
print("Testing countries API...")
url = f"{BASE_URL}/country-state-city/countries"
response = requests.get(url, headers=headers)
print(f"Status Code: {response.status_code}")
print(f"Response Type: {type(response.json())}")
print(f"Response Sample: {json.dumps(response.json()[:2] if isinstance(response.json(), list) else response.json(), indent=2, ensure_ascii=False)}")

# Test with a known country ID
print("\n\nTesting categories API...")
url = f"{BASE_URL}/user/game-category/user-category-list"
params = {
    "type": "GENERAL",
    "countryId": "653c8fff18da2c44f651f370"
}
response = requests.get(url, headers=headers, params=params)
print(f"Status Code: {response.status_code}")
print(f"Response Type: {type(response.json())}")
if response.status_code == 200:
    data = response.json()
    if isinstance(data, dict):
        print(f"Response Keys: {list(data.keys())}")
    print(f"Response Sample: {json.dumps(data if isinstance(data, dict) and 'data' in data else data[:2] if isinstance(data, list) else data, indent=2, ensure_ascii=False)}")

# Test questions API with a sample category ID
print("\n\nTesting questions API...")
url = f"{BASE_URL}/user/game/questions-list/68bab2d0885b1e15708ccd66"
response = requests.get(url, headers=headers)
print(f"Status Code: {response.status_code}")
if response.status_code == 200:
    data = response.json()
    print(f"Response Type: {type(data)}")
    if isinstance(data, dict):
        print(f"Response Keys: {list(data.keys())}")
    print(f"Response Sample: {json.dumps(data if isinstance(data, dict) else data[:1] if isinstance(data, list) else data, indent=2, ensure_ascii=False)[:500]}...")