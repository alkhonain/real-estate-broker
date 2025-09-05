import requests
import json
import sqlite3
import os
from datetime import datetime

# Configuration
BASE_URL = "https://api.seenjeemkw.com/api"
AUTH_TOKEN = "Bearer 27718cb9f8e472d683e5da434337bfff:324b10bc7e737053134d4f46466202be19605a43ab84da436abba0fda138e06ed686099869bb05789a45e2580d5c5624317119e910d3b84a94804518580643a920108c09623160bbab4693f7cded39eb6aca0a1f8e0c112034ef6af4b4f4d8d0be9d46badf9e5341beb3d2c5d425114f9aec11681880492c50fa3cc7445cec72ef0751487cecf2ca890dcc4bed134d8e36afa06ec6673743552bc8f7b9642048"
USER_ID = "68b9e5974ee58fc2ff357476"

# Headers for authenticated requests
headers = {
    "Authorization": AUTH_TOKEN,
    "Content-Type": "application/json"
}

# Test with Kuwait only
print("Testing with Kuwait ID...")
kuwait_id = "653c8fff18da2c44f651f370"

# Fetch categories for Kuwait
print(f"\nFetching categories for Kuwait...")
url = f"{BASE_URL}/user/game-category/user-category-list"
params = {
    "type": "GENERAL",
    "countryId": kuwait_id
}

try:
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    categories_response = response.json()
    
    print(f"Response status: {categories_response.get('status')}")
    
    if categories_response.get('status') == True:
        categories = categories_response.get('data', {}).get('categories', [])
        print(f"Found {len(categories)} categories")
        
        # Print first 3 categories
        for i, cat in enumerate(categories[:3]):
            print(f"\nCategory {i+1}:")
            print(f"  ID: {cat.get('_id')}")
            print(f"  Name: {cat.get('name')}")
            print(f"  Name (AR): {cat.get('nameAr')}")
            print(f"  Description: {cat.get('description')}")
            
        # Try to fetch questions for the first category
        if categories:
            first_category_id = categories[0].get('_id')
            print(f"\n\nFetching questions for category: {first_category_id}")
            
            url = f"{BASE_URL}/user/game/questions-list/{first_category_id}"
            
            try:
                response = requests.get(url, headers=headers)
                response.raise_for_status()
                questions_response = response.json()
                
                print(f"Questions response status: {questions_response.get('status')}")
                
                if questions_response.get('status') == True:
                    questions = questions_response.get('data', {}).get('questions', [])
                    print(f"Found {len(questions)} questions")
                    
                    # Print first 2 questions
                    for i, q in enumerate(questions[:2]):
                        print(f"\nQuestion {i+1}:")
                        print(f"  Question: {q.get('question')}")
                        print(f"  Question (AR): {q.get('questionAr')}")
                        print(f"  Answer: {q.get('answer')}")
                        print(f"  Answer (AR): {q.get('answerAr')}")
                        print(f"  Points: {q.get('points')}")
                else:
                    print(f"Error message: {questions_response.get('message')}")
                    
            except Exception as e:
                print(f"Error fetching questions: {e}")
    else:
        print(f"Error: {categories_response.get('message')}")
        
except Exception as e:
    print(f"Error fetching categories: {e}")