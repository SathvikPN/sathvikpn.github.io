#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 1 ]; then
          echo "Usage: $0 <file>"
            exit 1
            fi

# Input file
file="$1"

# Check if the file exists
if [ ! -f "$file" ]; then
          echo "Error: File '$file' does not exist."
            exit 1
            fi

# Replace newlines with Markdown-supported newlines
# Add "  " (two spaces) before each newline
sed -i.bak ':a;N;$!ba;s/\n/  \n/g' "$file"

echo "Newlines in '$file' have been replaced with Markdown-supported newlines."
echo "A backup of the original file is saved as '$file.bak'."

