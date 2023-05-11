import os

from dotenv import load_dotenv
from pyairtable import Table
from pyairtable.formulas import match

from helpers.classes import *

load_dotenv()

personal_token = os.environ.get("AIRTABLE_PAT")
base_id = os.environ.get("AIRTABLE_BASE_ID")

clubs_table = Table(personal_token, base_id, 'Club Directory Link')

club_leaders = Table(personal_token, base_id, 'Leaders Directory Link')


def get_all_leaders():
    """
    This function returns a list of all the club leaders
    """
    leaders = []

    for leader in club_leaders.all():
        leader_data = Leader(
            name=leader['fields']['Name'],
            pronouns=leader['fields']['Pronouns'] if 'Pronouns' in leader['fields'] else None,
            is_primary=leader['fields']['Is Primary'] if 'Is Primary' in leader['fields'] else False,
            email=leader['fields']['Email'] if 'Email' in leader['fields'] and 'Email' in leader['fields']['To Display'] else None,
            slack_id=leader['fields']['Slack ID'] if 'Slack ID' in leader['fields'] else None,
            website=leader['fields']['Website'] if 'Website' in leader['fields'] else None,
            scrapbook=leader['fields']['Scrapbook'] if 'Scrapbook' in leader['fields'] else None,
            socials=Socials(
                github=leader['fields']['Github'] if 'Github' in leader['fields'] and 'Github' in leader['fields']['To Display'] else None,
                linkedin=leader['fields']['LinkedIn'] if 'LinkedIn' in leader[
                    'fields'] and 'LinkedIn' in leader['fields']['To Display'] else None,
                twitter=leader['fields']['Twitter'] if 'Twitter' in leader[
                    'fields'] and 'Twitter' in leader['fields']['To Display'] else None,
            )
        )
        leaders.append(leader_data)

    return leaders


def get_all_clubs():
    """
    This function returns a list of all the clubs
    """
    clubs = []

    for club in clubs_table.all():
        if 'To Display' not in club['fields']:
            continue

        clubs.append(club_data_to_obj(club))

    return clubs


def get_club_by_name(name: str):
    """
    This function takes a club name and returns the club data
    """
    formula = match({'Club Name': name})
    club_data = clubs_table.first(formula=formula)

    if club_data == None:
        return None

    return club_data_to_obj(club_data)

def get_club_by_id(id: int):
    """
    This function takes a club id and returns the club data
    """
    formula = match({'ID': id})
    club_data = clubs_table.first(formula=formula)

    if club_data == None:
        return None

    return club_data_to_obj(club_data)


def club_data_to_obj(club_data: dict):
    """
    A simple function to convert club data to a ClubElement object
    """

    club = ClubElement(
        id=club_data['fields']['ID'],
        name=club_data['fields']['Club Name'],
        description=club_data['fields']['Description'] if 'Description' in club_data['fields'] else None,
        website=club_data['fields']['Website'] if 'Website' in club_data['fields'] else None,
        scrapbook=club_data['fields']['Scrapbook'] if 'Scrapbook' in club_data['fields'] else None,
        venue=club_data['fields']['Venue'][0],
        location=club_data['fields']['Location'][0],
        geo_data=GeoData(

            coordinates=Coordinates(
                latitude=club_data['fields']['Latitude'][0], longitude=club_data['fields']['Longitude'][0]),
            country=club_data['fields']['Country'] if 'Country' in club_data['fields'] else None,
            state=club_data['fields']['State'] if 'State' in club_data['fields'] else None,
            state_iso_code=club_data['fields']['State ISO Code'] if 'State ISO Code' in club_data['fields'] else None,
            country_code=club_data['fields']['Country Code'] if 'Country Code' in club_data['fields'] else None,
            continent=club_data['fields']['Continent'] if 'Continent' in club_data['fields'] else None,
            postcode=club_data['fields']['Postcode'] if 'Postcode' in club_data['fields'] else None
        ),
        socials=Socials(
            github=club_data['fields']['Github'] if 'Github' in club_data[
                'fields'] and 'Github' in club_data['fields']['To Display'] else None,
            linkedin=club_data['fields']['LinkedIn'] if 'LinkedIn' in club_data[
                'fields'] and 'LinkedIn' in club_data['fields']['To Display'] else None,
            twitter=club_data['fields']['Twitter'] if 'Twitter' in club_data[
                'fields'] and 'Twitter' in club_data['fields']['To Display'] else None,
        ),
        leaders=[]
    )

    for leader_id in club_data['fields']['Leaders Directory Link']:
        leader = club_leaders.get(leader_id)
        leader_data = Leader(
            name=leader['fields']['Name'],
            pronouns=leader['fields']['Pronouns'] if 'Pronouns' in leader['fields'] else None,
            is_primary=leader['fields']['Is Primary'] if 'Is Primary' in leader['fields'] else False,
            email=leader['fields']['Email'] if 'Email' in leader['fields'] and 'Email' in leader['fields']['To Display'] else None,
            slack_id=leader['fields']['Slack ID'] if 'Slack ID' in leader['fields'] else None,
            website=leader['fields']['Website'] if 'Website' in leader['fields'] else None,
            scrapbook=leader['fields']['Scrapbook'] if 'Scrapbook' in leader['fields'] else None,
            socials=Socials(
                github=leader['fields']['Github'] if 'Github' in leader['fields'] and 'Github' in leader['fields']['To Display'] else None,
                linkedin=leader['fields']['LinkedIn'] if 'LinkedIn' in leader[
                    'fields'] and 'LinkedIn' in leader['fields']['To Display'] else None,
                twitter=leader['fields']['Twitter'] if 'Twitter' in leader[
                    'fields'] and 'Twitter' in leader['fields']['To Display'] else None,
            )
        )
    club.leaders.append(leader_data)

    return club