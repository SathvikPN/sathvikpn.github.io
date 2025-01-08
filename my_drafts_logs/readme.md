styles are reflected from assets/css/main.css 
# scss changes are not being reflected at the moment

root folder hosts 'pages' layour webpage.
- about.md (/about)
- archive.md (/archive) - list of all posts
- example2-archive.md (/example2-archive) - list of posts tagged with certain category only

since '.md' files donot render newlines natively in the preview,
_posts/make.sh - utility script to convert newline break(invisible) into md-recognised-newlines.

`make.sh <filename>` - interpret newline to markdown formatted newlines.