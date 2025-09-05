import requests
import json
import sqlite3
from datetime import datetime

# Configuration
BASE_URL = "https://api.seenjeemkw.com/api"
AUTH_TOKEN = "Bearer 27718cb9f8e472d683e5da434337bfff:324b10bc7e737053134d4f46466202be19605a43ab84da436abba0fda138e06ed686099869bb05789a45e2580d5c5624317119e910d3b84a94804518580643a920108c09623160bbab4693f7cded39eb6aca0a1f8e0c112034ef6af4b4f4d8d0be9d46badf9e5341beb3d2c5d425114f9aec11681880492c50fa3cc7445cec72ef0751487cecf2ca890dcc4bed134d8e36afa06ec6673743552bc8f7b9642048"

headers = {
    "Authorization": AUTH_TOKEN,
    "Content-Type": "application/json"
}

# Create database
def create_database():
    conn = sqlite3.connect('seenjeem_complete.db')
    cursor = conn.cursor()
    
    # Drop existing tables
    cursor.execute('DROP TABLE IF EXISTS countries')
    cursor.execute('DROP TABLE IF EXISTS game_questions')
    cursor.execute('DROP TABLE IF EXISTS question_details')
    
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
    
    # Create game questions table
    cursor.execute('''
        CREATE TABLE game_questions (
            id INTEGER PRIMARY KEY,
            user_id TEXT,
            category_id TEXT,
            question_id TEXT,
            class TEXT,
            team_index INTEGER,
            button_click TEXT,
            right_answer_given_by_team TEXT,
            data TEXT
        )
    ''')
    
    # Create question details table
    cursor.execute('''
        CREATE TABLE question_details (
            id TEXT PRIMARY KEY,
            category_id TEXT,
            question TEXT,
            question_ar TEXT,
            question_type_view TEXT,
            correct_answer TEXT,
            correct_answer_ar TEXT,
            correct_answer_media TEXT,
            layout_template INTEGER,
            class TEXT,
            image_urls TEXT,
            video_urls TEXT,
            audio_urls TEXT,
            status TEXT,
            fix_question BOOLEAN,
            created_at TEXT,
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

# Fetch questions for a category
def fetch_questions(category_id):
    print(f"Fetching questions for category {category_id}...")
    url = f"{BASE_URL}/user/game/questions-list/{category_id}"
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        if isinstance(data, dict) and data.get('status') == True:
            return data.get('data', [])
        
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

def save_game_questions(conn, game_questions):
    cursor = conn.cursor()
    
    for gq in game_questions:
        # Save game question
        cursor.execute('''
            INSERT OR REPLACE INTO game_questions 
            (id, user_id, category_id, question_id, class, team_index, button_click, right_answer_given_by_team, data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            gq.get('id'),
            gq.get('userId', ''),
            gq.get('categoryId', ''),
            gq.get('questionId', ''),
            gq.get('class', ''),
            gq.get('teamIndex', 0),
            gq.get('buttonClick', ''),
            gq.get('rightAnswerGivenByTeam', ''),
            json.dumps(gq)
        ))
        
        # Save question details if available
        if 'GamesQuestion' in gq:
            q = gq['GamesQuestion']
            
            # Extract Arabic question if not in separate field
            question_ar = q.get('questionAr', q.get('question', ''))
            answer_ar = q.get('correctAnswerAr', q.get('correctAnswer', ''))
            
            cursor.execute('''
                INSERT OR REPLACE INTO question_details 
                (id, category_id, question, question_ar, question_type_view, correct_answer, correct_answer_ar, 
                 correct_answer_media, layout_template, class, image_urls, video_urls, audio_urls, 
                 status, fix_question, created_at, data)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                q.get('id', ''),
                q.get('categoryId', ''),
                q.get('question', ''),
                question_ar,
                q.get('questionTypeView', ''),
                q.get('correctAnswer', ''),
                answer_ar,
                q.get('correctAnswerMedia', ''),
                q.get('layoutTemplate', 0),
                q.get('class', ''),
                json.dumps(q.get('image', [])),
                json.dumps(q.get('video', [])),
                json.dumps(q.get('audio', [])),
                q.get('status', ''),
                q.get('fixQuestion', False),
                q.get('createdAt', ''),
                json.dumps(q)
            ))
    
    conn.commit()
    print(f"Saved {len(game_questions)} game questions to database")

# Main execution
def main():
    conn = create_database()
    
    # Fetch and save countries
    countries = fetch_countries()
    if countries:
        save_countries(conn, countries)
    
    # Fetch questions for the known category
    known_category_id = "68bab2d0885b1e15708ccd66"
    
    print(f"\nFetching questions for category ID: {known_category_id}")
    game_questions = fetch_questions(known_category_id)
    
    if game_questions:
        save_game_questions(conn, game_questions)
        
        # Extract unique categories from the questions
        unique_categories = set()
        for gq in game_questions:
            if gq.get('categoryId'):
                unique_categories.add(gq['categoryId'])
        
        print(f"\nFound {len(unique_categories)} unique categories in the questions")
        
        # Try to fetch questions for each discovered category
        all_questions = {known_category_id: game_questions}
        
        for cat_id in unique_categories:
            if cat_id != known_category_id:  # Skip the one we already fetched
                print(f"\nFetching questions for discovered category: {cat_id}")
                additional_questions = fetch_questions(cat_id)
                if additional_questions:
                    all_questions[cat_id] = additional_questions
                    save_game_questions(conn, additional_questions)
        
        # Save all data as JSON backup
        all_data = {
            'countries': countries,
            'categories': list(unique_categories),
            'questions_by_category': all_questions,
            'total_questions': sum(len(qs) for qs in all_questions.values()),
            'fetched_at': datetime.now().isoformat()
        }
        
        with open('seenjeem_complete_data.json', 'w', encoding='utf-8') as f:
            json.dump(all_data, f, ensure_ascii=False, indent=2)
        
        print("\n" + "="*50)
        print("Data extraction complete!")
        print(f"Total countries: {len(countries)}")
        print(f"Total categories discovered: {len(unique_categories)}")
        print(f"Total questions: {sum(len(qs) for qs in all_questions.values())}")
        print("="*50)
        
        # Show some sample questions
        print("\nSample questions:")
        for i, gq in enumerate(game_questions[:3]):
            if 'GamesQuestion' in gq:
                q = gq['GamesQuestion']
                print(f"\n{i+1}. {q.get('question', 'N/A')}")
                print(f"   Answer: {q.get('correctAnswer', 'N/A')}")
                print(f"   Class: {q.get('class', 'N/A')}")
    else:
        print("No questions found")
    
    conn.close()

if __name__ == "__main__":
    main()