from helpers.air_table import old_clubs_table
from helpers.geo import get_continent, lookup_lat_long
from rich import print
from pyairtable.formulas import match, AND

formula = AND(match({"Status": "active"}), "NOT({Latitude} = BLANK())")

count = 0
total = len(old_clubs_table.all(formula=formula))

for club in old_clubs_table.all(formula=formula):
    if "Venue" not in club["fields"]:
        print(club["fields"])
        continue

    if "Status" not in club["fields"] or club["fields"]["Status"] != "active":
        print(club["fields"]["Venue"], "not active")
        continue

    if not "Latitude" in club["fields"] or not "Longitude" in club["fields"]:
        print(club["fields"]["Venue"], "no lat long")
        continue

    if "Continent" in club["fields"]:
        continue

    look_up = lookup_lat_long(club["fields"]["Latitude"], club["fields"]["Longitude"])

    if "Address Country" in club["fields"] and "country" in look_up:
        if club["fields"]["Address Country"] != look_up["country"]:
            print(club["fields"]["Venue"], "country wrong")
            continue

        old_clubs_table.update(
            club["id"],
            {
                "Continent": get_continent(look_up["country_code"].upper()),
            },
        )
        print(club["fields"]["Venue"], "country correct")
    else:
        if "country" not in look_up:
            print(club["fields"]["Venue"], "no country")
            continue

        old_clubs_table.update(
            club["id"],
            {
                "Address Country": look_up["country"],
                "Continent": get_continent(look_up["country_code"].upper()),
            },
        )
        print(club["fields"]["Venue"], "country updated")

    count += 1
    print(f"{count}/{total}")
