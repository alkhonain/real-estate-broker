import requests
import json
import sqlite3
from datetime import datetime
import time

# Configuration
BASE_URL = "https://api.seenjeemkw.com/api"
AUTH_TOKEN = "Bearer 27718cb9f8e472d683e5da434337bfff:324b10bc7e737053134d4f46466202be19605a43ab84da436abba0fda138e06ed686099869bb05789a45e2580d5c5624317119e910d3b84a94804518580643a920108c09623160bbab4693f7cded39eb6aca0a1f8e0c112034ef6af4b4f4d8d0be9d46badf9e5341beb3d2c5d425114f9aec11681880492c50fa3cc7445cec72ef0751487cecf2ca890dcc4bed134d8e36afa06ec6673743552bc8f7b9642048"

headers = {
    "Authorization": AUTH_TOKEN,
    "Content-Type": "application/json"
}

# Create database
def create_database():
    conn = sqlite3.connect('seenjeem_data.db')
    cursor = conn.cursor()
    
    # Drop existing table if it exists and recreate
    cursor.execute('DROP TABLE IF EXISTS countries')
    cursor.execute('DROP TABLE IF EXISTS questions')
    
    # Create countries table
    cursor.execute('''
        CREATE TABLE countries (
            id TEXT PRIMARY KEY,
            name TEXT,
            native TEXT,
            iso2 TEXT,
            iso3 TEXT,
            capital TEXT,
            currency TEXT,
            phone_code TEXT,
            region TEXT,
            subregion TEXT,
            data TEXT
        )
    ''')
    
    # Create questions table (since we can't get categories through the API)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_id TEXT,
            question TEXT,
            question_ar TEXT,
            answer TEXT,
            answer_ar TEXT,
            options TEXT,
            difficulty TEXT,
            points INTEGER,
            data TEXT
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
        data = response.json()
        
        if isinstance(data, dict) and data.get('status') == True:
            return data.get('data', [])
        return []
    except Exception as e:
        print(f"Error fetching countries: {e}")
        return []

# Fetch questions for a specific category ID
def fetch_questions(category_id):
    print(f"Fetching questions for category {category_id}...")
    url = f"{BASE_URL}/user/game/questions-list/{category_id}"
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        # Handle different response formats
        if isinstance(data, list):
            return data
        elif isinstance(data, dict):
            if data.get('status') == True:
                return data.get('data', {}).get('questions', [])
            else:
                print(f"Error for category {category_id}: {data.get('message')}")
        
        return []
    except Exception as e:
        print(f"Error fetching questions for category {category_id}: {e}")
        return []

# Save data to database
def save_countries(conn, countries):
    cursor = conn.cursor()
    
    for country in countries:
        cursor.execute('''
            INSERT OR REPLACE INTO countries 
            (id, name, native, iso2, iso3, capital, currency, phone_code, region, subregion, data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            country.get('id', ''),
            country.get('name', ''),
            country.get('native', ''),
            country.get('iso2', ''),
            country.get('iso3', ''),
            country.get('capital', ''),
            country.get('currency', ''),
            country.get('phoneCode', ''),
            country.get('region', ''),
            country.get('subregion', ''),
            json.dumps(country)
        ))
    
    conn.commit()
    print(f"Saved {len(countries)} countries to database")

def save_questions(conn, category_id, questions):
    cursor = conn.cursor()
    
    for question in questions:
        # Extract options if available
        options = []
        if 'options' in question:
            options = question.get('options', [])
        elif 'choices' in question:
            options = question.get('choices', [])
        
        cursor.execute('''
            INSERT INTO questions 
            (category_id, question, question_ar, answer, answer_ar, options, difficulty, points, data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            category_id,
            question.get('question', ''),
            question.get('questionAr', question.get('question_ar', '')),
            question.get('answer', ''),
            question.get('answerAr', question.get('answer_ar', '')),
            json.dumps(options),
            question.get('difficulty', ''),
            question.get('points', 0),
            json.dumps(question)
        ))
    
    conn.commit()
    print(f"Saved {len(questions)} questions for category {category_id}")

# Main execution
def main():
    conn = create_database()
    
    # Fetch and save countries
    countries = fetch_countries()
    if countries:
        save_countries(conn, countries)
    
    # Since we can't enumerate categories through the API, 
    # let's try the specific category ID from the URL you provided
    known_category_id = "68bab2d0885b1e15708ccd66"
    
    print(f"\nFetching questions for known category ID: {known_category_id}")
    questions = fetch_questions(known_category_id)
    
    if questions:
        save_questions(conn, known_category_id, questions)
        
        # Save raw data as JSON backup
        all_data = {
            'countries': countries,
            'questions': {
                known_category_id: questions
            },
            'fetched_at': datetime.now().isoformat()
        }
        
        with open('seenjeem_data.json', 'w', encoding='utf-8') as f:
            json.dump(all_data, f, ensure_ascii=False, indent=2)
        
        print("\nData extraction complete!")
        print(f"Total countries: {len(countries)}")
        print(f"Total questions: {len(questions)}")
    else:
        print("No questions found for the provided category ID")
    
    # Note for the user
    print("\n" + "="*50)
    print("NOTE: The API seems to require specific category IDs to fetch questions.")
    print("Without access to a category listing endpoint, we can only fetch questions")
    print("for category IDs that you already know.")
    print("="*50)
    
    conn.close()

if __name__ == "__main__":
    main()