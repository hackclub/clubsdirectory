import os

from dotenv import load_dotenv
from pyairtable import Table

from helpers.geo import lookup_lat_long, get_continent

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

        geo_data = lookup_lat_long(
            club['fields']['Latitude'][0], club['fields']['Longitude'][0])
        club_data = ClubElement(
            name=club['fields']['Club Name'],
            description=club['fields']['Description'] if 'Description' in club['fields'] else None,
            website=club['fields']['Website'] if 'Website' in club['fields'] else None,
            scrapbook=club['fields']['Scrapbook'] if 'Scrapbook' in club['fields'] else None,
            venue=club['fields']['Venue'][0],
            location=club['fields']['Location'][0],
            geo_data=GeoData(
                coordinates=Coordinates(
                    latitude=club['fields']['Latitude'][0], longitude=club['fields']['Longitude'][0]),
                country=geo_data['country'],
                country_code=geo_data['country_code'],
                continent=get_continent(geo_data['country_code'].upper())
            ),
            socials=Socials(
                github=club['fields']['Github'] if 'Github' in club['fields'] and 'Github' in club['fields']['To Display'] else None,
                linkedin=club['fields']['LinkedIn'] if 'LinkedIn' in club['fields'] and 'LinkedIn' in club['fields']['To Display'] else None,
                twitter=club['fields']['Twitter'] if 'Twitter' in club['fields'] and 'Twitter' in club['fields']['To Display'] else None,
            ),
            leaders=[]
        )

        for leader_id in club['fields']['Leaders Directory Link']:
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
            club_data.leaders.append(leader_data)
        clubs.append(club_data)

    return clubs
