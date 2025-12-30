#!/bin/bash

# Deployment script for React Photo Gallery App

echo "🚀 Preparing React Photo Gallery App for deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the application
echo "🏗️  Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output is in the 'dist' folder"
    echo ""
    echo "🌐 To deploy:"
    echo "   - Vercel: Connect your GitHub repo or drag the 'dist' folder"
    echo "   - Netlify: Drag the 'dist' folder or connect your GitHub repo"
    echo "   - Manual: Upload the contents of 'dist' folder to your hosting provider"
    echo ""
    echo "🔧 Don't forget to set environment variables in your hosting platform:"
    echo "   VITE_API_BASE_URL=https://your-api-url.com/api"
    echo "   VITE_APP_NAME=React Photo Gallery"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi