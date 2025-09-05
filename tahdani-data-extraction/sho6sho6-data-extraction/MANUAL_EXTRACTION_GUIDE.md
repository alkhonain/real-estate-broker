
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
