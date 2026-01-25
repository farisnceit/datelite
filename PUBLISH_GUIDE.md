# 📦 Publishing Guide

Complete guide for publishing DateLite to NPM and maintaining the package.

## Prerequisites

Before publishing, ensure you have:

- ✅ NPM account ([Sign up here](https://www.npmjs.com/signup))
- ✅ Git repository set up
- ✅ Node.js and NPM installed
- ✅ Package tested locally
- ✅ All files ready for distribution

## Pre-Publishing Checklist

### 1. Update Version

Update version in `package.json`:

```json
{
  "version": "1.0.0"
}
```

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes, backward compatible

### 2. Update CHANGELOG.md

Document all changes:

```markdown
## [1.0.0] - 2026-01-06

### Added

- Initial release
- Single, range, and multiple date selection
- Comprehensive date blocking options

### Changed

- Updated styling system

### Fixed

- Position calculation bug
```

### 3. Build Distribution Files

```bash
# Install dependencies
npm install

# Build all files
npm run build

# This creates:
# - dist/datelite.js
# - dist/datelite.min.js
# - dist/datelite.css
# - dist/datelite.min.css
```

### 4. Test the Package

```bash
# Test locally
npm link

# In another project
npm link @farisnceit/datelite

# Test the package
```

### 5. Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

Review the output to ensure only necessary files are included.

### 6. Update Documentation

Ensure all documentation is current:

- ✅ README.md
- ✅ QUICK_START.md
- ✅ DEVELOPER_GUIDE.md
- ✅ examples/documentation.html

## Publishing to NPM

### First Time Setup

1. **Login to NPM**

```bash
npm login
```

Enter your credentials:

- Username
- Password
- Email
- 2FA code (if enabled)

2. **Verify Login**

```bash
npm whoami
```

### Publishing

#### 1. Publish Public Package

```bash
npm publish --access public
```

#### 2. Verify Publication

Check on NPM:

```
https://www.npmjs.com/package/@farisnceit/datelite
```

#### 3. Test Installation

```bash
npm install @farisnceit/datelite
```

## Post-Publishing Tasks

### 1. Create Git Tag

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 2. Create GitHub Release

1. Go to GitHub repository
2. Click "Releases" → "Create a new release"
3. Select the tag (v1.0.0)
4. Add release notes from CHANGELOG.md
5. Attach distribution files (optional)
6. Publish release

### 3. Update Documentation Site

If you have a documentation site:

```bash
# Build docs
npm run build:docs

# Deploy to GitHub Pages
npm run deploy:docs
```

## Package.json Configuration

Ensure your `package.json` is properly configured:

```json
{
  "name": "@farisnceit/datelite",
  "version": "1.0.0",
  "description": "A modern, lightweight date picker component",
  "main": "dist/datelite.min.js",
  "module": "dist/datelite.js",
  "style": "dist/datelite.min.css",
  "types": "types/index.d.ts",

  "files": ["dist", "src", "types", "README.md", "LICENSE"],

  "keywords": [
    "datepicker",
    "date-picker",
    "calendar",
    "date-range",
    "vanilla-js",
    "javascript",
    "date-selection",
    "datetime-picker"
  ],

  "author": "FarizBytes <support@farizbytes.com>",
  "license": "MIT",

  "repository": {
    "type": "git",
    "url": "https://github.com/farizbytes/datelite.git"
  },

  "bugs": {
    "url": "https://github.com/farizbytes/datelite/issues"
  },

  "homepage": "https://github.com/farizbytes/datelite#readme"
}
```

## Files to Include

### Essential Files

```
datelite/
├── dist/                 # Built files (required)
│   ├── datelite.js
│   ├── datelite.min.js
│   ├── datelite.css
│   └── datelite.min.css
├── src/                  # Source files (optional)
│   ├── DatePicker.js
│   └── datelite.css
├── types/                # TypeScript definitions (if available)
│   └── index.d.ts
├── README.md            # Package documentation
├── LICENSE              # License file
├── CHANGELOG.md         # Version history
└── package.json         # Package configuration
```

### .npmignore

Create `.npmignore` to exclude unnecessary files:

```
# Development files
node_modules/
.git/
.github/
.vscode/

# Examples and tests
examples/
tests/
*.test.js

# Build configuration
rollup.config.js
postcss.config.js
.eslintrc.js
.prettierrc

# Documentation (keep README.md)
DEVELOPER_GUIDE.md
PUBLISH_GUIDE.md
CONTRIBUTING.md

# Misc
.DS_Store
*.log
.env
```

## Version Management

### Updating Versions

Use NPM version commands:

```bash
# Patch release (1.0.0 → 1.0.1)
npm version patch

# Minor release (1.0.0 → 1.1.0)
npm version minor

# Major release (1.0.0 → 2.0.0)
npm version major
```

This automatically:

- Updates `package.json`
- Creates a git commit
- Creates a git tag

### Publishing Updates

```bash
# Build
npm run build

# Publish
npm publish

# Push tags
git push --tags
```

## Beta/Alpha Releases

### Publishing Beta Version

```bash
# Update version
npm version 1.1.0-beta.0

# Publish with tag
npm publish --tag beta

# Users install with:
npm install @farisnceit/datelite@beta
```

### Publishing Alpha Version

```bash
npm version 1.2.0-alpha.0
npm publish --tag alpha
```

### Promoting to Latest

```bash
# Make beta the latest
npm dist-tag add @farisnceit/datelite@1.1.0-beta.0 latest
```

## Unpublishing

⚠️ **Warning**: Unpublishing is discouraged and has restrictions.

### Unpublish Specific Version

```bash
npm unpublish @farisnceit/datelite@1.0.0
```

### Unpublish Entire Package

```bash
npm unpublish @farisnceit/datelite --force
```

**Note**: You can only unpublish within 72 hours of publishing.

## Deprecating Versions

Instead of unpublishing, deprecate old versions:

```bash
npm deprecate @farisnceit/datelite@1.0.0 "Please upgrade to 1.1.0"
```

## CDN Distribution

After publishing to NPM, your package is automatically available on CDNs:

### jsDelivr

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@farisnceit/datelite/dist/datelite.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@farisnceit/datelite/dist/datelite.min.js"></script>
```

### unpkg

```html
<link rel="stylesheet" href="https://unpkg.com/@farisnceit/datelite/dist/datelite.min.css" />
<script src="https://unpkg.com/@farisnceit/datelite/dist/datelite.min.js"></script>
```

## Monitoring

### NPM Statistics

Check package stats:

- Downloads: `https://npm-stat.com/charts.html?package=@farisnceit/datelite`
- NPM page: `https://www.npmjs.com/package/@farisnceit/datelite`

### Bundle Size

Monitor bundle size:

- Bundlephobia: `https://bundlephobia.com/package/@farisnceit/datelite`

## Maintenance

### Regular Updates

1. **Security Updates**

   ```bash
   npm audit
   npm audit fix
   ```

2. **Dependency Updates**

   ```bash
   npm outdated
   npm update
   ```

3. **Test Before Publishing**
   ```bash
   npm test
   npm run build
   ```

### Responding to Issues

1. Monitor GitHub issues
2. Respond promptly
3. Fix bugs in patch releases
4. Add features in minor releases

## Best Practices

### Before Every Release

- [ ] Run all tests
- [ ] Update CHANGELOG.md
- [ ] Update version number
- [ ] Build distribution files
- [ ] Test package locally
- [ ] Review package contents
- [ ] Update documentation

### After Every Release

- [ ] Create git tag
- [ ] Create GitHub release
- [ ] Update documentation site
- [ ] Announce on social media
- [ ] Monitor for issues

### Semantic Versioning

Follow these rules:

**MAJOR (1.0.0 → 2.0.0)**

- Breaking API changes
- Removed features
- Changed behavior

**MINOR (1.0.0 → 1.1.0)**

- New features
- Backward compatible
- Deprecations

**PATCH (1.0.0 → 1.0.1)**

- Bug fixes
- Performance improvements
- Documentation updates

## Troubleshooting

### "Package already exists"

```bash
# Check if name is available
npm view @farisnceit/datelite

# If taken, choose a different name
```

### "You must verify your email"

```bash
# Check NPM email settings
npm profile get

# Verify email in NPM account settings
```

### "403 Forbidden"

```bash
# Re-login
npm logout
npm login

# Check organization access
npm access ls-packages @farisnceit
```

### Build Errors

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

## Resources

- [NPM Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [NPM Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

## Support

Need help publishing?

- 📧 Email: support@farizbytes.com
- 💬 GitHub Discussions: [Ask a question](https://github.com/farizbytes/datelite/discussions)

---

**Good luck with your release! 🚀**
