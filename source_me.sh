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
