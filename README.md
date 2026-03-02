<p align="center">
  <img src="docs/assets/loomi-git.webp" alt="Loomi Logo" width="420"/>
</p>

---
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Express-API-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/Sharp-Image_Engine-111111?style=for-the-badge" />
  <img src="https://img.shields.io/badge/FastAPI-ML_Service-009688?style=for-the-badge&logo=fastapi" />
</p>
</p>
---

**Loomi** is a modern, dark-themed image toolkit built with a scalable full-stack architecture.

It is designed as a structured, professional-grade image processing platform — starting with format conversion and expanding into a complete suite of image tools.

Currently in active development.

---

## ✨ Current Features

### 🖼 Image Converter
- PNG, JPEG, WebP, AVIF, GIF, TIFF support
- Size comparison (before vs after)
- Memory-based processing
- Strict validation

### 🗜 Image Compressor
- Quality-based compression
- Savings percentage display
- Clean processing feedback

### 🎯 Background Removal (ML Powered)
- AI-based subject extraction
- Transparent PNG output
- Python FastAPI microservice
- Node ↔ ML service integration

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Modular tool-based UI architecture

### Backend (API Layer)
- Express
- TypeScript
- Sharp (image processing engine)
- Multer (memory-based file handling)
- Layered architecture (routes → controllers → services → middleware)
- Axios (internal ML service communication)

### ML Microservice
- FastAPI
- Python
- Background removal model
- Isolated microservice architecture

---

## 🧱 Project Structure

```
Loomi/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
├── frontend/
│    ├── src/
│    │   ├── app/
│    │   ├── components/
│    │   └── lib/
│    └── package.json
└──ml-service/
    │
    ├──app.py
    │
    └──requirements.txt
```

The backend follows a scalable layered architecture to allow future expansion (compressor, background remover, metadata tools, etc.).

---

## 🚀 Running Locally

Loomi uses a microservice architecture.
You must run **three services** in separate terminals.

---

### 1️⃣ ML Service (Background Removal)

```bash
cd ml-service

# create virtual environment (first time only)
python -m venv venv

# activate environment
# macOS / Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# install dependencies
pip install -r requirements.txt

# start FastAPI server
uvicorn app:app --reload --port 8000
```

Runs on:

```
http://localhost:8000
```

Swagger docs:

```
http://localhost:8000/docs
```

---

### 2️⃣ Backend API (Express)

```bash
cd backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

## ✅ Required Order

Start services in this order:

1. ML service
2. Backend
3. Frontend

If the ML service is not running, background removal will return a 500 error.


---

## 📌 Roadmap

* [x] Image Converter
* [x] Image Compressor
* [x] Background Remover
* [ ] Resize Tool
* [ ] Crop Tool
* [ ] Metadata Stripper
* [ ] Bulk Processing
* [ ] Public Deployment

---

## 🎯 Vision

Loomi aims to become a modern, developer-grade image toolkit with:

- Clean architecture
- Strong validation
- Performance-focused processing
- ML-powered extensibility
- Microservice-ready backend
- Premium UI experience

This is not just an image tool — it is a modular image processing platform.


---

## 📄 License

MIT

---
