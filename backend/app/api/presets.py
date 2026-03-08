from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.preset import Preset
from app.schemas.preset import PresetCreate, PresetRead

router = APIRouter(prefix="/presets", tags=["presets"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=list[PresetRead])
def list_presets(db: Session = Depends(get_db)):
    return db.query(Preset).order_by(Preset.id.desc()).all()


@router.post("", response_model=PresetRead)
def create_preset(payload: PresetCreate, db: Session = Depends(get_db)):
    preset = Preset(**payload.model_dump())
    db.add(preset)
    db.commit()
    db.refresh(preset)
    return preset


@router.get("/{preset_id}", response_model=PresetRead)
def get_preset(preset_id: int, db: Session = Depends(get_db)):
    preset = db.query(Preset).filter(Preset.id == preset_id).first()
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")
    return preset


@router.delete("/{preset_id}")
def delete_preset(preset_id: int, db: Session = Depends(get_db)):
    preset = db.query(Preset).filter(Preset.id == preset_id).first()
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")

    db.delete(preset)
    db.commit()
    return {"deleted": True}
