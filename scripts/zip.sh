#!/usr/bin/env bash

PROJECT_NAME=$(basename "$PWD")
ZIP_NAME="${PROJECT_NAME}_review.zip"

zip -r "$ZIP_NAME" . \
  -x "node_modules/*" \
  -x "dist/*" \
  -x "build/*" \
  -x ".next/*" \
  -x ".git/*" \
  -x ".DS_Store" \
  -x "**/.DS_Store" \
  -x "*.log" \
  -x "coverage/*" \
  -x ".env" \
  -x ".env.*" \
  -x "npm-debug.log*" \
  -x "yarn-error.log*" \
  -x ".turbo/*" \
  -x ".cache/*"

echo "Created $ZIP_NAME"
