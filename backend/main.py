from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI

from helpers.air_table import get_all_clubs, get_all_leaders

from helpers.classes import ClubElement, Leader

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


@app.get("/leaders")
def leaders() -> List[Leader]:
    return get_all_leaders()
    
@app.get("/clubs")
def clubs() -> List[ClubElement]:
    return get_all_clubs()
