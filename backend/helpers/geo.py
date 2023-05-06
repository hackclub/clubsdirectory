from geopy.geocoders import Nominatim
import pycountry_convert as pc

geolocator = Nominatim(user_agent="geoapiExercises")


def lookup_lat_long(latitude: float, longitude: float):
    """
    This function takes a latitude and longitude and returns the location
    """
    location = geolocator.reverse(f"{latitude}, {longitude}")
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
        "AQ" : "Antarctica"
    }
    return continent_dict[continent_code]