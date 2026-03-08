from pydantic import BaseModel, Field


class PresetCreate(BaseModel):
    track_name: str = Field(..., min_length=1)
    start_time_ms: int = Field(..., ge=0)
    duration_ms: int = Field(..., gt=0)
    countdown_seconds: int = Field(..., ge=1, le=10)


class PresetRead(PresetCreate):
    id: int

    class Config:
        from_attributes = True
