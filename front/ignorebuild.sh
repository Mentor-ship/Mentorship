#!/bin/bash

# Retrieve branch name
branch=$(git branch --show-current)

if [[ $branch == *"docs"* ]]; then
  # Don't build
    exit 0;
else
  # Check if this is happening in the mobile folder
  result=$(git diff HEAD^ HEAD --quiet .)
  
  if [ result ]; then
  # Proceed with build
    echo 1;
  else
  # Don't build
    echo 0;
  fi
fi