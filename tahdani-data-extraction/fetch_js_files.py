import requests
import re
import json

def fetch_js_content():
    """
    Fetch and analyze JavaScript files from tahdani.sa
    """
    session = requests.Session()
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': '*/*',
        'Accept-Language': 'ar,en;q=0.5',
        'Referer': 'https://tahdani.sa/'
    }
    
    # List of JS files to check
    js_files = [
        'https://tahdani.sa/js/main.js',
        'https://tahdani.sa/js/auth.js',
        'https://tahdani.sa/js/plans.js'
    ]
    
    for js_url in js_files:
        print(f"\n{'='*50}")
        print(f"Fetching: {js_url}")
        print('='*50)
        
        try:
            response = session.get(js_url, headers=headers)
            if response.status_code == 200:
                content = response.text
                
                # Look for API endpoints
                api_patterns = [
                    r'["\']\/api\/[^"\']*["\']',
                    r'fetch\s*\(["\'][^"\']+["\']',
                    r'axios\.[get|post|put|delete]+\s*\(["\'][^"\']+["\']',
                    r'url:\s*["\'][^"\']+["\']',
                    r'endpoint["\']?\s*[:=]\s*["\'][^"\']+["\']',
                    r'["\']\/[^"\']*\/(questions?|categories?|game)[^"\']*["\']'
                ]
                
                print("\nPotential API endpoints found:")
                found_endpoints = set()
                
                for pattern in api_patterns:
                    matches = re.findall(pattern, content, re.IGNORECASE)
                    for match in matches:
                        cleaned = re.sub(r'["\']', '', match)
                        cleaned = re.sub(r'(fetch|axios\.[get|post|put|delete]+)\s*\(', '', cleaned)
                        cleaned = re.sub(r'(url|endpoint)["\']?\s*[:=]\s*', '', cleaned)
                        if cleaned and not cleaned.startswith('//'):
                            found_endpoints.add(cleaned)
                
                for endpoint in sorted(found_endpoints):
                    print(f"  - {endpoint}")
                
                # Look for game-related functions
                print("\nGame-related functions:")
                game_patterns = [
                    r'function\s+\w*[Gg]ame\w*\s*\(',
                    r'function\s+\w*[Qq]uestion\w*\s*\(',
                    r'function\s+\w*[Cc]ategor\w*\s*\(',
                    r'\w*[Gg]ame\w*\s*[:=]\s*function',
                    r'\w*[Qq]uestion\w*\s*[:=]\s*function',
                    r'\w*[Cc]ategor\w*\s*[:=]\s*function'
                ]
                
                for pattern in game_patterns:
                    matches = re.findall(pattern, content)
                    for match in matches:
                        print(f"  - {match}")
                
                # Save content for detailed analysis
                filename = js_url.split('/')[-1]
                with open(f"{filename}", 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"\nSaved content to {filename}")
                
            else:
                print(f"Failed to fetch: {response.status_code}")
                
        except Exception as e:
            print(f"Error fetching {js_url}: {e}")

if __name__ == "__main__":
    fetch_js_content()