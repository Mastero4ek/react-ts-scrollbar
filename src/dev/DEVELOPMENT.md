# Development Setup Guide

## 🚀 Getting Started

### 1. Clone Repository

```bash
# Clone the repository
git clone https://github.com/Mastero4ek/react-ts-scrollbar.git

# Navigate to project directory
cd react-ts-scrollbar

# Install dependencies
npm install
```

### 2. Development Environment

```bash
# Start development server
npm run dev
```

The development server will start on `http://localhost:3000` and automatically open in your browser.

## 📦 Available Scripts

### Development Commands

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start Vite development server with hot reload |
| `npm run preview` | Preview production build locally              |

### Build Commands

| Command               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `npm run build`       | Build complete NPM package (CJS + ESM + Types) |
| `npm run build:cjs`   | Build CommonJS version only                    |
| `npm run build:esm`   | Build ES Modules version only                  |
| `npm run build:types` | Generate TypeScript type definitions           |
| `npm run build:dev`   | Build demo application for GitHub Pages        |

### Utility Commands

| Command              | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `npm run clean`      | Remove all build artifacts (dist and dist-demo folders) |
| `npm run rename:esm` | Rename .js files to .mjs in ESM build                   |
| `npm run deploy`     | Build and deploy demo to GitHub Pages                   |

### Package Commands

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `npm run prepack` | Automatic build before npm pack/publish |
| `npm pack`        | Create tarball for testing              |
| `npm publish`     | Publish package to NPM registry         |

## 🏗️ Project Structure

```
react-ts-scrollbar/
├── src/
│   ├── Scrollbar/           # Main component source
│   ├── types/               # TypeScript type definitions
│   ├── dev/                 # Demo application
│   └── index.ts             # Main export file
├── dist/                    # Build output (generated)
│   ├── cjs/                 # CommonJS build
│   ├── esm/                 # ES Modules build
│   └── types/               # TypeScript types
├── scripts/                 # Build scripts
└── package.json             # Project configuration
```

## 🔧 Development Workflow

### 1. Making Changes

```bash
# Start development server
npm run dev

# Make your changes to src/Scrollbar/
# Changes will be reflected immediately in browser
```

### 2. Testing Build

```bash
# Test complete build
npm run build

# Check build output
ls -la dist/
```

### 3. Testing Demo

```bash
# Build demo application
npm run build:dev

# Preview demo locally
npm run preview
```

### 4. Git Workflow & Deployment

#### Development Branch (dev)

```bash
# Push changes to development branch
git add .
git commit -m "feat: your changes description"
git push origin dev
```

**Note**: Pushing to `dev` branch does **NOT** trigger deployment.

#### Production Deployment (main)

```bash
# Merge dev to main for production deployment
git checkout main
git merge dev
git push origin main
```

**Note**: Pushing to `main` branch **automatically triggers**:

- GitHub Actions workflow
- Demo build and deployment to GitHub Pages
- Live demo update at: https://mastero4ek.github.io/react-ts-scrollbar/

#### Workflow Summary

| Branch | Push Action            | Result                                |
| ------ | ---------------------- | ------------------------------------- |
| `dev`  | `git push origin dev`  | ✅ Code updated, no deployment        |
| `main` | `git push origin main` | ✅ Code updated + 🚀 Auto-deploy demo |

#### Deployment Process

When you push to `main`, GitHub Actions automatically:

1. **Builds** the demo application (`npm run build:dev`)
2. **Deploys** to GitHub Pages branch (`gh-pages`)
3. **Updates** the live demo website
4. **Notifies** via workflow status

You can monitor deployment progress in the **Actions** tab of your GitHub repository.

## 📋 Prerequisites

- **Node.js**: >= 14.0.0
- **npm**: Latest version
- **Git**: For version control

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

#### Build Errors

```bash
# Clean and rebuild
npm run clean
npm run build
```

#### Dependencies Issues

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

# NPM Publishing Guide

### 1. Preparation for Publishing

#### 1.1 Check Changes

```bash
# Check git status
git status

# View changes
git diff
```

#### 1.2 Commit Changes

```bash
# Add all changes
git add .

# Create commit with descriptive message
git commit -m "feat: added new props barTransition and thumbTransition"

# Push changes to repository
git push origin dev
```

### 2. Version Update

#### 2.1 Automatic Update (Recommended)

```bash
# Update patch version (1.0.0 → 1.0.1) - bug fixes, backward compatible
npm version patch

# Update minor version (1.0.0 → 1.1.0) - new functionality, backward compatible
npm version minor

# Update major version (1.0.0 → 2.0.0) - breaking API changes
npm version major
```

#### 2.2 Manual Update

```bash
# Edit package.json manually
# "version": "1.2.0"

# Commit version changes
git add package.json
git commit -m "chore: bump version to 1.2.0"
```

### 3. Package Build

#### 3.1 Automatic Build

```bash
# Build runs automatically via prepack hook
npm run build
```

#### 3.2 Build Verification

```bash
# Check package contents without publishing
npm pack --dry-run

# Ensure all files are included
ls -la dist/
```

### 4. NPM Publishing

#### 4.1 Authentication Check

```bash
# Check current user
npm whoami

# If not authenticated, login
npm login
```

#### 4.2 Publishing

```bash
# Publish package
npm publish

# Publish with specific tag
npm publish --tag beta
```

### 5. Git Tags Creation

#### 5.1 Create Tag

```bash
# Create tag for current version
git tag v1.2.0

# Push tags to repository
git push origin dev --tags
```

### 6. Publishing Verification

#### 6.1 NPM Check

```bash
# Check current package version
npm view react-typescript-scrollbar version

# View package information
npm view react-typescript-scrollbar

# View all versions
npm view react-typescript-scrollbar versions
```

#### 6.2 Installation Testing

```bash
# Create test folder
mkdir test-install
cd test-install

# Install package
npm init -y
npm install react-typescript-scrollbar

# Verify package installation
ls node_modules/react-typescript-scrollbar/
```

## 🔧 Useful Commands

### Debugging

```bash
# View npm logs
npm config get registry

# Clear npm cache
npm cache clean --force

# Check access permissions
npm access ls-packages
```

## ⚠️ Important Notes

### Files for Publishing

Make sure `package.json` has correct settings:

```json
{
	"files": ["dist", "README.md"],
	"main": "./dist/cjs/index.js",
	"module": "./dist/esm/index.mjs",
	"types": "./dist/types/index.d.ts"
}
```

## 🚨 Troubleshooting

### "Invalid version" Error

```bash
# Ensure version follows semver
# Correct: "1.2.0"
# Incorrect: "1.2"
```

### "Package already exists" Error

```bash
# Update version in package.json
npm version patch
```

### Authentication Error

```bash
# Login to npm
npm login

# Check access permissions
npm access ls-packages
```

## 📚 Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm publish](https://docs.npmjs.com/cli/v8/commands/npm-publish)
