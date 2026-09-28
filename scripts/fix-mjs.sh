#!/usr/bin/env sh
set -eu

# Portable in-place sed (GNU + BSD)
sed_i() {
	_expr=$1
	_file=$2
	_tmp="${_file}.tmp"
	sed "$_expr" "$_file" > "$_tmp"
	mv "$_tmp" "$_file"
}

# Find all .js files in dist/esm and subdirectories
find ./dist/esm -name "*.js" -type f | while IFS= read -r file; do
	echo "Updating $file contents..."
	sed_i "s/\.js'/\.mjs'/g" "$file"
	sed_i "s/\.js\"/\.mjs\"/g" "$file"
	sed_i "s/\.js;/\.mjs;/g" "$file"
	echo "Renaming $file to ${file%.js}.mjs..."
	mv "$file" "${file%.js}.mjs"
done

# Update import paths in all .mjs files for Node ESM (explicit extensions)
find ./dist/esm -name "*.mjs" -type f | while IFS= read -r file; do
	echo "Updating import paths in $file..."
	# Directory barrel → index
	sed_i 's|from "\./Scrollbar"|from "./Scrollbar/index"|g' "$file"
	sed_i "s|from '\./Scrollbar'|from './Scrollbar/index'|g" "$file"
	# Append .mjs to remaining relative imports that have no extension yet
	sed_i "s|from '\(\.\./[^']*\)'|from '\1.mjs'|g" "$file"
	sed_i 's|from "\(\.\./[^"]*\)"|from "\1.mjs"|g' "$file"
	sed_i "s|from '\(\./[^']*\)'|from '\1.mjs'|g" "$file"
	sed_i 's|from "\(\./[^"]*\)"|from "\1.mjs"|g' "$file"
	# Undo double extension if any
	sed_i "s|\.mjs\.mjs'|\.mjs'|g" "$file"
	sed_i 's|\.mjs\.mjs"|\.mjs"|g' "$file"
done
