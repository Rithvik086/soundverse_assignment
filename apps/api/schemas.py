
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from uuid import UUID
from datetime import datetime



class ArtistBase(BaseModel):
    creator_name: str
    description: Optional[str] = None
    profile_image_url: Optional[HttpUrl] = None
    tags: Optional[List[str]] = None
    dna_visibility: Optional[str] = "public"
    price: Optional[float] = None
    license_type: Optional[str] = None
    tracks_visibility: Optional[str] = "visible"
    become_partner: Optional[bool] = False
    audio_preview_url: Optional[HttpUrl] = None
    sensitivity: Optional[int] = None
    status: Optional[str] = "pending"

class ArtistCreate(ArtistBase):
    pass

class Artist(ArtistBase):
    id: UUID
    created_at: datetime

    class Config:
        orm_mode = True

