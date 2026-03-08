# Content Creator Camera Webapp

A lightweight web app designed for content creators (especially dancers) to simplify recording multiple takes synced with a specific music cue.

Problem:
Content creators often need to restart music and camera recording separately for each take.

Solution:
This web app allows creators to configure a music cue and record synchronized takes with a single button.

Stack:
Frontend
- React
- TypeScript
- Vite
- Tailwind

Backend
- FastAPI
- SQLAlchemy
- SQLite

Phase 1 MVP
- Camera preview
- Record timed takes
- Cue configuration
- Preset saving
- Video preview


## Instructions for local development:

### Backend server setup:

- python3 -m venv .venv
- source .venv/bin/activate
- pip3 install -r requirements.txt
- uvicorn app.main:app --reload --port 8000