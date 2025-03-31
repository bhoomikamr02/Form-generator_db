from fastapi import FastAPI
import databases
import sqlalchemy
import os
from contextlib import asynccontextmanager

# Database URL
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:MYSQL123@localhost:5432/form_generator")

# Initialize database connection
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)

# Lifespan for FastAPI (Startup & Shutdown)
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🔄 Starting FastAPI...")
    await database.connect()
    print("Database connected successfully!")
    yield
    print("Shutting down FastAPI...")
    await database.disconnect()
    print(" Database disconnected.")

# Create FastAPI App with Lifespan
app = FastAPI(lifespan=lifespan)
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# API to fetch users
@app.get("/users")
async def get_users():
    print("Fetching users from database...")
    query = "SELECT * FROM users;"
    users = await database.fetch_all(query)
    print(f"Retrieved {len(users)} users from database.")
    return users

