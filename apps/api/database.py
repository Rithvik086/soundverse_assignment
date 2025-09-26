import os
import ssl
import dotenv
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.engine import url as sa_url

dotenv.load_dotenv()

# Read and sanitize DATABASE_URL: strip whitespace/newlines and surrounding quotes
raw_database_url = os.getenv("DATABASE_URL")
if not raw_database_url:
    raise ValueError("DATABASE_URL is missing from environment")

# Trim surrounding whitespace and newlines
DATABASE_URL = raw_database_url.strip()

# Remove surrounding single/double quotes if present
if (DATABASE_URL.startswith('"') and DATABASE_URL.endswith('"')) or (
    DATABASE_URL.startswith("'") and DATABASE_URL.endswith("'")
):
    DATABASE_URL = DATABASE_URL[1:-1].strip()

# If the env var accidentally contains multiple lines, keep the first line
if "\n" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.splitlines()[0].strip()

# Optional lightweight validation: ensure it's a parsable URL (don't expose secrets in logs)
try:
    parsed = sa_url.make_url(DATABASE_URL)
    safe_repr = f"{parsed.drivername}://{parsed.host or ''}:{parsed.port or ''}/{parsed.database or ''}"
    # do not print passwords or usernames to logs
    print(f"Using database (sanitized): {safe_repr}")
except Exception:
    # If parsing fails, raise a helpful error including a repr of the raw value to aid debugging
    raise ValueError(f"DATABASE_URL appears invalid: {repr(raw_database_url)}")

# SSL context
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

# async engine with SSL and pool_recycle
engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    future=True,
    connect_args={"ssl": ssl_context},
    pool_recycle=1800,
)

# async_sessionmaker
async_session = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
)

# Base for models
Base = declarative_base()

# Dependency
async def get_db():
    async with async_session() as session:
        yield session
