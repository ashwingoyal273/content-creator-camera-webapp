from sqlalchemy import Column, Integer, String

from app.db.base import Base


class Preset(Base):
    __tablename__ = "presets"

    id = Column(Integer, primary_key=True, index=True)
    track_name = Column(String, nullable=False)
    start_time_ms = Column(Integer, nullable=False)
    duration_ms = Column(Integer, nullable=False)
    countdown_seconds = Column(Integer, nullable=False, default=3)
