# Find all .js files in dist/esm and subdirectories
find ./dist/esm -name "*.js" -type f | while read file; do
  echo "Updating $file contents..."
  sed -i '' "s/\.js'/\.mjs'/g" "$file"
  sed -i '' "s/\.js\"/\.mjs\"/g" "$file"
  sed -i '' "s/\.js;/\.mjs;/g" "$file"
  echo "Renaming $file to ${file%.js}.mjs..."
  mv "$file" "${file%.js}.mjs"
done

# Update import paths in all .mjs files
find ./dist/esm -name "*.mjs" -type f | while read file; do
  echo "Updating import paths in $file..."
  sed -i '' "s/from \"\.\/Scrollbar\"/from \"\.\/Scrollbar\/index\.mjs\"/g" "$file"
  sed -i '' "s/from '\.\/Scrollbar'/from '\.\/Scrollbar\/index\.mjs'/g" "$file"
  sed -i '' "s/from '\.\/styles'/from '\.\/styles\.mjs'/g" "$file"
  sed -i '' "s/from \"\.\/styles\"/from \"\.\/styles\.mjs\"/g" "$file"
done