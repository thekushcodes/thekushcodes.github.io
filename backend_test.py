#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import time

class PortfolioAPITester:
    def __init__(self, base_url="https://free-or-not-17.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details="", response_data=None):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    Details: {details}")
        if not success and response_data:
            print(f"    Response: {response_data}")
        print()

    def test_health_check(self):
        """Test the health check endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "running" in data["message"]:
                    self.log_test(
                        "Health Check Endpoint", 
                        True, 
                        f"Status: {response.status_code}, Message: {data['message']}"
                    )
                    return True
                else:
                    self.log_test(
                        "Health Check Endpoint", 
                        False, 
                        f"Unexpected response format", 
                        data
                    )
                    return False
            else:
                self.log_test(
                    "Health Check Endpoint", 
                    False, 
                    f"Expected 200, got {response.status_code}", 
                    response.text
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Health Check Endpoint", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "This is a test message for the portfolio contact form."
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact", 
                json=test_data, 
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "name", "email", "subject", "message", "timestamp"]
                
                if all(field in data for field in required_fields):
                    self.log_test(
                        "Contact Form Submission", 
                        True, 
                        f"Message created with ID: {data.get('id', 'N/A')}"
                    )
                    return data["id"]
                else:
                    missing_fields = [f for f in required_fields if f not in data]
                    self.log_test(
                        "Contact Form Submission", 
                        False, 
                        f"Missing fields: {missing_fields}", 
                        data
                    )
                    return None
            else:
                self.log_test(
                    "Contact Form Submission", 
                    False, 
                    f"Expected 200, got {response.status_code}", 
                    response.text
                )
                return None
                
        except Exception as e:
            self.log_test(
                "Contact Form Submission", 
                False, 
                f"Request failed: {str(e)}"
            )
            return None

    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        invalid_test_cases = [
            {
                "name": "Missing Name",
                "data": {"email": "test@example.com", "subject": "Test", "message": "Test message"},
                "expected_error": "name"
            },
            {
                "name": "Invalid Email",
                "data": {"name": "Test", "email": "invalid-email", "subject": "Test", "message": "Test message"},
                "expected_error": "email"
            },
            {
                "name": "Missing Subject",
                "data": {"name": "Test", "email": "test@example.com", "message": "Test message"},
                "expected_error": "subject"
            },
            {
                "name": "Missing Message",
                "data": {"name": "Test", "email": "test@example.com", "subject": "Test"},
                "expected_error": "message"
            }
        ]
        
        validation_passed = 0
        for test_case in invalid_test_cases:
            try:
                response = requests.post(
                    f"{self.api_url}/contact", 
                    json=test_case["data"], 
                    timeout=10
                )
                
                # Should return 422 for validation errors
                if response.status_code == 422:
                    validation_passed += 1
                    self.log_test(
                        f"Validation - {test_case['name']}", 
                        True, 
                        f"Correctly rejected with status {response.status_code}"
                    )
                else:
                    self.log_test(
                        f"Validation - {test_case['name']}", 
                        False, 
                        f"Expected 422, got {response.status_code}", 
                        response.text
                    )
                    
            except Exception as e:
                self.log_test(
                    f"Validation - {test_case['name']}", 
                    False, 
                    f"Request failed: {str(e)}"
                )
        
        return validation_passed == len(invalid_test_cases)

    def test_get_contact_messages(self):
        """Test retrieving contact messages"""
        try:
            response = requests.get(f"{self.api_url}/contact", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(
                        "Get Contact Messages", 
                        True, 
                        f"Retrieved {len(data)} messages"
                    )
                    return True
                else:
                    self.log_test(
                        "Get Contact Messages", 
                        False, 
                        "Response is not a list", 
                        data
                    )
                    return False
            else:
                self.log_test(
                    "Get Contact Messages", 
                    False, 
                    f"Expected 200, got {response.status_code}", 
                    response.text
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Get Contact Messages", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = requests.options(f"{self.api_url}/contact", timeout=10)
            
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            present_headers = [h for h in cors_headers if h in response.headers]
            
            if len(present_headers) >= 2:  # At least origin and methods should be present
                self.log_test(
                    "CORS Headers", 
                    True, 
                    f"Found headers: {present_headers}"
                )
                return True
            else:
                self.log_test(
                    "CORS Headers", 
                    False, 
                    f"Missing CORS headers. Found: {present_headers}"
                )
                return False
                
        except Exception as e:
            self.log_test(
                "CORS Headers", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False

    def test_email_functionality(self):
        """Test email sending functionality by submitting a contact form"""
        test_data = {
            "name": "Email Test User",
            "email": "emailtest@example.com",
            "subject": "Email Functionality Test",
            "message": "This is a test to verify that emails are being sent via Mailgun integration."
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact", 
                json=test_data, 
                timeout=20  # Longer timeout for email sending
            )
            
            if response.status_code == 200:
                # Wait a moment for email processing
                time.sleep(2)
                self.log_test(
                    "Email Functionality", 
                    True, 
                    "Contact form submitted successfully (email should be sent)"
                )
                return True
            else:
                self.log_test(
                    "Email Functionality", 
                    False, 
                    f"Contact form submission failed with status {response.status_code}", 
                    response.text
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Email Functionality", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Portfolio Backend API Tests")
        print("=" * 50)
        print()
        
        # Test health check first
        if not self.test_health_check():
            print("❌ Health check failed. Stopping tests.")
            return False
        
        # Test contact form functionality
        contact_id = self.test_contact_form_submission()
        
        # Test form validation
        self.test_contact_form_validation()
        
        # Test getting contact messages
        self.test_get_contact_messages()
        
        # Test CORS headers
        self.test_cors_headers()
        
        # Test email functionality
        self.test_email_functionality()
        
        # Print summary
        print("=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        success_rate = (self.tests_passed / self.tests_run) * 100 if self.tests_run > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 80:
            print("🎉 Backend tests mostly successful!")
        elif success_rate >= 60:
            print("⚠️  Backend has some issues that need attention")
        else:
            print("🚨 Backend has significant issues")
        
        return success_rate >= 80

def main():
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0,
                "timestamp": datetime.now().isoformat()
            },
            "test_results": tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())