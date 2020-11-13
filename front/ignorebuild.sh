#!/bin/bash

# Retrieve branch name
branch=$(git branch --show-current)

if [[ $branch == *"docs"* ]]; then
  # Don't build
  exit 0;
else
  # Check if this is happening in the mobile folder
  git diff HEAD^ HEAD --quiet .;
  exit $?;
fi