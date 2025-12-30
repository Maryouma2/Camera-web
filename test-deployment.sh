#!/bin/bash

# Test script for deployed React Photo Gallery App

echo "🧪 Testing React Photo Gallery App deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test URL
test_url() {
    local url=$1
    local expected_code=$2
    local description=$3

    echo -n "Testing $description... "

    if curl -s --head --fail "$url" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
    else
        echo -e "${RED}❌ FAIL${NC}"
        echo "  URL: $url"
    fi
}

# Check if URL is provided
if [ $# -eq 0 ]; then
    echo -e "${YELLOW}Usage: $0 <deployed-url>${NC}"
    echo "Example: $0 https://my-app.vercel.app"
    exit 1
fi

DEPLOYED_URL=$1
echo "Testing deployment at: $DEPLOYED_URL"
echo "========================================"

# Test main routes
test_url "$DEPLOYED_URL" 200 "Home page"
test_url "$DEPLOYED_URL/login" 200 "Login page"
test_url "$DEPLOYED_URL/signup" 200 "Signup page"
test_url "$DEPLOYED_URL/gallery" 200 "Gallery page (should redirect to login if not authenticated)"

# Test static assets
test_url "$DEPLOYED_URL/assets/index-C7xhXxS8.css" 200 "CSS bundle"
test_url "$DEPLOYED_URL/assets/index-BnD9bjKj.js" 200 "JS bundle"

echo ""
echo -e "${YELLOW}Manual Testing Checklist:${NC}"
echo "1. ✅ Visit the home page - should show login prompt or dashboard"
echo "2. ✅ Try accessing /gallery without login - should redirect to /login"
echo "3. ✅ Login with any email/password - should redirect to home"
echo "4. ✅ Access gallery - should show photo grid"
echo "5. ✅ Test search functionality"
echo "6. ✅ Test edit/delete modals"
echo "7. ✅ Check responsive design on mobile"
echo "8. ✅ Verify all buttons have the gradient styling"
echo ""
echo -e "${GREEN}If all tests pass, your deployment is successful! 🎉${NC}"