from helpers.air_table import club_leaders, clubs_table
from helpers.geo import get_continent, lookup_lat_long
from rich import print
from helpers.slack_minor import slack_lookup_user_display

for i in clubs_table.all():
    for j in i['fields']['Leaders Directory Link']:
        print(i['fields']['Club Name'])
        print(club_leaders.get(j))