from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.presets import router as presets_router
from app.db.base import Base
from app.db.session import engine
from app.models.preset import Preset  # noqa: F401

app = FastAPI(title="Content Creator Camera Webapp API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(presets_router)
