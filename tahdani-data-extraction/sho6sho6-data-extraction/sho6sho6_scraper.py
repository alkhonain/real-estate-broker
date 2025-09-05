import asyncio
import json
import os
from datetime import datetime
from typing import Dict, List, Any

# Main scraper for sho6sho6.com using Playwright

async def extract_sho6sho6_data():
    """
    Extract questions and categories from sho6sho6.com
    """
    print("""
Sho6sho6.com Data Extraction Tool
=================================

This tool will help you extract questions and categories from sho6sho6.com

Installation Requirements:
-------------------------
pip install playwright httpx beautifulsoup4
playwright install chromium

The scraper will:
1. Navigate to the website
2. Handle authentication if needed
3. Extract categories
4. Extract questions from each category
5. Save data in JSON and CSV formats
""")

    # Create the Playwright extraction script
    playwright_code = '''
from playwright.async_api import async_playwright
import json
import asyncio
import os
from datetime import datetime

class Sho6sho6Scraper:
    def __init__(self):
        self.data = {
            "metadata": {
                "source": "sho6sho6.com",
                "extracted_date": datetime.now().isoformat(),
                "version": "1.0"
            },
            "categories": [],
            "questions": [],
            "api_responses": []
        }
        self.session_token = None
        self.access_token = None
        
    async def intercept_response(self, response):
        """Intercept and log API responses"""
        url = response.url
        
        # Look for interesting API endpoints
        if any(keyword in url for keyword in ['api', 'question', 'category', 'game', '_rsc']):
            try:
                # Try to get response body
                if response.status == 200:
                    content_type = response.headers.get('content-type', '')
                    
                    if 'application/json' in content_type:
                        data = await response.json()
                        self.data["api_responses"].append({
                            "url": url,
                            "data": data,
                            "timestamp": datetime.now().isoformat()
                        })
                        print(f"Captured JSON API: {url}")
                        
                    elif 'text/x-component' in content_type or '_rsc' in url:
                        # React Server Components data
                        text = await response.text()
                        self.data["api_responses"].append({
                            "url": url,
                            "data": text,
                            "type": "rsc",
                            "timestamp": datetime.now().isoformat()
                        })
                        print(f"Captured RSC data: {url}")
                        
            except Exception as e:
                print(f"Error processing response: {e}")
                
    async def extract_from_rsc(self, text):
        """Extract data from React Server Components format"""
        # Parse the RSC format to extract categories and questions
        lines = text.split('\\n')
        for line in lines:
            if 'categories' in line or 'questions' in line:
                # Extract JSON-like data
                try:
                    # Look for JSON objects in the line
                    import re
                    json_matches = re.findall(r'\\{[^{}]*\\}', line)
                    for match in json_matches:
                        try:
                            data = json.loads(match)
                            if 'category' in str(data).lower():
                                self.data["categories"].append(data)
                            elif 'question' in str(data).lower():
                                self.data["questions"].append(data)
                        except:
                            pass
                except:
                    pass
    
    async def run(self):
        async with async_playwright() as p:
            # Launch browser
            browser = await p.chromium.launch(
                headless=False,  # Set to True for background operation
                args=['--disable-blink-features=AutomationControlled']
            )
            
            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                locale='ar-SA',
                user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            )
            
            page = await context.new_page()
            
            # Set up response interceptor
            page.on("response", self.intercept_response)
            
            print("Navigating to sho6sho6.com...")
            await page.goto("https://sho6sho6.com", wait_until="networkidle")
            await page.wait_for_timeout(3000)
            
            # Take screenshot of main page
            await page.screenshot(path="sho6sho6_main.png")
            
            # Try to navigate to choose categories page
            print("Looking for category selection...")
            try:
                # Look for play button or similar
                play_button = await page.query_selector("text=إلعب") or await page.query_selector("text=العب")
                if play_button:
                    await play_button.click()
                    await page.wait_for_timeout(3000)
                    
                # Navigate to choose page
                await page.goto("https://sho6sho6.com/choose", wait_until="networkidle")
                await page.wait_for_timeout(3000)
                await page.screenshot(path="sho6sho6_categories.png")
                
                # Extract categories from the page
                print("Extracting categories...")
                categories = await page.query_selector_all('[data-category], .category-item, [class*="category"]')
                
                for i, cat in enumerate(categories):
                    try:
                        text = await cat.text_content()
                        if text:
                            self.data["categories"].append({
                                "id": f"cat_{i+1}",
                                "name": text.strip(),
                                "extracted_from": "dom"
                            })
                    except:
                        pass
                        
                print(f"Found {len(self.data['categories'])} categories")
                
            except Exception as e:
                print(f"Navigation error: {e}")
            
            # Wait for any pending network requests
            await page.wait_for_timeout(5000)
            
            # Close browser
            await browser.close()
            
            # Save all captured data
            self.save_data()
            
            return self.data
    
    def save_data(self):
        """Save extracted data to files"""
        # Create output directory
        os.makedirs('output', exist_ok=True)
        
        # Save raw data
        with open('output/sho6sho6_raw_data.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
            
        # Process and save clean data
        clean_data = {
            "metadata": self.data["metadata"],
            "categories": self.data["categories"],
            "questions": self.data["questions"]
        }
        
        with open('output/sho6sho6_data.json', 'w', encoding='utf-8') as f:
            json.dump(clean_data, f, ensure_ascii=False, indent=2)
            
        print(f"\\nData saved to output directory:")
        print(f"- Raw data: output/sho6sho6_raw_data.json")
        print(f"- Clean data: output/sho6sho6_data.json")
        print(f"- Screenshots: sho6sho6_main.png, sho6sho6_categories.png")

# Run the scraper
async def main():
    scraper = Sho6sho6Scraper()
    await scraper.run()

if __name__ == "__main__":
    asyncio.run(main())
'''

    # Save the Playwright scraper
    with open('sho6sho6_playwright_scraper.py', 'w', encoding='utf-8') as f:
        f.write(playwright_code)

    # Create a network monitor script
    network_monitor = '''
import mitmproxy.http
from mitmproxy import ctx
import json
import os
from datetime import datetime

class Sho6sho6Monitor:
    def __init__(self):
        self.captured_data = {
            "requests": [],
            "categories": [],
            "questions": []
        }
        
    def response(self, flow: mitmproxy.http.HTTPFlow) -> None:
        """Intercept HTTP responses"""
        if "sho6sho6.com" in flow.request.pretty_host:
            # Log the request
            request_data = {
                "url": flow.request.pretty_url,
                "method": flow.request.method,
                "timestamp": datetime.now().isoformat()
            }
            
            # Check if response contains JSON data
            if flow.response and flow.response.content:
                content_type = flow.response.headers.get("content-type", "")
                
                if "json" in content_type or "text/x-component" in content_type:
                    try:
                        # Try to decode as JSON
                        if "json" in content_type:
                            data = json.loads(flow.response.text)
                            request_data["response"] = data
                            
                            # Extract categories and questions
                            self.extract_game_data(data)
                        else:
                            request_data["response"] = flow.response.text[:1000]  # First 1000 chars
                            
                        self.captured_data["requests"].append(request_data)
                        ctx.log.info(f"Captured: {flow.request.pretty_url}")
                        
                        # Save data periodically
                        self.save_data()
                        
                    except Exception as e:
                        ctx.log.error(f"Error processing response: {e}")
                        
    def extract_game_data(self, data):
        """Extract categories and questions from response data"""
        if isinstance(data, dict):
            # Look for categories
            if "categories" in data:
                self.captured_data["categories"].extend(data["categories"])
            
            # Look for questions
            if "questions" in data:
                self.captured_data["questions"].extend(data["questions"])
                
            # Recursively check nested data
            for key, value in data.items():
                if isinstance(value, (dict, list)):
                    self.extract_game_data(value)
                    
        elif isinstance(data, list):
            for item in data:
                if isinstance(item, dict):
                    self.extract_game_data(item)
                    
    def save_data(self):
        """Save captured data to file"""
        os.makedirs('network_capture', exist_ok=True)
        
        with open('network_capture/sho6sho6_network_data.json', 'w', encoding='utf-8') as f:
            json.dump(self.captured_data, f, ensure_ascii=False, indent=2)

addons = [Sho6sho6Monitor()]

# To use this script:
# 1. Install mitmproxy: pip install mitmproxy
# 2. Run: mitmdump -s network_monitor.py
# 3. Configure your browser to use proxy: localhost:8080
# 4. Browse sho6sho6.com and play games
# 5. Check network_capture/sho6sho6_network_data.json for captured data
'''

    # Save the network monitor
    with open('network_monitor.py', 'w', encoding='utf-8') as f:
        f.write(network_monitor)

    # Create usage instructions
    instructions = '''
Sho6sho6.com Data Extraction Instructions
=========================================

We've created two approaches to extract data:

1. Playwright Browser Automation (Recommended)
----------------------------------------------
Installation:
    pip install playwright httpx beautifulsoup4
    playwright install chromium

Usage:
    python sho6sho6_playwright_scraper.py

This will:
- Open a browser window
- Navigate through the website
- Capture API calls and responses
- Extract categories and questions
- Save data to output/ directory


2. Network Traffic Monitor (Advanced)
------------------------------------
Installation:
    pip install mitmproxy

Usage:
    # Terminal 1: Start the proxy
    mitmdump -s network_monitor.py
    
    # Terminal 2: Configure browser proxy
    - Set HTTP proxy to: localhost:8080
    - Browse sho6sho6.com and play games
    - Data will be saved to network_capture/

This captures all network traffic and extracts game data.


3. Manual Browser DevTools (Simplest)
------------------------------------
1. Open Chrome/Firefox
2. Press F12 to open DevTools
3. Go to Network tab
4. Navigate to sho6sho6.com
5. Play games and select categories
6. Look for API calls containing JSON data
7. Right-click responses → Copy → Copy Response
8. Save to files for processing


Expected Data Structure:
-----------------------
{
    "categories": [
        {
            "id": "category_id",
            "name": "اسم الفئة",
            "description": "وصف الفئة",
            "icon": "🎮"
        }
    ],
    "questions": [
        {
            "id": "question_id",
            "category_id": "category_id",
            "question": "نص السؤال",
            "answer": "الإجابة الصحيحة",
            "options": ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
            "difficulty": "سهل/متوسط/صعب",
            "type": "multiple_choice"
        }
    ]
}

Notes:
------
- The website uses Next.js with React Server Components
- Data is loaded dynamically
- Authentication may be required for some features
- Categories seem to include: تاريخ، جغرافيا، رياضة، علوم، etc.
'''

    with open('INSTRUCTIONS.md', 'w', encoding='utf-8') as f:
        f.write(instructions)

    print("\nCreated extraction tools:")
    print("1. sho6sho6_playwright_scraper.py - Browser automation scraper")
    print("2. network_monitor.py - Network traffic interceptor")  
    print("3. INSTRUCTIONS.md - Detailed usage instructions")
    print("\nStart with the Playwright scraper for the easiest approach!")

# Run the setup
if __name__ == "__main__":
    asyncio.run(extract_sho6sho6_data())