#!/bin/bash

echo "Building FAQ System Docker Images..."

echo "Building backend image..."
docker build -t faq-backend ./backend

echo "Starting services with docker-compose..."
docker-compose up -d

echo ""
echo "FAQ System is running!"
echo "  Frontend: http://localhost:1902"
echo "  Backend API: http://localhost:1903"
echo ""
echo "Default login: admin / admin123"
