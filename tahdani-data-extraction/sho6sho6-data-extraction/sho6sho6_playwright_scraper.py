
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
        lines = text.split('\n')
        for line in lines:
            if 'categories' in line or 'questions' in line:
                # Extract JSON-like data
                try:
                    # Look for JSON objects in the line
                    import re
                    json_matches = re.findall(r'\{[^{}]*\}', line)
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
            
        print(f"\nData saved to output directory:")
        print(f"- Raw data: output/sho6sho6_raw_data.json")
        print(f"- Clean data: output/sho6sho6_data.json")
        print(f"- Screenshots: sho6sho6_main.png, sho6sho6_categories.png")

# Run the scraper
async def main():
    scraper = Sho6sho6Scraper()
    await scraper.run()

if __name__ == "__main__":
    asyncio.run(main())
