from logging.config import fileConfig
import os
from sqlalchemy import engine_from_config, pool
from alembic import context

# 👉 load .env
from dotenv import load_dotenv
load_dotenv()

# 👉 import your Base
from models import Base

config = context.config

# load URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL missing in .env")

# inject into alembic config
# config.set_main_option("sqlalchemy.url", DATABASE_URL)

# loggers
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# point to your metadata
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section) or {},
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
