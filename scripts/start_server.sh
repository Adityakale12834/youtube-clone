#!/bin/bash
# Install serve if not already installed
npm install -g serve
# Start serve in background
nohup serve -s /var/www/react-app -l 3000 > /var/log/react-app.log 2>&1 &
