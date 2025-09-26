from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db, engine, Base  
import crud, schemas
from typing import List
from uuid import UUID
import asyncio
from sqlalchemy.exc import OperationalError

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event to create tables
@app.on_event("startup")
async def startup_event():
    for _ in range(5):  # retry a few times in case DB is not ready
        try:
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            print("Database tables initialized")
            break
        except OperationalError:
            print("Database not ready, retrying in 3 seconds...")
            await asyncio.sleep(3)

# Routes
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
