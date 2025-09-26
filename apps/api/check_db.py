#!/usr/bin/env python3
import asyncio
import os
import traceback
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text


async def main():
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        print("DATABASE_URL not set in environment — export it and retry.")
        return

    print("Using DATABASE_URL:", DATABASE_URL)
    engine = create_async_engine(DATABASE_URL, echo=False)
    try:
        async with engine.connect() as conn:
            print("Connected to DB — running simple checks...")
            # Check for artists table presence (Postgres helper function to_regclass)
            try:
                res = await conn.execute(text("SELECT to_regclass('public.artists')"))
                table_name = res.scalar()
                print("artists table found? ->", table_name)
            except Exception as e:
                print("Error checking for artists table:")
                traceback.print_exc()

            # Optional: run a simple select safely
            try:
                res = await conn.execute(text("SELECT 1"))
                print("Simple SELECT works ->", res.scalar())
            except Exception:
                print("Simple SELECT failed:")
                traceback.print_exc()

    except Exception:
        print("Failed to connect to DB:")
        traceback.print_exc()
    finally:
        await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
