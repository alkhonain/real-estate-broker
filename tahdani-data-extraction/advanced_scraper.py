import asyncio
import json
import os
from datetime import datetime

# This script uses Playwright to intercept network requests and extract game data

async def intercept_api_calls():
    """
    Use Playwright to intercept network calls and extract data
    """
    print("""
Advanced Data Extraction Script for tahdani.sa
============================================

This script provides methods to extract questions and categories by intercepting network calls.

Installation Requirements:
-------------------------
pip install playwright requests beautifulsoup4
playwright install chromium

Usage Instructions:
------------------
""")
    
    code_template = '''
from playwright.async_api import async_playwright
import json
import asyncio

async def extract_tahdani_data():
    """
    Extract data from tahdani.sa by intercepting API calls
    """
    captured_data = {
        "categories": [],
        "questions": [],
        "api_calls": []
    }
    
    async def handle_response(response):
        """
        Intercept and log API responses
        """
        url = response.url
        
        # Check if this is an API call we're interested in
        if any(keyword in url for keyword in ['question', 'category', 'game', 'api']):
            try:
                data = await response.json()
                captured_data["api_calls"].append({
                    "url": url,
                    "status": response.status,
                    "data": data
                })
                
                # Extract categories if found
                if 'categor' in url.lower():
                    if isinstance(data, list):
                        captured_data["categories"].extend(data)
                    elif isinstance(data, dict) and 'categories' in data:
                        captured_data["categories"].extend(data['categories'])
                
                # Extract questions if found
                if 'question' in url.lower():
                    if isinstance(data, list):
                        captured_data["questions"].extend(data)
                    elif isinstance(data, dict) and 'questions' in data:
                        captured_data["questions"].extend(data['questions'])
                        
                print(f"Captured API call: {url}")
                
            except Exception as e:
                print(f"Error processing response: {e}")
    
    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch(headless=False)  # Set to True for background operation
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            locale='ar-SA'  # Arabic locale
        )
        
        page = await context.new_page()
        
        # Set up response interceptor
        page.on("response", handle_response)
        
        # Navigate to the website
        await page.goto("https://tahdani.sa/start-game", wait_until="networkidle")
        
        # Wait for initial load
        await page.wait_for_timeout(3000)
        
        # Try to interact with the page to trigger data loading
        # Look for category buttons or game start options
        try:
            # Click on "How to play" or "Categories" if visible
            category_button = await page.query_selector("text=الفئات")
            if category_button:
                await category_button.click()
                await page.wait_for_timeout(2000)
            
            # Try to start a game to see questions
            start_button = await page.query_selector("text=ابدأ اللعب")
            if start_button:
                await start_button.click()
                await page.wait_for_timeout(2000)
                
        except Exception as e:
            print(f"Navigation error: {e}")
        
        # Save screenshot for reference
        await page.screenshot(path="tahdani_screenshot.png")
        
        # Close browser
        await browser.close()
        
        # Save captured data
        with open('captured_data.json', 'w', encoding='utf-8') as f:
            json.dump(captured_data, f, ensure_ascii=False, indent=2)
        
        return captured_data

# Run the extraction
if __name__ == "__main__":
    data = asyncio.run(extract_tahdani_data())
    print(f"\\nExtraction complete!")
    print(f"API calls captured: {len(data['api_calls'])}")
    print(f"Categories found: {len(data['categories'])}")
    print(f"Questions found: {len(data['questions'])}")
'''
    
    # Save the advanced scraper code
    with open('playwright_scraper.py', 'w', encoding='utf-8') as f:
        f.write(code_template)
    
    print("\nCreated: playwright_scraper.py")
    print("\nTo use this scraper:")
    print("1. Install playwright: pip install playwright")
    print("2. Install browser: playwright install chromium")
    print("3. Run the scraper: python playwright_scraper.py")
    print("\nThe scraper will:")
    print("- Open a browser window")
    print("- Navigate to tahdani.sa")
    print("- Intercept all network calls")
    print("- Save any API data related to questions/categories")
    print("- Take a screenshot for reference")

# Create a manual data entry helper
def create_manual_entry_form():
    """
    Create an HTML form for manual data entry
    """
    html_template = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tahdani Data Entry</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1, h2 {
            color: #333;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, select, textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
        .output {
            margin-top: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tahdani Data Entry Form</h1>
        
        <h2>إضافة فئة جديدة</h2>
        <div class="form-group">
            <label>اسم الفئة:</label>
            <input type="text" id="categoryName" placeholder="مثال: تاريخ">
        </div>
        <div class="form-group">
            <label>وصف الفئة:</label>
            <input type="text" id="categoryDesc" placeholder="مثال: أسئلة عن التاريخ">
        </div>
        <button onclick="addCategory()">إضافة فئة</button>
        
        <h2>إضافة سؤال جديد</h2>
        <div class="form-group">
            <label>الفئة:</label>
            <select id="questionCategory">
                <option value="">اختر فئة</option>
            </select>
        </div>
        <div class="form-group">
            <label>السؤال:</label>
            <textarea id="questionText" rows="3"></textarea>
        </div>
        <div class="form-group">
            <label>الإجابة الصحيحة:</label>
            <input type="text" id="correctAnswer">
        </div>
        <div class="form-group">
            <label>الخيارات (مفصولة بفواصل):</label>
            <input type="text" id="options" placeholder="خيار1, خيار2, خيار3, خيار4">
        </div>
        <button onclick="addQuestion()">إضافة سؤال</button>
        
        <h2>البيانات المُدخلة</h2>
        <button onclick="exportData()">تصدير كـ JSON</button>
        <div id="output" class="output"></div>
    </div>
    
    <script>
        let database = {
            categories: [],
            questions: []
        };
        
        function addCategory() {
            const name = document.getElementById('categoryName').value;
            const desc = document.getElementById('categoryDesc').value;
            
            if (name) {
                const category = {
                    id: 'cat_' + (database.categories.length + 1),
                    name: name,
                    description: desc
                };
                database.categories.push(category);
                updateCategorySelect();
                updateOutput();
                
                // Clear inputs
                document.getElementById('categoryName').value = '';
                document.getElementById('categoryDesc').value = '';
            }
        }
        
        function addQuestion() {
            const category = document.getElementById('questionCategory').value;
            const question = document.getElementById('questionText').value;
            const answer = document.getElementById('correctAnswer').value;
            const options = document.getElementById('options').value.split(',').map(o => o.trim());
            
            if (category && question && answer) {
                const q = {
                    id: 'q_' + (database.questions.length + 1),
                    category_id: category,
                    question: question,
                    answer: answer,
                    options: options,
                    difficulty: 'medium',
                    points: 10
                };
                database.questions.push(q);
                updateOutput();
                
                // Clear inputs
                document.getElementById('questionText').value = '';
                document.getElementById('correctAnswer').value = '';
                document.getElementById('options').value = '';
            }
        }
        
        function updateCategorySelect() {
            const select = document.getElementById('questionCategory');
            select.innerHTML = '<option value="">اختر فئة</option>';
            database.categories.forEach(cat => {
                select.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
            });
        }
        
        function updateOutput() {
            const output = document.getElementById('output');
            output.textContent = JSON.stringify(database, null, 2);
        }
        
        function exportData() {
            const dataStr = JSON.stringify(database, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = 'tahdani_data.json';
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        }
    </script>
</body>
</html>'''
    
    with open('manual_entry_form.html', 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    print("\nCreated: manual_entry_form.html")
    print("Open this file in a browser to manually enter questions and categories")

if __name__ == "__main__":
    print("Creating advanced extraction tools...")
    
    # Create the advanced scraper
    asyncio.run(intercept_api_calls())
    
    # Create manual entry form
    create_manual_entry_form()
    
    print("\n" + "="*50)
    print("Summary of created tools:")
    print("1. playwright_scraper.py - Advanced browser automation scraper")
    print("2. manual_entry_form.html - Manual data entry interface")
    print("3. output/ directory - Contains template JSON and CSV files")
    print("\nRecommended approach:")
    print("1. Try the playwright scraper first to capture API calls")
    print("2. If the site requires login, use manual entry form")
    print("3. Check the output directory for template files")