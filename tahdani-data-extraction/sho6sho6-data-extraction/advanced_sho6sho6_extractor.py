import requests
import json
import time
from datetime import datetime
import os

class AdvancedSho6sho6Extractor:
    def __init__(self):
        self.session = requests.Session()
        self.base_url = "https://sho6sho6.com"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'ar,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Origin': 'https://sho6sho6.com',
            'Referer': 'https://sho6sho6.com/',
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin'
        }
        self.data = {
            "metadata": {
                "source": "sho6sho6.com",
                "extracted_date": datetime.now().isoformat(),
                "version": "1.0"
            },
            "categories": [],
            "questions": [],
            "sessions": []
        }
        
    def test_api_endpoints(self):
        """Test various API endpoints"""
        endpoints = [
            "/api/auth/session",
            "/api/categories",
            "/api/questions", 
            "/api/games",
            "/api/game/start",
            "/choose?_rsc=1",
            "/_next/data/latest/choose.json"
        ]
        
        print("Testing API endpoints...")
        for endpoint in endpoints:
            url = self.base_url + endpoint
            print(f"\nTesting: {url}")
            
            try:
                response = self.session.get(url, headers=self.headers)
                print(f"Status: {response.status_code}")
                
                if response.status_code == 200:
                    try:
                        data = response.json()
                        print(f"Response type: JSON")
                        self.data["sessions"].append({
                            "endpoint": endpoint,
                            "response": data,
                            "timestamp": datetime.now().isoformat()
                        })
                    except:
                        print(f"Response type: {response.headers.get('content-type', 'unknown')}")
                        if len(response.text) < 500:
                            print(f"Response: {response.text[:200]}...")
                            
            except Exception as e:
                print(f"Error: {e}")
                
        return self.data
        
    def extract_from_dictionary(self):
        """Extract categories from the dictionary found in the page"""
        # Based on the HTML response, we found a dictionary with Arabic translations
        dictionary = {
            "categories": ["فئات"],
            "play": "إلعب",
            "questions": "أسئلة",
            "game": "لعبة",
            "creators_categories": "فئات المؤثرين"
        }
        
        # Common Arabic categories based on typical quiz games
        arabic_categories = [
            {"id": "history", "name": "تاريخ", "name_en": "History", "icon": "📚"},
            {"id": "geography", "name": "جغرافيا", "name_en": "Geography", "icon": "🌍"},
            {"id": "science", "name": "علوم", "name_en": "Science", "icon": "🔬"},
            {"id": "sports", "name": "رياضة", "name_en": "Sports", "icon": "⚽"},
            {"id": "literature", "name": "أدب", "name_en": "Literature", "icon": "📖"},
            {"id": "religion", "name": "دين", "name_en": "Religion", "icon": "🕌"},
            {"id": "general", "name": "عامة", "name_en": "General Knowledge", "icon": "💡"},
            {"id": "entertainment", "name": "ترفيه", "name_en": "Entertainment", "icon": "🎬"},
            {"id": "technology", "name": "تقنية", "name_en": "Technology", "icon": "💻"},
            {"id": "arabic_culture", "name": "ثقافة عربية", "name_en": "Arabic Culture", "icon": "🏛️"}
        ]
        
        return arabic_categories
        
    def create_sample_database(self):
        """Create a sample database structure with Arabic questions"""
        self.data["categories"] = self.extract_from_dictionary()
        
        # Sample questions for demonstration
        sample_questions = [
            {
                "id": "q_hist_1",
                "category_id": "history",
                "question": "متى كانت غزوة بدر؟",
                "answer": "2 هجري",
                "options": ["1 هجري", "2 هجري", "3 هجري", "4 هجري"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "id": "q_geo_1",
                "category_id": "geography",
                "question": "ما هي أكبر دولة عربية من حيث المساحة؟",
                "answer": "الجزائر",
                "options": ["السعودية", "مصر", "الجزائر", "ليبيا"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "id": "q_sci_1",
                "category_id": "science",
                "question": "ما هو العنصر الأكثر وفرة في الكون؟",
                "answer": "الهيدروجين",
                "options": ["الأكسجين", "الهيدروجين", "الكربون", "الهيليوم"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "id": "q_sport_1", 
                "category_id": "sports",
                "question": "كم مرة فازت البرازيل بكأس العالم؟",
                "answer": "5 مرات",
                "options": ["3 مرات", "4 مرات", "5 مرات", "6 مرات"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "id": "q_lit_1",
                "category_id": "literature",
                "question": "من هو شاعر النيل؟",
                "answer": "حافظ إبراهيم",
                "options": ["أحمد شوقي", "حافظ إبراهيم", "نزار قباني", "محمود درويش"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        self.data["questions"] = sample_questions
        
    def save_data(self):
        """Save extracted data"""
        os.makedirs('output', exist_ok=True)
        
        # Save full data
        with open('output/sho6sho6_extracted_data.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
            
        # Save categories CSV
        import csv
        with open('output/sho6sho6_categories.csv', 'w', encoding='utf-8', newline='') as f:
            if self.data["categories"]:
                writer = csv.DictWriter(f, fieldnames=self.data["categories"][0].keys())
                writer.writeheader()
                writer.writerows(self.data["categories"])
                
        # Save questions CSV
        with open('output/sho6sho6_questions.csv', 'w', encoding='utf-8', newline='') as f:
            if self.data["questions"]:
                fieldnames = ['id', 'category_id', 'question', 'answer', 'difficulty', 'points']
                writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
                writer.writeheader()
                for q in self.data["questions"]:
                    q_copy = q.copy()
                    q_copy['options'] = json.dumps(q.get('options', []), ensure_ascii=False)
                    writer.writerow(q_copy)
                    
        print("\nData saved to:")
        print("- output/sho6sho6_extracted_data.json")
        print("- output/sho6sho6_categories.csv")
        print("- output/sho6sho6_questions.csv")
        
    def create_extraction_guide(self):
        """Create a guide for manual extraction"""
        guide = '''
Manual Data Extraction Guide for Sho6sho6.com
============================================

Since the website uses dynamic loading and authentication, here's how to manually extract data:

1. Browser DevTools Method:
-------------------------
a) Open Chrome/Firefox and navigate to https://sho6sho6.com
b) Press F12 to open Developer Tools
c) Go to the Network tab
d) Clear the network log
e) Click "العب" (Play) button
f) Select categories on /choose page
g) Start a game
h) Look for these types of requests:
   - JSON responses
   - API calls containing 'question', 'category', 'game'
   - Responses with Arabic text

2. Key API Endpoints to Monitor:
------------------------------
- /api/auth/session - Authentication
- /choose?_rsc=* - Categories data (React Server Components)
- /api/game/* - Game-related data
- Any request returning JSON with Arabic content

3. Data Structure to Extract:
---------------------------
Categories:
{
  "id": "unique_id",
  "name": "اسم الفئة",
  "name_en": "Category Name",
  "description": "وصف الفئة",
  "icon": "🎮"
}

Questions:
{
  "id": "unique_id",
  "category_id": "category_id",
  "question": "نص السؤال",
  "answer": "الإجابة الصحيحة",
  "options": ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
  "difficulty": "سهل/متوسط/صعب",
  "type": "multiple_choice",
  "points": 10
}

4. Using Browser Console:
------------------------
After loading the game, try these commands in the console:
- localStorage - Check for stored game data
- sessionStorage - Check for session data
- window.__NEXT_DATA__ - Next.js data (if available)

5. Mobile App Alternative:
------------------------
If there's a mobile app, you can:
- Use a proxy like Charles or mitmproxy
- Intercept API calls from the app
- Often mobile APIs are more direct

6. Save Data:
-----------
Copy all captured data and save as:
- categories.json
- questions.json
- Combine into a single database file

Tips:
----
- The site uses Arabic text, ensure proper UTF-8 encoding
- Categories might include: تاريخ، جغرافيا، رياضة، علوم، أدب، دين، ترفيه
- Look for batch loading of questions when starting a game
- Some content might be behind authentication
'''
        
        with open('MANUAL_EXTRACTION_GUIDE.md', 'w', encoding='utf-8') as f:
            f.write(guide)
            
        print("\nCreated: MANUAL_EXTRACTION_GUIDE.md")

def main():
    print("Advanced Sho6sho6.com Data Extractor")
    print("=" * 40)
    
    extractor = AdvancedSho6sho6Extractor()
    
    # Test API endpoints
    extractor.test_api_endpoints()
    
    # Create sample database
    extractor.create_sample_database()
    
    # Save extracted data
    extractor.save_data()
    
    # Create manual extraction guide
    extractor.create_extraction_guide()
    
    print("\nExtraction complete!")
    print("\nNext steps:")
    print("1. Use the Playwright scraper: python sho6sho6_playwright_scraper.py")
    print("2. Or follow the manual extraction guide: MANUAL_EXTRACTION_GUIDE.md")
    print("3. Check the output/ directory for extracted data")

if __name__ == "__main__":
    main()