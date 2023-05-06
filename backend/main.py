from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI

from helpers.air_table import get_all_clubs, get_all_leaders

from helpers.classes import ClubElement, Leader

load_dotenv()


app = FastAPI()


@app.get("/leaders")
def leaders() -> List[Leader]:
    return get_all_leaders()
    
@app.get("/clubs")
def clubs() -> List[ClubElement]:
    return get_all_clubs()
