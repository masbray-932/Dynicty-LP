#!/usr/bin/env python3
"""
Backend API Testing for DYNICTY Landing Page
Tests all /api/leads/* endpoints and stats
"""
import requests
import sys
from datetime import datetime
import json

class DynictyAPITester:
    def __init__(self, base_url="https://landing-vault-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_result(self, test_name, passed, details=""):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            status = "✅ PASS"
        else:
            status = "❌ FAIL"
        
        result = {
            "test": test_name,
            "passed": passed,
            "details": details
        }
        self.test_results.append(result)
        print(f"{status} - {test_name}")
        if details:
            print(f"   Details: {details}")

    def test_health(self):
        """Test health endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            passed = response.status_code == 200
            details = f"Status: {response.status_code}"
            if passed:
                data = response.json()
                details += f", Response: {data}"
            self.log_result("Health Check", passed, details)
            return passed
        except Exception as e:
            self.log_result("Health Check", False, f"Error: {str(e)}")
            return False

    def test_stats_endpoint(self):
        """Test GET /api/leads/stats returns 4 counter numbers"""
        try:
            response = requests.get(f"{self.base_url}/api/leads/stats", timeout=10)
            passed = response.status_code == 200
            
            if passed:
                data = response.json()
                required_fields = ["websites_created", "active_tenants", "deployments", "customers"]
                has_all_fields = all(field in data for field in required_fields)
                all_positive = all(isinstance(data.get(field), int) and data.get(field) > 0 for field in required_fields)
                
                if has_all_fields and all_positive:
                    details = f"All 4 counters present and positive: {data}"
                    self.log_result("GET /api/leads/stats", True, details)
                    return True
                else:
                    details = f"Missing fields or non-positive values: {data}"
                    self.log_result("GET /api/leads/stats", False, details)
                    return False
            else:
                self.log_result("GET /api/leads/stats", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("GET /api/leads/stats", False, f"Error: {str(e)}")
            return False

    def test_free_trial_valid(self):
        """Test POST /api/leads/free-trial with valid payload"""
        timestamp = datetime.now().strftime("%H%M%S")
        payload = {
            "nama": "Test User",
            "email": f"test{timestamp}@example.com",
            "bisnis": "Test Business",
            "telepon": "+62812345678"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/leads/free-trial",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            passed = response.status_code == 200
            if passed:
                data = response.json()
                has_id = "id" in data
                has_message = "message" in data
                if has_id and has_message:
                    details = f"Lead created successfully with ID: {data.get('id')}"
                    self.log_result("POST /api/leads/free-trial (valid)", True, details)
                    return True
                else:
                    details = f"Missing id or message in response: {data}"
                    self.log_result("POST /api/leads/free-trial (valid)", False, details)
                    return False
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                self.log_result("POST /api/leads/free-trial (valid)", False, details)
                return False
        except Exception as e:
            self.log_result("POST /api/leads/free-trial (valid)", False, f"Error: {str(e)}")
            return False

    def test_free_trial_invalid_email(self):
        """Test POST /api/leads/free-trial with invalid email returns 422"""
        payload = {
            "nama": "Test User",
            "email": "invalid-email",
            "bisnis": "Test Business",
            "telepon": "+62812345678"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/leads/free-trial",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            passed = response.status_code == 422
            details = f"Status: {response.status_code}"
            self.log_result("POST /api/leads/free-trial (invalid email)", passed, details)
            return passed
        except Exception as e:
            self.log_result("POST /api/leads/free-trial (invalid email)", False, f"Error: {str(e)}")
            return False

    def test_free_trial_short_nama(self):
        """Test POST /api/leads/free-trial with short nama returns 422"""
        timestamp = datetime.now().strftime("%H%M%S")
        payload = {
            "nama": "A",  # Too short (min 2)
            "email": f"test{timestamp}@example.com",
            "bisnis": "Test Business",
            "telepon": "+62812345678"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/leads/free-trial",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            passed = response.status_code == 422
            details = f"Status: {response.status_code}"
            self.log_result("POST /api/leads/free-trial (short nama)", passed, details)
            return passed
        except Exception as e:
            self.log_result("POST /api/leads/free-trial (short nama)", False, f"Error: {str(e)}")
            return False

    def test_newsletter_valid(self):
        """Test POST /api/leads/newsletter with valid email"""
        timestamp = datetime.now().strftime("%H%M%S%f")
        payload = {
            "email": f"newsletter{timestamp}@example.com"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/leads/newsletter",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            passed = response.status_code == 200
            if passed:
                data = response.json()
                details = f"Newsletter subscription successful: {data.get('message')}"
                self.log_result("POST /api/leads/newsletter (valid)", True, details)
                return True
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                self.log_result("POST /api/leads/newsletter (valid)", False, details)
                return False
        except Exception as e:
            self.log_result("POST /api/leads/newsletter (valid)", False, f"Error: {str(e)}")
            return False

    def test_newsletter_duplicate(self):
        """Test POST /api/leads/newsletter with duplicate email"""
        # Use a fixed email to test duplicate
        payload = {
            "email": "duplicate-test@example.com"
        }
        
        try:
            # First submission
            response1 = requests.post(
                f"{self.base_url}/api/leads/newsletter",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Second submission (duplicate)
            response2 = requests.post(
                f"{self.base_url}/api/leads/newsletter",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            passed = response2.status_code == 200
            if passed:
                data = response2.json()
                message = data.get("message", "").lower()
                has_duplicate_msg = "sudah terdaftar" in message or "terdaftar" in message
                if has_duplicate_msg:
                    details = f"Duplicate handling correct: {data.get('message')}"
                    self.log_result("POST /api/leads/newsletter (duplicate)", True, details)
                    return True
                else:
                    details = f"Expected 'sudah terdaftar' message, got: {data.get('message')}"
                    self.log_result("POST /api/leads/newsletter (duplicate)", False, details)
                    return False
            else:
                details = f"Status: {response2.status_code}"
                self.log_result("POST /api/leads/newsletter (duplicate)", False, details)
                return False
        except Exception as e:
            self.log_result("POST /api/leads/newsletter (duplicate)", False, f"Error: {str(e)}")
            return False

    def test_contact_valid(self):
        """Test POST /api/leads/contact with valid payload"""
        timestamp = datetime.now().strftime("%H%M%S")
        payload = {
            "nama": "Test Contact",
            "email": f"contact{timestamp}@example.com",
            "pesan": "This is a test message for contact form"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/leads/contact",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            passed = response.status_code == 200
            if passed:
                data = response.json()
                details = f"Contact form submitted successfully: {data.get('message')}"
                self.log_result("POST /api/leads/contact (valid)", True, details)
                return True
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                self.log_result("POST /api/leads/contact (valid)", False, details)
                return False
        except Exception as e:
            self.log_result("POST /api/leads/contact (valid)", False, f"Error: {str(e)}")
            return False

    def test_contact_invalid_email(self):
        """Test POST /api/leads/contact with invalid email returns 422"""
        payload = {
            "nama": "Test Contact",
            "email": "invalid-email-format",
            "pesan": "This is a test message"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/leads/contact",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            passed = response.status_code == 422
            details = f"Status: {response.status_code}"
            self.log_result("POST /api/leads/contact (invalid email)", passed, details)
            return passed
        except Exception as e:
            self.log_result("POST /api/leads/contact (invalid email)", False, f"Error: {str(e)}")
            return False

    def test_contact_honeypot(self):
        """Test POST /api/leads/contact with honeypot returns 200 but silently discards"""
        timestamp = datetime.now().strftime("%H%M%S")
        payload = {
            "nama": "Spam Bot Contact",
            "email": f"spamcontact{timestamp}@example.com",
            "pesan": "This is spam",
            "honeypot": "filled-by-bot"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/leads/contact",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            passed = response.status_code == 200
            if passed:
                data = response.json()
                details = f"Honeypot accepted silently: {data.get('message')}"
                self.log_result("POST /api/leads/contact (honeypot)", True, details)
                return True
            else:
                details = f"Status: {response.status_code}"
                self.log_result("POST /api/leads/contact (honeypot)", False, details)
                return False
        except Exception as e:
            self.log_result("POST /api/leads/contact (honeypot)", False, f"Error: {str(e)}")
            return False

    def test_honeypot_handling(self):
        """Test honeypot field is accepted without saving spam"""
        timestamp = datetime.now().strftime("%H%M%S")
        payload = {
            "nama": "Spam Bot",
            "email": f"spam{timestamp}@example.com",
            "bisnis": "Spam Business",
            "telepon": "+62812345678",
            "honeypot": "spam-value"  # Bot filled this
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/leads/free-trial",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 200 but silently discard
            passed = response.status_code == 200
            if passed:
                data = response.json()
                details = f"Honeypot accepted silently: {data.get('message')}"
                self.log_result("Honeypot handling", True, details)
                return True
            else:
                details = f"Status: {response.status_code}"
                self.log_result("Honeypot handling", False, details)
                return False
        except Exception as e:
            self.log_result("Honeypot handling", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("\n" + "="*60)
        print("DYNICTY BACKEND API TESTS")
        print("="*60 + "\n")
        
        # Test health first
        if not self.test_health():
            print("\n⚠️  Health check failed. Backend may not be running.")
            print("Continuing with other tests...\n")
        
        # Run all lead endpoint tests
        self.test_stats_endpoint()
        self.test_free_trial_valid()
        self.test_free_trial_invalid_email()
        self.test_free_trial_short_nama()
        self.test_newsletter_valid()
        self.test_newsletter_duplicate()
        self.test_contact_valid()
        self.test_contact_invalid_email()
        self.test_contact_honeypot()
        self.test_honeypot_handling()
        
        # Print summary
        print("\n" + "="*60)
        print(f"SUMMARY: {self.tests_passed}/{self.tests_run} tests passed")
        print("="*60 + "\n")
        
        return self.tests_passed == self.tests_run

def main():
    tester = DynictyAPITester()
    success = tester.run_all_tests()
    
    # Save results to JSON for reference
    results = {
        "timestamp": datetime.now().isoformat(),
        "total_tests": tester.tests_run,
        "passed": tester.tests_passed,
        "failed": tester.tests_run - tester.tests_passed,
        "success_rate": f"{(tester.tests_passed/tester.tests_run*100):.1f}%",
        "test_results": tester.test_results
    }
    
    with open("/app/backend_test_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"📄 Detailed results saved to /app/backend_test_results.json\n")
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
