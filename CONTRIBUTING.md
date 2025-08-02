# Contributing to Vanilla DatePicker

Thank you for your interest in contributing to Vanilla DatePicker! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 14.0.0 or higher
- pnpm 7.0.0 or higher

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/datelite.git
   cd datelite
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Start Development Server**
   ```bash
   pnpm run serve
   ```

4. **Run Tests**
   ```bash
   pnpm test
   ```

5. **Build Project**
   ```bash
   pnpm run build
   ```

## 📁 Project Structure

```
datelite/
├── src/                    # Source code
│   ├── DatePicker.js      # Main DatePicker class
│   └── datelite.css     # Styles with CSS variables
├── dist/                  # Built files (generated)
├── types/                 # TypeScript definitions
├── tests/                 # Test files
├── docs/                  # Documentation
├── examples/              # Usage examples
└── package.json          # Package configuration
```

## 🛠️ Development Workflow

### Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Edit source files in `src/`
   - Add tests in `tests/`
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   pnpm run lint          # Check code style
   pnpm test              # Run tests
   pnpm run build         # Build project
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Format

We use [Conventional Commits](https://conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add range confirmation mode
fix: resolve positioning issue on mobile
docs: update API reference
style: format code with prettier
test: add tests for date blocking
```

## 🧪 Testing

### Running Tests
```bash
pnpm test              # Run all tests
pnpm run test:watch    # Run tests in watch mode
```

### Writing Tests
- Place test files in `tests/` directory
- Use descriptive test names
- Test both success and error cases
- Aim for high code coverage

### Test Structure
```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  test('should do something specific', () => {
    // Test implementation
  });
});
```

## 📝 Documentation

### Code Documentation
- Use JSDoc comments for public methods
- Include parameter types and descriptions
- Provide usage examples

```javascript
/**
 * Set the selected date
 * @param {Date|string|null} date - Date to select
 * @returns {DatePicker} Returns this instance for chaining
 * @example
 * picker.setDate(new Date());
 * picker.setDate('2024-01-15');
 */
setDate(date) {
  // Implementation
}
```

### README Updates
- Update README.md for new features
- Include code examples
- Update API documentation

## 🎨 Styling Guidelines

### CSS Variables
- Use existing CSS custom properties when possible
- Add new variables to `:root` section
- Follow naming convention: `--dp-category-property`

```css
:root {
  --dp-primary-color: #007bff;
  --dp-spacing-md: 12px;
  --dp-border-radius-sm: 4px;
}
```

### CSS Classes
- Use BEM methodology: `.datepicker-block__element--modifier`
- Keep specificity low
- Use semantic class names

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues
2. Test with latest version
3. Reproduce in minimal example

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Step one
2. Step two
3. Step three

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: Chrome 91
- OS: Windows 10
- DatePicker Version: 1.0.0

**Code Example**
```javascript
// Minimal code to reproduce
```

**Additional Context**
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other approaches you've considered

**Additional Context**
Any other relevant information
```

## 🔍 Code Review Process

### Pull Request Guidelines
1. **Clear Description**: Explain what changes you made and why
2. **Small PRs**: Keep pull requests focused and manageable
3. **Tests**: Include tests for new features and bug fixes
4. **Documentation**: Update docs for API changes
5. **Backwards Compatibility**: Avoid breaking changes when possible

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

## 📋 Code Style

### JavaScript
- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable names
- Keep functions small and focused

### CSS
- Use CSS custom properties
- Follow BEM methodology
- Mobile-first responsive design
- Maintain accessibility standards

### Formatting
```bash
pnpm run format    # Format code with Prettier
pnpm run lint      # Check code style
pnpm run lint:fix  # Fix auto-fixable issues
```

## 🚀 Release Process

### Version Bumping
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

### Release Checklist
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run full test suite
4. Build and test distribution files
5. Create release PR
6. Tag release after merge
7. Publish to npm registry

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

### Getting Help
- Check documentation first
- Search existing issues
- Ask questions in discussions
- Be specific about your problem

## 📚 Resources

- [Project Documentation](./README.md)
- [API Reference](./API_REFERENCE.md)
- [CSS Customization Guide](./CSS_CUSTOMIZATION.md)
- [TypeScript Definitions](./types/index.d.ts)

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Vanilla DatePicker! 🎉