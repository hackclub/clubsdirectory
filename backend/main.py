import os
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
from redis import asyncio as aioredis

from helpers.air_table import (get_all_clubs, get_all_leaders, get_club_by_id,
                               get_club_by_name, get_old_clubs)
from helpers.classes import ClubElement, Leader, OldClub

load_dotenv()

app = FastAPI()


@cache()
async def get_cache():
    return 1

load_dotenv()

app = FastAPI(
    title="Clubs Directory API for Hack Club",
    description="This API is used to get information about Hack Club's clubs and leaders",
    version="0.0.1",
    contact={
        "name": "Holly",
        "url": "https://hackclub.com",
        "email": "holly@hackclub.com"
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT"
    }
)

# Define middleware function to add CORS headers


@app.middleware("http")
async def add_cors_header(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


@app.get("/leaders")
@cache(expire=1800)
def leaders() -> List[Leader]:
    return get_all_leaders()


@app.get("/clubs")
@cache(expire=1800)
def clubs() -> List[ClubElement]:
    clubs = get_all_clubs()
    return clubs


@app.get("/club/name/{name}")
@cache(expire=1800)
def club_by_name(name: str) -> ClubElement:
    return get_club_by_name(name)


@app.get("/club/id/{id}")
@cache(expire=1800)
def club_by_id(id: int) -> ClubElement:
    return get_club_by_id(id)


@app.get('/clubs/old')
@cache(expire=1800)
def old_clubs() -> List[OldClub]:
    return get_old_clubs()


@app.on_event("startup")
async def startup():
    redis = aioredis.from_url(f"redis://{os.environ.get('REDIS_IP')}/0")
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
