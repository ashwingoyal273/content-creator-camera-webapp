from fastapi import FastAPI

from app.db.base import Base
from app.db.session import engine

app = FastAPI(title="Content Creator Camera Webapp API")

Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"status": "ok"}
