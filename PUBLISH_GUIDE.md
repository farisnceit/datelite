# 📦 NPM Publishing Guide

This guide will help you publish the Vanilla DatePicker to npm.

## 🚀 Quick Publish Steps

### 1. Update Package Information

Edit `package.json`:
```json
{
  "name": "@your-org/datelite",  // Change to your org/name
  "version": "1.0.0",
  "author": {
    "name": "Your Name",                   // Your name
    "email": "your.email@example.com",     // Your email
    "url": "https://your-website.com"      // Your website
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/datelite.git"  // Your repo
  },
  "bugs": {
    "url": "https://github.com/your-username/datelite/issues"  // Your issues
  },
  "homepage": "https://github.com/your-username/datelite#readme"  // Your homepage
}
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Build the Project

```bash
pnpm run build
```

### 4. Run Tests

```bash
pnpm test
```

### 5. Prepare for Release

```bash
node scripts/prepare-release.js
```

### 6. Login to NPM

```bash
pnpm login
```

### 7. Publish

```bash
pnpm publish
```

## 📋 Pre-Publish Checklist

- [ ] Updated package.json with your information
- [ ] Updated README.md with your package name
- [ ] All tests passing
- [ ] Code linted and formatted
- [ ] Build successful
- [ ] Bundle sizes acceptable
- [ ] Version number updated
- [ ] CHANGELOG.md updated
- [ ] Logged into npm

## 🔧 Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run serve

# Run tests
pnpm test
pnpm run test:watch

# Lint code
pnpm run lint
pnpm run lint:fix

# Format code
pnpm run format

# Build project
pnpm run build
pnpm run build:js
pnpm run build:css

# Check bundle sizes
pnpm run size

# Prepare release
node scripts/prepare-release.js

# Publish to npm
pnpm publish
```

## 📁 Package Structure

```
datelite/
├── dist/                      # Built files (published)
│   ├── datelite.js         # UMD build
│   ├── datepicker.min.js     # UMD minified
│   ├── datelite.esm.js     # ES module
│   ├── datelite.cjs.js     # CommonJS
│   ├── datelite.css        # Styles
│   └── datelite.min.css    # Minified styles
├── src/                      # Source files
│   ├── DatePicker.js         # Main component
│   └── datelite.css        # Styles with variables
├── types/                    # TypeScript definitions
│   └── index.d.ts           # Type definitions
├── tests/                    # Test files
├── package.json             # Package configuration
├── README.md                # Package documentation
└── LICENSE                  # MIT license
```

## 🎯 Package Entry Points

The package provides multiple entry points:

- **Main (UMD)**: `dist/datelite.min.js`
- **Module (ESM)**: `src/DatePicker.js`
- **Types**: `types/index.d.ts`
- **Styles**: `dist/datelite.min.css`

## 📊 Bundle Analysis

After building, check bundle sizes:

```bash
pnpm run size
```

Expected sizes:
- JavaScript: ~25KB minified
- CSS: ~15KB minified

## 🔄 Version Management

Follow [Semantic Versioning](https://semver.org/):

```bash
# Patch release (bug fixes)
pnpm version patch

# Minor release (new features)
pnpm version minor

# Major release (breaking changes)
pnpm version major
```

## 🌐 CDN Usage

After publishing, users can use via CDN:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/@your-org/datelite@latest/dist/datelite.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/@your-org/datelite@latest/dist/datelite.min.js"></script>
```

## 🔐 Security

### NPM Token Setup

1. Create npm account: https://www.npmjs.com/signup
2. Generate access token: https://www.npmjs.com/settings/tokens
3. Add to GitHub secrets as `NPM_TOKEN`

### Package Security

- No dependencies = no security vulnerabilities
- Regular security audits: `npm audit`
- Keep dev dependencies updated

## 📈 Post-Publish

### Update Documentation

1. Update README badges with correct package name
2. Update installation instructions
3. Update CDN links
4. Create GitHub release

### Promote Your Package

1. Share on social media
2. Submit to awesome lists
3. Write blog posts
4. Create demos and examples

## 🐛 Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Tests Fail:**
```bash
# Run tests in verbose mode
pnpm test -- --verbose
```

**Bundle Too Large:**
```bash
# Analyze bundle
pnpm run build
ls -la dist/
```

**Publish Fails:**
```bash
# Check pnpm login
pnpm whoami

# Check package name availability
pnpm view @your-org/datelite
```

## 📞 Support

If you encounter issues:

1. Check this guide
2. Review error messages
3. Check npm documentation
4. Ask in GitHub discussions

## 🎉 Success!

Once published, your package will be available at:
- NPM: https://www.npmjs.com/package/@your-org/datelite
- CDN: https://unpkg.com/@your-org/datelite

Congratulations on publishing your Datelite component! 🎊