# apps/api/crud.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import Artist
from schemas import ArtistCreate

async def get_artists(db: AsyncSession):
    result = await db.execute(select(Artist))
    return result.scalars().all()

async def get_artist(db: AsyncSession, artist_id):
    result = await db.execute(select(Artist).where(Artist.id == artist_id))
    return result.scalar_one_or_none()

async def create_artist(db: AsyncSession, artist: ArtistCreate):
    artist_data = artist.dict()
    # Convert HttpUrl fields to str if present
    if "profile_image_url" in artist_data:
        artist_data["profile_image_url"] = str(artist_data["profile_image_url"])
    if "audio_preview_url" in artist_data:
        artist_data["audio_preview_url"] = str(artist_data["audio_preview_url"])
    db_artist = Artist(**artist_data)
    db.add(db_artist)
    await db.commit()
    await db.refresh(db_artist)
    return db_artist
