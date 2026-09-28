#!/bin/sh
# Minify all JS/MJS files under a directory (in-place via terser).
# Usage: sh ./scripts/minify-js.sh <dir> <ext>
#   e.g. sh ./scripts/minify-js.sh ./dist/cjs .js
set -e

DIR=${1:?directory required}
EXT=${2:?extension required}

find "$DIR" -type f -name "*$EXT" | while IFS= read -r f; do
	terser "$f" -o "$f" --compress --mangle
done
