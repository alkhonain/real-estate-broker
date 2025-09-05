import json
import time
import os
from datetime import datetime

# Note: This script provides a framework for extracting data from tahdani.sa
# Since the website requires authentication and uses dynamic content loading,
# you'll need to use browser automation tools like Selenium or Playwright

def create_database_structure():
    """
    Create the database structure for storing categories and questions
    """
    database = {
        "metadata": {
            "source": "tahdani.sa",
            "extracted_date": datetime.now().isoformat(),
            "version": "1.0"
        },
        "categories": [],
        "questions": []
    }
    
    return database

def save_to_json(data, filename):
    """
    Save data to JSON file
    """
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Data saved to {filename}")

def save_to_csv(categories, questions):
    """
    Save data to CSV files
    """
    import csv
    
    # Save categories
    with open('categories.csv', 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['id', 'name', 'description', 'icon'])
        writer.writeheader()
        writer.writerows(categories)
    
    # Save questions
    with open('questions.csv', 'w', encoding='utf-8', newline='') as f:
        fieldnames = ['id', 'category_id', 'question', 'answer', 'options', 'difficulty', 'points']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(questions)
    
    print("Data saved to categories.csv and questions.csv")

# Example structure for manual data entry or browser automation
def extract_with_selenium():
    """
    Example function for using Selenium to extract data
    To use this, install selenium and a webdriver (e.g., chromedriver)
    """
    print("""
    To extract data from tahdani.sa using browser automation:
    
    1. Install required packages:
       pip install selenium webdriver-manager
    
    2. Use this example code:
    
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from webdriver_manager.chrome import ChromeDriverManager
    
    # Initialize driver
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get('https://tahdani.sa/start-game')
    
    # Wait for page to load
    wait = WebDriverWait(driver, 10)
    
    # You'll need to:
    # 1. Handle login if required
    # 2. Navigate to game sections
    # 3. Extract categories and questions
    # 4. Handle dynamic content loading
    
    # Example: Find category elements
    categories = driver.find_elements(By.CLASS_NAME, 'category-item')
    
    # Extract data
    category_data = []
    for cat in categories:
        category_data.append({
            'name': cat.find_element(By.CLASS_NAME, 'category-name').text,
            'description': cat.find_element(By.CLASS_NAME, 'category-desc').text
        })
    
    driver.quit()
    """)

def manual_extraction_template():
    """
    Template for manual data extraction
    """
    # Example data structure based on typical quiz games
    example_database = {
        "metadata": {
            "source": "tahdani.sa",
            "extracted_date": datetime.now().isoformat(),
            "version": "1.0"
        },
        "categories": [
            {
                "id": "cat_1",
                "name": "تاريخ",  # History
                "description": "أسئلة عن التاريخ العربي والإسلامي",
                "icon": "📚"
            },
            {
                "id": "cat_2", 
                "name": "جغرافيا",  # Geography
                "description": "أسئلة عن الجغرافيا والبلدان",
                "icon": "🌍"
            },
            {
                "id": "cat_3",
                "name": "علوم",  # Science
                "description": "أسئلة علمية متنوعة",
                "icon": "🔬"
            },
            {
                "id": "cat_4",
                "name": "رياضة",  # Sports
                "description": "أسئلة عن الرياضة والرياضيين",
                "icon": "⚽"
            },
            {
                "id": "cat_5",
                "name": "أدب",  # Literature
                "description": "أسئلة عن الأدب العربي والشعر",
                "icon": "📖"
            }
        ],
        "questions": [
            {
                "id": "q_1",
                "category_id": "cat_1",
                "question": "متى فُتحت مكة المكرمة؟",
                "answer": "8 هجري",
                "options": ["6 هجري", "7 هجري", "8 هجري", "9 هجري"],
                "difficulty": "medium",
                "points": 10
            },
            {
                "id": "q_2",
                "category_id": "cat_2",
                "question": "ما هي عاصمة المملكة العربية السعودية؟",
                "answer": "الرياض",
                "options": ["الرياض", "جدة", "مكة", "المدينة"],
                "difficulty": "easy",
                "points": 5
            }
            # Add more questions as extracted
        ]
    }
    
    return example_database

if __name__ == "__main__":
    print("Tahdani.sa Data Extraction Tool")
    print("="*50)
    
    # Create output directory
    os.makedirs('output', exist_ok=True)
    os.chdir('output')
    
    # Create database structure
    db = create_database_structure()
    
    # Show extraction options
    print("\nExtraction Options:")
    print("1. Manual extraction template")
    print("2. Browser automation guide")
    
    # Create example template
    template_db = manual_extraction_template()
    save_to_json(template_db, 'tahdani_template.json')
    
    # Save CSV template
    if template_db['categories'] and template_db['questions']:
        save_to_csv(template_db['categories'], template_db['questions'])
    
    # Show browser automation instructions
    extract_with_selenium()
    
    print("\n" + "="*50)
    print("Created template files in 'output' directory:")
    print("- tahdani_template.json: JSON format database")
    print("- categories.csv: Categories in CSV format")
    print("- questions.csv: Questions in CSV format")
    print("\nNext steps:")
    print("1. Use browser automation to access the website")
    print("2. Extract actual categories and questions")
    print("3. Update the template files with real data")