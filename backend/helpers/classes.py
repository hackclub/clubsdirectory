from typing import Optional, List
from pydantic import BaseModel


class Coordinates(BaseModel):
    """
    A class to represent the coordinates of a location
    """
    latitude: float
    longitude: float


class GeoData(BaseModel):
    """
    A class to represent the geographical data of a location
    """
    coordinates: Coordinates
    country: str
    country_code: str
    postcode: Optional[str]
    continent: str


class Socials(BaseModel):
    """
    A class to represent the social media links of a club or leader
    """
    github: Optional[str]
    linkedin: Optional[str]
    twitter: Optional[str]


class Leader(BaseModel):
    """
    A class to represent a club leader
    """
    name: str
    pronouns: Optional[str]
    is_primary: bool
    email: str
    slack_id: str
    website: Optional[str]
    scrapbook: Optional[str]
    socials: Socials


class ClubElement(BaseModel):
    """
    A class to represent a club
    """
    id: int
    name: str
    description: Optional[str]
    website: Optional[str]
    scrapbook: Optional[str]
    venue: str
    location: str
    geo_data: GeoData
    socials: Socials
    leaders: List[Leader]
