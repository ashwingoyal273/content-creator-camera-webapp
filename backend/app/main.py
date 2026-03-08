from fastapi import FastAPI

app = FastAPI(title="Content Creator Camera Webapp API")


@app.get("/health")
def health():
    return {"status": "ok"}
