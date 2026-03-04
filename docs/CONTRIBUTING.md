# Contributing to Loomi

Thank you for taking the time to contribute to Loomi.

Loomi is designed as a modular image processing platform. The goal is to keep the codebase clean, maintainable, and easy to extend with new tools. Contributions of all sizes are welcome, whether it's fixing a bug, improving documentation, or adding a new image tool.

---

## Getting Started

1. Fork the repository
2. Clone your fork locally

```bash
git clone https://github.com/(your-username)/Loomi.git
cd Loomi
```

3. Create a new branch

```bash
git checkout -b feature/your-feature-name
```

Make sure your branch name clearly reflects the change you are making.

---

## Running Loomi Locally

Loomi uses a small microservice setup. You need to run three services.

### 1. ML Service (Background Removal)

```bash
cd ml-service

python -m venv venv
source venv/bin/activate   # macOS/Linux
# venv\Scripts\activate    # Windows

pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

### 2. Backend API

```bash
cd backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

Start services in this order:

1. ML service
2. Backend
3. Frontend

---

## Project Architecture

Loomi follows a layered backend structure and modular frontend tools.

### Backend

```
routes → controllers → services → middleware
```

Responsibilities:

* **Routes**: Define API endpoints
* **Controllers**: Handle request/response logic
* **Services**: Perform image processing
* **Middleware**: Shared logic such as file uploads

### Frontend

Each tool has its own route and component.

```
app/tools/[tool-name]
components/tools/[ToolName]Tool.tsx
```

Shared UI elements live in:

```
components/ui/
```

---

## Adding a New Tool

When adding a new image tool, follow the existing pattern.

### Backend

Create:

```
routes/[tool].routes.ts
controllers/[tool].controller.ts
services/[tool].service.ts
```

Register the route in:

```
app.ts
```

### Frontend

Create:

```
app/tools/[tool-name]/page.tsx
components/tools/[ToolName]Tool.tsx
```

Reuse existing UI components where possible.

---

## Code Style

* Use **TypeScript** for all frontend and backend code.
* Keep functions small and focused.
* Avoid placing processing logic inside controllers.
* Follow the existing file structure.
* Prefer clear and readable code over clever solutions.

---

## Commit Messages

Use clear and descriptive commit messages.

Examples:

```
feat: add metadata stripping service
feat(frontend): implement resize tool UI
fix: handle invalid image format in compressor
docs: update README
```

---

## Pull Requests

Before opening a pull request:

* Ensure the project runs locally
* Test the feature you added or modified
* Keep pull requests focused on a single change
* Update documentation if needed

Provide a short explanation of what the change does.

---

## Reporting Issues

If you find a bug or have an idea for improvement, please open an issue.

When reporting a bug, include:

* what you expected to happen
* what actually happened
* steps to reproduce the issue

---

## License

By contributing to Loomi, you agree that your contributions will be licensed under the MIT License.
