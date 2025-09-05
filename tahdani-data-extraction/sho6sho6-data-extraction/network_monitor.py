
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
