import asyncio
from database import engine  # your async SQLAlchemy engine
from models import Base       # the file where your Artist model is defined

async def init_models():
    async with engine.begin() as conn:
        # Create all tables defined in Base.metadata
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(init_models())
