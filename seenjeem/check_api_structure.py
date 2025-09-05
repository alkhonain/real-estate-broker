import requests
import json

# Configuration
BASE_URL = "https://api.seenjeemkw.com/api"
AUTH_TOKEN = "Bearer 27718cb9f8e472d683e5da434337bfff:324b10bc7e737053134d4f46466202be19605a43ab84da436abba0fda138e06ed686099869bb05789a45e2580d5c5624317119e910d3b84a94804518580643a920108c09623160bbab4693f7cded39eb6aca0a1f8e0c112034ef6af4b4f4d8d0be9d46badf9e5341beb3d2c5d425114f9aec11681880492c50fa3cc7445cec72ef0751487cecf2ca890dcc4bed134d8e36afa06ec6673743552bc8f7b9642048"

headers = {
    "Authorization": AUTH_TOKEN,
    "Content-Type": "application/json"
}

# Try different category types
print("Testing different category types...")
kuwait_id = "653c8fff18da2c44f651f370"

types_to_try = ["GENERAL", "USER", "PUBLIC", "PRIVATE", None]

for type_param in types_to_try:
    print(f"\n\nTrying type: {type_param}")
    url = f"{BASE_URL}/user/game-category/user-category-list"
    
    params = {"countryId": kuwait_id}
    if type_param:
        params["type"] = type_param
    
    try:
        response = requests.get(url, headers=headers, params=params)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == True:
                categories = data.get('data', {}).get('categories', [])
                print(f"Found {len(categories)} categories")
                if categories:
                    print(f"First category: {categories[0].get('name')} (ID: {categories[0].get('_id')})")
            else:
                print(f"Error: {data.get('message')}")
    except Exception as e:
        print(f"Error: {e}")

# Try without country ID
print("\n\nTrying without country ID...")
url = f"{BASE_URL}/user/game-category/user-category-list"
try:
    response = requests.get(url, headers=headers)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        if data.get('status') == True:
            categories = data.get('data', {}).get('categories', [])
            print(f"Found {len(categories)} categories")
            if categories:
                for i, cat in enumerate(categories[:5]):
                    print(f"Category {i+1}: {cat.get('name')} (ID: {cat.get('_id')})")
        else:
            print(f"Error: {data.get('message')}")
except Exception as e:
    print(f"Error: {e}")

# Try the specific category ID from the original request
print("\n\nTrying specific category ID from the URL...")
specific_category_id = "68bab2d0885b1e15708ccd66"
url = f"{BASE_URL}/user/game/questions-list/{specific_category_id}"

try:
    response = requests.get(url, headers=headers)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        if data.get('status') == True:
            questions = data.get('data', {}).get('questions', [])
            print(f"Found {len(questions)} questions")
            if questions:
                print(f"First question: {questions[0].get('question')}")
        else:
            print(f"Error: {data.get('message')}")
except Exception as e:
    print(f"Error: {e}")