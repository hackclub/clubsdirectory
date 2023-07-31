import os

from dotenv import load_dotenv
from pyairtable import Table
from pyairtable.formulas import match, AND, FIND, STR_VALUE, FIELD

from helpers.classes import *



load_dotenv()

personal_token = os.environ.get("AIRTABLE_PAT")
base_id = os.environ.get("AIRTABLE_BASE_ID")

clubs_table: Table = Table(personal_token, base_id, "Club Directory Link")

club_leaders: Table = Table(personal_token, base_id, "Leaders Directory Link")


def get_all_leaders():
    """
    This function returns a list of all the club leaders
    """
    leaders = []

    for leader in club_leaders.all():
        leader_data = Leader(
            name=leader["fields"]["Name"],
            pronouns=leader["fields"]["Pronouns"]
            if "Pronouns" in leader["fields"]
            else None,
            is_primary=leader["fields"]["Is Primary"]
            if "Is Primary" in leader["fields"]
            else False,
            email=leader["fields"]["Email"]
            if "Email" in leader["fields"] and "Email" in leader["fields"]["To Display"]
            else None,
            slack_id=leader["fields"]["Slack ID"]
            if "Slack ID" in leader["fields"]
            else None,
            website=leader["fields"]["Website"]
            if "Website" in leader["fields"]
            else None,
            scrapbook=leader["fields"]["Scrapbook"]
            if "Scrapbook" in leader["fields"]
            else None,
            socials=Socials(
                github=leader["fields"]["Github"]
                if "Github" in leader["fields"]
                and "Github" in leader["fields"]["To Display"]
                else None,
                linkedin=leader["fields"]["LinkedIn"]
                if "LinkedIn" in leader["fields"]
                and "LinkedIn" in leader["fields"]["To Display"]
                else None,
                twitter=leader["fields"]["Twitter"]
                if "Twitter" in leader["fields"]
                and "Twitter" in leader["fields"]["To Display"]
                else None,
            ),
        )
        leaders.append(leader_data)

    return leaders


def get_all_clubs():
    """
    This function returns a list of all the clubs
    """
    clubs = []

    clubs_data = clubs_table.all()

    for club in map(club_data_to_obj, clubs_data):
        if not club.to_display or not club.approved:
            continue

        clubs.append(club)

    return clubs


def get_club_by_name(name: str):
    """
    This function takes a club name and returns the club data
    """
    formula = match({"Club Name": name})
    club_data = clubs_table.first(formula=formula)

    if club_data == None:
        return None

    return club_data_to_obj(club_data)


def get_club_by_id(id: int):
    """
    This function takes a club id and returns the club data
    """
    formula = match({"ID": id})
    club_data = clubs_table.first(formula=formula)

    if club_data == None:
        return None

    return club_data_to_obj(club_data)


def club_data_to_obj(club_data: dict):
    """
    A simple function to convert club data to a ClubElement object
    """

    club = ClubElement(
        id=club_data["fields"]["ID"],
        name=club_data["fields"]["Club Name"],
        to_display=club_data["fields"]["To Display"]
        if "To Display" in club_data["fields"]
        else False,
        approved=club_data["fields"]["Approved"]
        if "Approved" in club_data["fields"]
        else False,
        description=club_data["fields"]["Description"]
        if "Description" in club_data["fields"]
        else None,
        website=club_data["fields"]["Website"]
        if "Website" in club_data["fields"]
        else None,
        scrapbook=club_data["fields"]["Scrapbook"]
        if "Scrapbook" in club_data["fields"]
        else None,
        venue=club_data["fields"]["Venue"][0],
        location=club_data["fields"]["Location"][0],
        geo_data=GeoData(
            coordinates=Coordinates(
                latitude=club_data["fields"]["Latitude"][0],
                longitude=club_data["fields"]["Longitude"][0],
            ),
            country=club_data["fields"]["Country"]
            if "Country" in club_data["fields"]
            else None,
            state=club_data["fields"]["State"]
            if "State" in club_data["fields"]
            else None,
            state_iso_code=club_data["fields"]["State ISO Code"]
            if "State ISO Code" in club_data["fields"]
            else None,
            country_code=club_data["fields"]["Country Code"]
            if "Country Code" in club_data["fields"]
            else None,
            continent=club_data["fields"]["Continent"]
            if "Continent" in club_data["fields"]
            else None,
            postcode=club_data["fields"]["Postcode"]
            if "Postcode" in club_data["fields"]
            else None,
        ),
        socials=Socials(
            github=club_data["fields"]["Github"]
            if "Github" in club_data["fields"]
            and "Github" in club_data["fields"]["Socials to Display"]
            else None,
            linkedin=club_data["fields"]["LinkedIn"]
            if "LinkedIn" in club_data["fields"]
            and "LinkedIn" in club_data["fields"]["Socials to Display"]
            else None,
            twitter=club_data["fields"]["Twitter"]
            if "Twitter" in club_data["fields"]
            and "Twitter" in club_data["fields"]["Socials To Display"]
            else None,
        ),
        leaders=[],
    )
    for leader_id in club_data["fields"]["Leaders Directory Link"]:
        leader = club_leaders.get(leader_id)

        try:
            leader["fields"]["To Display"]
        except KeyError:
            leader["fields"]["To Display"] = []

        leader_data = Leader(
            name=leader["fields"]["Name"],
            pronouns=leader["fields"]["Pronouns"]
            if "Pronouns" in leader["fields"]
            else None,
            is_primary=leader["fields"]["Is Primary"]
            if "Is Primary" in leader["fields"]
            else False,
            email=leader["fields"]["Email"]
            if "Email" in leader["fields"] and "Email" in leader["fields"]["To Display"]
            else None,
            slack_id=leader["fields"]["Slack ID"]
            if "Slack ID" in leader["fields"]
            else None,
            website=leader["fields"]["Website"]
            if "Website" in leader["fields"]
            else None,
            scrapbook=leader["fields"]["Scrapbook"]
            if "Scrapbook" in leader["fields"]
            else None,
            socials=Socials(
                github=leader["fields"]["Github"]
                if "Github" in leader["fields"]
                and "Github" in leader["fields"]["To Display"]
                else None,
                linkedin=leader["fields"]["LinkedIn"]
                if "LinkedIn" in leader["fields"]
                and "LinkedIn" in leader["fields"]["To Display"]
                else None,
                twitter=leader["fields"]["Twitter"]
                if "Twitter" in leader["fields"]
                and "Twitter" in leader["fields"]["To Display"]
                else None,
            ),
        )
    club.leaders.append(leader_data)

    return club


# Add old clubs to the map

old_clubs_table = Table(personal_token, base_id, "Clubs Dashboard")


def get_old_clubs():
    """
    This function returns a list of all the old clubs
    """
    clubs = []
    formula = AND(
        match({"Status": "active"}),
        "NOT({Latitude} = BLANK())",
        "NOT({Longitude} = BLANK())",
        "NOT({Venue} = BLANK())",
        "NOT({Continent} = BLANK())",
    )

    for club in map(
        lambda club: OldClub(
            name=club["fields"]["Venue"],
            coordinates=Coordinates(
                latitude=club["fields"]["Latitude"],
                longitude=club["fields"]["Longitude"],
            ),
            country=club["fields"]["Address Country"]
            if "Address Country" in club["fields"]
            else None,
            continent=club["fields"]["Continent"]
            if "Continent" in club["fields"]
            else None,
        ),
        old_clubs_table.all(formula=formula),
    ):
        clubs.append(club)

    return clubs


# Lookup if a user is a club leader


def check_if_leader(user_id: str) -> bool:
    """
    This function takes a user id and returns whether or not they are a club leader
    """
    formula = match({"Slack ID": user_id})
    leader_data = club_leaders.first(formula=formula)

    if leader_data == None:
        return False

    return True


def add_leader(leader: Leader):
    """
    This function takes a Leader object and adds it to the leaders table
    """
    leader_data = {
        "Name": leader.name,
        "Pronouns": leader.pronouns,
        "Is Primary": leader.is_primary,
        "Email": leader.email,
        "Slack ID": leader.slack_id,
        "Website": leader.website,
        "Scrapbook": leader.scrapbook,
        "Github": leader.socials.github,
        "LinkedIn": leader.socials.linkedin,
        "Twitter": leader.socials.twitter,
    }

    club_leaders.create(leader_data)


def get_club_by_leader(user_id: str) -> dict:
    """
    This function takes a user id and returns the club they lead
    """
    formula = match({"Slack ID": user_id})
    leader_data = club_leaders.first(formula=formula)

    if leader_data == None:
        return None

    club_id = leader_data["fields"]["Club Link"][0]

    club_data = clubs_table.get(club_id)

    return club_data


def get_airtable_rec_id_from_slack_id(slack_id: str) -> str:
    """
    This function takes a slack user id and returns the airtable record id
    """
    formula = match({"Slack ID": slack_id})
    leader_data = club_leaders.first(formula=formula)

    if leader_data == None:
        return None

    return leader_data["id"]


def get_all_leaders_for_club(club_air_id: str):
    """
    This function takes a club airtable record id and returns a list of all the leaders
    """
    leaders = []

    for leader in club_leaders.all():
        if "Club Link" not in leader["fields"]:
            continue

        if leader["fields"]["Club Link"][0] == club_air_id:
            leaders.append(leader)

    return leaders


def get_primary_leader(club_air_id: str):
    """
    This function takes a club airtable record id and returns the primary leader
    """
    leaders = get_all_leaders_for_club(club_air_id)

    for leader in leaders:
        if "Is Primary" in leader["fields"]:
            return leader

    return None


def get_secondary_leaders(club_air_id: str):
    """
    This function takes a club airtable record id and returns a list of secondary leaders
    """
    leaders = get_all_leaders_for_club(club_air_id)

    secondary_leaders = []

    for leader in leaders:
        if "Is Primary" not in leader["fields"]:
            secondary_leaders.append(leader)

    return secondary_leaders


def get_old_club_from_leader(leaders_slack):
    """
    This function takes a slack user id and returns the old club they lead
    """
    formula = FIND(STR_VALUE(leaders_slack), FIELD("Slack ID"))
    old_club = old_clubs_table.first(formula=formula)

    if old_club == None:
        return None

    return old_club


def fetch_waiting_clubs():
    """
    This function returns a list of all the clubs waiting for approval
    """

    formula = match({"Approved": False})
    clubs_data = clubs_table.all(formula=formula)

    return clubs_data


def approve_club_airtable(club_id: str):
    """
    This function takes a club airtable id and approves it
    """

    club_data = clubs_table.first(formula=match({"ID": club_id}))

    clubs_table.update(club_data["id"], {"Approved": True})


def search_clubs(query: str):
    """
    This function takes a search query and returns a list of clubs that are named similarly
    """

    formula = FIND(STR_VALUE(query), FIELD("Club Name"))
    clubs_data = clubs_table.all(formula=formula)

    return clubs_data


def leader_data_to_obj(leader: dict):
    """
    A simple function to convert leader data to a Leader object
    """

    return Leader(
        name=leader["fields"]["Name"],
        pronouns=leader["fields"]["Pronouns"]
        if "Pronouns" in leader["fields"]
        else None,
        is_primary=leader["fields"]["Is Primary"]
        if "Is Primary" in leader["fields"]
        else False,
        email=leader["fields"]["Email"]
        if "Email" in leader["fields"] and "Email" in leader["fields"]["To Display"]
        else None,
        slack_id=leader["fields"]["Slack ID"]
        if "Slack ID" in leader["fields"]
        else None,
        website=leader["fields"]["Website"] if "Website" in leader["fields"] else None,
        scrapbook=leader["fields"]["Scrapbook"]
        if "Scrapbook" in leader["fields"]
        else None,
        socials=Socials(
            github=leader["fields"]["Github"]
            if "Github" in leader["fields"]
            and "Github" in leader["fields"]["To Display"]
            else None,
            linkedin=leader["fields"]["LinkedIn"]
            if "LinkedIn" in leader["fields"]
            and "LinkedIn" in leader["fields"]["To Display"]
            else None,
            twitter=leader["fields"]["Twitter"]
            if "Twitter" in leader["fields"]
            and "Twitter" in leader["fields"]["To Display"]
            else None,
        ),
    )
