import requests
import json
from bs4 import BeautifulSoup
import time

def investigate_website():
    """
    Investigate tahdani.sa website structure
    """
    session = requests.Session()
    
    # Set headers to mimic browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ar,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0'
    }
    
    # Try to access the main page
    print("Accessing main page...")
    response = session.get('https://tahdani.sa/start-game', headers=headers)
    print(f"Status code: {response.status_code}")
    
    # Parse HTML
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Look for JavaScript files that might contain game logic
    scripts = soup.find_all('script', src=True)
    print("\nFound JavaScript files:")
    for script in scripts:
        print(f"- {script['src']}")
    
    # Look for any data attributes or hidden elements
    print("\nLooking for data elements...")
    data_elements = soup.find_all(attrs={"data-categories": True})
    for elem in data_elements:
        print(f"Found data-categories: {elem.get('data-categories')}")
    
    # Try to find API endpoints in inline scripts
    inline_scripts = soup.find_all('script', src=False)
    print("\nSearching for API endpoints in inline scripts...")
    for script in inline_scripts:
        if script.string:
            # Look for API URLs
            if 'api' in script.string.lower() or 'endpoint' in script.string.lower():
                print("Found potential API reference in script")
                # Extract relevant lines
                lines = script.string.split('\n')
                for line in lines:
                    if any(keyword in line.lower() for keyword in ['api', 'endpoint', 'url', 'fetch', 'axios']):
                        print(f"  {line.strip()}")

if __name__ == "__main__":
    investigate_website()