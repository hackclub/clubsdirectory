import random

import pycountry_convert as pc
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderUnavailable

# The random integer is to prevent the user agent from being the same every time and getting blocked
geolocator = Nominatim(user_agent=f"geoapiExercise{random.randint(0, 1000)}")


def lookup_lat_long(latitude: float, longitude: float):
    """
    This function takes a latitude and longitude and returns the location
    """
    while True:
        try:
            geolocator.user_agent = f"geoapiExercise{random.randint(0, 1000)}"
            location = geolocator.reverse(
                f"{latitude}, {longitude}", language='en-US')
            break
        except (GeocoderTimedOut, GeocoderUnavailable):
            print("Geocoder timed out, retrying...")
            continue
    return location.raw['address']


def get_continent(country_code: str) -> str:
    """
    This function takes a country code and returns the continent it is in
    """

    continent_code = pc.country_alpha2_to_continent_code(country_code)
    continent_dict = {
        "NA": "North America",
        "SA": "South America",
        "AS": "Asia",
        "AF": "Africa",
        "OC": "Oceania",
        "EU": "Europe",
        "AQ": "Antarctica"
    }
    return continent_dict[continent_code]
