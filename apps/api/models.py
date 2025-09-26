

from sqlalchemy import Column, String, Text, Integer, Enum, Boolean, Numeric, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class Artist(Base):
    __tablename__ = "artists"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    creator_name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    profile_image_url = Column(String, nullable=True)
    tags = Column(ARRAY(String), nullable=True)
    dna_visibility = Column(Enum("public", "private", "draft", name="visibility_enum"), default="public")
    price = Column(Numeric, nullable=True)
    license_type = Column(String, nullable=True)
    tracks_visibility = Column(Enum("visible", "invisible", name="tracks_enum"), default="visible")
    become_partner = Column(Boolean, default=False)
    audio_preview_url = Column(String, nullable=True)
    sensitivity = Column(Integer, nullable=True)
    status = Column(Enum("pending", "processing", "complete", name="status_enum"), default="pending")
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
