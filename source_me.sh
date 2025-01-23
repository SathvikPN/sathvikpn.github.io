#!/bin/sh

# paths 
POST_DIR="_posts"

# vso <filename>  open file in vscode window
function vso {
    code -r ${1}
}

# nfile <filename>  create a file formatted for posting
function nfile {
    # Get today's date in the desired format
    today=$(date +"%Y-%m-%d")
    
    # Create the new filename with the provided argument
    filename="${today}-${1}.md"
    file=${POST_DIR}/${filename}

    # Output the new filename
    echo "open $file ..."
    vso $file
}

function cleanup(){
    ls *.bak && read -p "Do you want to delete these files? (y/n): " confirm && [[ $confirm == [yY] ]] && rm *.bak
}

# replaces newline with markdown compatible newline
function nmake(){
    # Check if the correct number of arguments is provided
    if [ "$#" -ne 1 ]; then
        echo "Usage: $FUNCNAME[0] <file>"
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
}