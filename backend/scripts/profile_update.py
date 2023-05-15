# Description: This script is used to update the club leaders table with the latest information from slack



from helpers.air_table import club_leaders, clubs_table
from helpers.geo import get_continent, lookup_lat_long
from helpers.slack_minor import slack_lookup_user_display

for leader in club_leaders.all():

    """
    This loop checks if the leader's profile is up to date and updates it if it isn't
    """

    print(leader)
    if leader['fields']['Slack ID'] != None:
        slack_data = slack_lookup_user_display(leader['fields']['Slack ID'])

        if slack_data != -1:
            if 'Pronouns' not in leader['fields'] and slack_data['pronouns']:
                club_leaders.update(
                    leader['id'], {'Pronouns': slack_data['pronouns']})
            if 'Website' not in leader['fields'] and slack_data['website']:
                club_leaders.update(
                    leader['id'], {'Website': slack_data['website']})
            if 'Scrapbook' not in leader['fields'] and slack_data['scrapbook']:
                club_leaders.update(
                    leader['id'], {'Scrapbook': slack_data['scrapbook']})
            if 'Avatar' not in leader['fields'] and slack_data['avatar']:
                club_leaders.update(
                    leader['id'], {'Avatar': slack_data['avatar']})
            if 'Github' not in leader['fields'] and slack_data['github']:
                club_leaders.update(
                    leader['id'], {'Github': slack_data['github']})

            print(f"Updated {leader['fields']['Name']}'s profile")

for club in clubs_table.all():

    """
    This loop checks if the club's profile (geo_data) is up to date and updates it if it isn't
    """

    print(club['fields'])

    look_up = lookup_lat_long(
        club['fields']['Latitude'][0], club['fields']['Longitude'][0])

    if 'Country' not in club['fields']:
        clubs_table.update(club['id'], {'Country': look_up['country'], 'Country Code': look_up['country_code'].upper(
        ), 'Continent': get_continent(look_up['country_code'].upper())})

    if 'Postcode' not in club['fields'] and 'postcode' in look_up:
        clubs_table.update(club['id'], {'Postcode': look_up['postcode']})

    if 'State' not in club['fields'] and 'state' in look_up:
        clubs_table.update(club['id'], {'State': look_up['state']})

    if 'State ISO Code' not in club['fields'] and 'ISO3166-2-lvl4' in look_up:
        clubs_table.update(
            club['id'], {'State ISO Code': look_up['ISO3166-2-lvl4']})

    if 'Continent' not in club['fields']:
        clubs_table.update(
            club['id'], {'Continent': get_continent(look_up['country_code'].upper())})

    print(look_up)
    print(f"Updated {club['fields']['Club Name']}'s profile")
