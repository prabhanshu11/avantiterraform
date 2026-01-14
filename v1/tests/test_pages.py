#!/usr/bin/env python3
"""
Selenium tests for Avanti Terraform v1 website
Takes screenshots of each page for visual verification
"""

import os
import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configuration
BASE_URL = os.environ.get("TEST_URL", "http://localhost:3000")
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), "..", "screenshots")

# Pages to test
PAGES = [
    {"path": "/", "name": "homepage", "checks": ["AVANTITERRAFORM", "Request Quote", "WhatsApp"]},
    {"path": "/services", "name": "services", "checks": ["Services", "Construction Execution", "Request Quote"]},
    {"path": "/contact", "name": "contact", "checks": ["What do you need?", "Next"]},
    {"path": "/blog", "name": "blog", "checks": ["From the field", "Waterproofing", "CRZ"]},
    {"path": "/blog/waterproofing-skills-not-just-products", "name": "blog_waterproofing", "checks": ["Waterproofing", "crystalline"]},
    {"path": "/blog/slope-construction-engineering-calculator", "name": "blog_slope", "checks": ["Slopes", "CALCULATOR"]},
    {"path": "/blog/crz-compliance-business-owner-guide", "name": "blog_crz", "checks": ["CRZ", "Maradu"]},
]


def setup_driver():
    """Create and configure Chrome driver"""
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-gpu")

    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    return driver


def take_screenshot(driver, name):
    """Take and save screenshot"""
    os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filepath = os.path.join(SCREENSHOTS_DIR, f"{name}_{timestamp}.png")
    driver.save_screenshot(filepath)
    print(f"  Screenshot saved: {filepath}")
    return filepath


def check_page_content(driver, checks):
    """Verify expected content is present"""
    page_source = driver.page_source.upper()
    results = []
    for check in checks:
        found = check.upper() in page_source
        results.append((check, found))
        status = "✓" if found else "✗"
        print(f"  {status} '{check}' {'found' if found else 'NOT FOUND'}")
    return all(r[1] for r in results)


def test_page(driver, page):
    """Test a single page"""
    print(f"\nTesting: {page['name']} ({page['path']})")

    try:
        driver.get(f"{BASE_URL}{page['path']}")

        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        time.sleep(1)  # Extra wait for dynamic content

        # Take screenshot
        take_screenshot(driver, page["name"])

        # Check content
        passed = check_page_content(driver, page["checks"])

        return passed

    except Exception as e:
        print(f"  ERROR: {e}")
        return False


def main():
    """Run all tests"""
    print("=" * 60)
    print("Avanti Terraform v1 - Selenium Tests")
    print(f"Base URL: {BASE_URL}")
    print("=" * 60)

    driver = setup_driver()

    results = []
    try:
        for page in PAGES:
            passed = test_page(driver, page)
            results.append((page["name"], passed))

    finally:
        driver.quit()

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)

    passed_count = sum(1 for _, p in results if p)
    total_count = len(results)

    for name, passed in results:
        status = "PASS" if passed else "FAIL"
        print(f"  {status}: {name}")

    print(f"\nTotal: {passed_count}/{total_count} passed")

    if passed_count == total_count:
        print("\n✓ All tests passed!")
        return 0
    else:
        print("\n✗ Some tests failed")
        return 1


if __name__ == "__main__":
    exit(main())
