# Description: This script is used to update the club leaders table with the latest information from slack

from helpers.slack import slack_lookup_user
from rich import print  # ! Remove this line in production
from helpers.air_table import club_leaders

for leader in club_leaders.all():

    if leader['fields']['Slack ID'] != None:
        slack_data = slack_lookup_user(leader['fields']['Slack ID'])

        if slack_data != -1:
            if 'Pronouns' not in leader['fields'] and slack_data['pronouns']:
                club_leaders.update(leader['id'], {'Pronouns': slack_data['pronouns']})
            if 'Website' not in leader['fields'] and slack_data['website']:
                club_leaders.update(leader['id'], {'Website': slack_data['website']})
            if 'Scrapbook' not in leader['fields'] and slack_data['scrapbook']:
                club_leaders.update(leader['id'], {'Scrapbook': slack_data['scrapbook']})
            if 'Avatar' not in leader['fields'] and slack_data['avatar']:
                club_leaders.update(leader['id'], {'Avatar': slack_data['avatar']})
            if 'Github' not in leader['fields'] and slack_data['github']:
                club_leaders.update(leader['id'], {'Github': slack_data['github']})

            print(f"Updated {leader['fields']['Name']}'s profile")