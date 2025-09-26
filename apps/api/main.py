from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
import crud, schemas
from typing import List
from uuid import UUID

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/artists", response_model=List[schemas.Artist])
async def read_artists(db: AsyncSession = Depends(get_db)):
    return await crud.get_artists(db)

@app.get("/artists/{artist_id}", response_model=schemas.Artist)
async def read_artist(artist_id: UUID, db: AsyncSession = Depends(get_db)):
    artist = await crud.get_artist(db, artist_id)
    if artist is None:
        raise HTTPException(status_code=404, detail="Artist not found")
    return artist

@app.post("/artists", response_model=schemas.Artist)
async def create_artist(artist: schemas.ArtistCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_artist(db, artist)
