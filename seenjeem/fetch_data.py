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

# Create database
def create_database():
    conn = sqlite3.connect('seenjeem_data.db')
    cursor = conn.cursor()
    
    # Create countries table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS countries (
            id TEXT PRIMARY KEY,
            name TEXT,
            name_ar TEXT,
            code TEXT,
            data TEXT
        )
    ''')
    
    # Create categories table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS categories (
            id TEXT PRIMARY KEY,
            country_id TEXT,
            name TEXT,
            name_ar TEXT,
            type TEXT,
            description TEXT,
            data TEXT,
            FOREIGN KEY (country_id) REFERENCES countries (id)
        )
    ''')
    
    # Create questions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS questions (
            id TEXT PRIMARY KEY,
            category_id TEXT,
            question TEXT,
            question_ar TEXT,
            answer TEXT,
            answer_ar TEXT,
            difficulty TEXT,
            points INTEGER,
            data TEXT,
            FOREIGN KEY (category_id) REFERENCES categories (id)
        )
    ''')
    
    conn.commit()
    return conn

# Fetch all countries
def fetch_countries():
    print("Fetching countries...")
    url = f"{BASE_URL}/country-state-city/countries"
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching countries: {e}")
        return None

# Fetch categories for a country
def fetch_categories(country_id):
    print(f"Fetching categories for country {country_id}...")
    url = f"{BASE_URL}/user/game-category/user-category-list"
    params = {
        "type": "GENERAL",
        "countryId": country_id
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching categories for country {country_id}: {e}")
        return None

# Fetch questions for a category
def fetch_questions(category_id):
    print(f"Fetching questions for category {category_id}...")
    url = f"{BASE_URL}/user/game/questions-list/{category_id}"
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching questions for category {category_id}: {e}")
        return None

# Save data to database
def save_to_database(conn, countries_data, categories_data, questions_data):
    cursor = conn.cursor()
    
    # Save countries
    for country in countries_data:
        cursor.execute('''
            INSERT OR REPLACE INTO countries (id, name, name_ar, code, data)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            country.get('id', country.get('_id', '')),
            country.get('name', ''),
            country.get('native', ''),
            country.get('iso2', ''),
            json.dumps(country)
        ))
    
    # Save categories
    for cat_info in categories_data:
        country_id = cat_info['country_id']
        for category in cat_info['categories']:
            cursor.execute('''
                INSERT OR REPLACE INTO categories (id, country_id, name, name_ar, type, description, data)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                category.get('_id', ''),
                country_id,
                category.get('name', ''),
                category.get('nameAr', ''),
                category.get('type', ''),
                category.get('description', ''),
                json.dumps(category)
            ))
    
    # Save questions
    for q_info in questions_data:
        category_id = q_info['category_id']
        for question in q_info['questions']:
            cursor.execute('''
                INSERT OR REPLACE INTO questions (id, category_id, question, question_ar, answer, answer_ar, difficulty, points, data)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                question.get('_id', ''),
                category_id,
                question.get('question', ''),
                question.get('questionAr', ''),
                question.get('answer', ''),
                question.get('answerAr', ''),
                question.get('difficulty', ''),
                question.get('points', 0),
                json.dumps(question)
            ))
    
    conn.commit()

# Main execution
def main():
    # Create database
    conn = create_database()
    
    # Fetch countries
    countries_response = fetch_countries()
    if not countries_response:
        print("Failed to fetch countries")
        return
    
    # Check if response is a dict with status and data
    if isinstance(countries_response, dict) and countries_response.get('status') == True:
        countries_data = countries_response.get('data', [])
    else:
        countries_data = countries_response if isinstance(countries_response, list) else []
    print(f"Found {len(countries_data)} countries")
    
    # Fetch categories for each country
    categories_data = []
    for country in countries_data:
        country_id = country.get('id', country.get('_id'))
        if country_id:
            categories_response = fetch_categories(country_id)
            if categories_response:
                categories = categories_response.get('data', {}).get('categories', [])
                categories_data.append({
                    'country_id': country_id,
                    'categories': categories
                })
                print(f"Found {len(categories)} categories for {country.get('name')}")
    
    # Fetch questions for each category
    questions_data = []
    for cat_info in categories_data:
        for category in cat_info['categories']:
            category_id = category.get('_id')
            if category_id:
                questions_response = fetch_questions(category_id)
                if questions_response:
                    questions = questions_response.get('data', {}).get('questions', [])
                    questions_data.append({
                        'category_id': category_id,
                        'questions': questions
                    })
                    print(f"Found {len(questions)} questions for category {category.get('name')}")
    
    # Save all data to database
    save_to_database(conn, countries_data, categories_data, questions_data)
    
    # Save raw JSON data as backup
    all_data = {
        'countries': countries_data,
        'categories': categories_data,
        'questions': questions_data,
        'fetched_at': datetime.now().isoformat()
    }
    
    with open('all_data.json', 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    print("\nData extraction complete!")
    print(f"Total countries: {len(countries_data)}")
    print(f"Total category sets: {len(categories_data)}")
    print(f"Total question sets: {len(questions_data)}")
    
    # Close database connection
    conn.close()

if __name__ == "__main__":
    main()