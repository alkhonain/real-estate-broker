
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
    print(f"\nExtraction complete!")
    print(f"API calls captured: {len(data['api_calls'])}")
    print(f"Categories found: {len(data['categories'])}")
    print(f"Questions found: {len(data['questions'])}")
