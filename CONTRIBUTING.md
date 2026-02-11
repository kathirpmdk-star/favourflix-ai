# Contributing to FavourFlix-AI

Thank you for considering contributing to FavourFlix-AI! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Follow [SETUP.md](SETUP.md) for local development setup
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Branch Strategy

We use a 3-branch workflow:

- **`main`** - Stable production code
- **`backend`** - Backend development branch
- **`frontend`** - Frontend development branch

### Working on Backend Features

```bash
git checkout backend
git pull origin backend
git checkout -b feature/backend-your-feature
# Make your changes in backend/ directory only
git add backend/
git commit -m "feat(backend): your feature description"
git push origin feature/backend-your-feature
```

Create a PR to merge into `backend` branch.

### Working on Frontend Features

```bash
git checkout frontend
git pull origin frontend
git checkout -b feature/frontend-your-feature
# Make your changes in frontend/ directory only
git add frontend/
git commit -m "feat(frontend): your feature description"
git push origin feature/frontend-your-feature
```

Create a PR to merge into `frontend` branch.

## Commit Message Guidelines

We follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Scopes

- `backend`: Backend changes
- `frontend`: Frontend changes
- `api`: API changes
- `db`: Database changes
- `ui`: UI components
- `docs`: Documentation

### Examples

```
feat(backend): add movie search by title endpoint

Implemented new endpoint for searching movies by title
using TMDB search API.

Closes #123
```

```
fix(frontend): resolve pagination navigation issue

Fixed bug where pagination would not update page correctly
when clicking on page numbers.

Fixes #456
```

## Code Standards

### Backend (Python)

- Follow PEP 8 style guide
- Use type hints where applicable
- Document functions with docstrings
- Keep functions focused and small
- Use async/await for I/O operations

**Example:**

```python
async def get_movie_details(self, movie_id: int) -> Optional[Dict]:
    """
    Get detailed information about a specific movie
    
    Args:
        movie_id: TMDB movie ID
        
    Returns:
        Dict with movie details or None if not found
    """
    # Implementation
```

### Frontend (React)

- Use functional components with hooks
- Follow React best practices
- Keep components small and reusable
- Use meaningful variable names
- Add PropTypes or TypeScript types
- Keep business logic in services

**Example:**

```javascript
/**
 * Movie Card Component with Netflix-style hover effects
 */
const MovieCard = ({ movie, onFavourite, isFavourite }) => {
  // Component implementation
};

export default MovieCard;
```

### CSS/Styling

- Use Tailwind utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use custom classes sparingly

## Testing

### Backend Tests

```bash
cd backend
pytest tests/
```

### Frontend Tests

```bash
cd frontend
npm run test
```

**Add tests for:**
- New features
- Bug fixes
- API endpoints
- Component behavior

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Follow commit message guidelines**
5. **Update CHANGELOG** if applicable
6. **Request review** from maintainers

### PR Title Format

```
[Type] Brief description of changes
```

Examples:
- `[Feature] Add movie filtering by year`
- `[Fix] Resolve CORS issue on production`
- `[Docs] Update setup instructions`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

## Adding New Features

### Backend: Adding a New API Endpoint

1. **Define schema** in `backend/app/schemas/schemas.py`
2. **Add business logic** in appropriate service
3. **Create endpoint** in `backend/app/routers/api.py`
4. **Test endpoint** manually and with automated tests
5. **Update API documentation**

### Frontend: Adding a New Component

1. **Create component** in `frontend/src/components/`
2. **Add styles** using Tailwind CSS
3. **Integrate with API** if needed
4. **Test responsiveness**
5. **Document props and usage**

### Frontend: Adding a New Page

1. **Create page** in `frontend/src/pages/`
2. **Add route** in `frontend/src/App.jsx`
3. **Add navigation** in `frontend/src/components/Navbar.jsx`
4. **Test routing and navigation**

## Code Review Guidelines

### As a Reviewer

- Be constructive and respectful
- Focus on code quality and maintainability
- Suggest improvements, don't demand
- Approve when ready, request changes if needed

### As an Author

- Respond to all comments
- Ask for clarification if needed
- Make requested changes or explain why not
- Thank reviewers for their time

## Reporting Bugs

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 96]
- Backend version: [e.g., 1.0.0]
- Frontend version: [e.g., 1.0.0]

**Additional Context**
Any other relevant information
```

## Feature Requests

### Feature Request Template

```markdown
**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Mockups, examples, etc.
```

## Documentation

### When to Update Documentation

- Adding new features
- Changing existing behavior
- Fixing bugs that affect usage
- Updating dependencies
- Changing configuration

### Files to Update

- `README.md` - Main project overview
- `SETUP.md` - Setup instructions
- `backend/README.md` - Backend-specific docs
- `frontend/README.md` - Frontend-specific docs
- Code comments and docstrings

## Getting Help

- Check existing documentation
- Search existing issues
- Ask in discussions
- Contact maintainers

## Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes
- Project documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FavourFlix-AI! 🎬✨
