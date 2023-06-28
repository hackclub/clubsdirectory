from helpers.air_table import old_clubs_table
from helpers.geo import get_continent, lookup_lat_long

from pyairtable.formulas import match, AND

formula = match({"Status": "active"})


def update_old_clubs():

    print(formula)

    for club in old_clubs_table.all(formula=formula):
        if "Venue" not in club["fields"]:
            continue

        if "Status" not in club["fields"] or club["fields"]["Status"] != "active":
            continue

        if not "Latitude" in club["fields"] or not "Longitude" in club["fields"]:
            continue
 
        if "Continent" in club["fields"]:
            continue

        look_up = lookup_lat_long(
            club["fields"]["Latitude"], club["fields"]["Longitude"]
        )

        if "Address Country" in club["fields"] and "country" in look_up:
            if club["fields"]["Address Country"] != look_up["country"]:
                continue

            old_clubs_table.update(
                club["id"],
                {
                    "Continent": get_continent(look_up["country_code"].upper()),
                },
            )
        else:
            if "country" not in look_up:
                continue

            old_clubs_table.update(
                club["id"],
                {
                    "Address Country": look_up["country"],
                    "Continent": get_continent(look_up["country_code"].upper()),
                },
            )

    return True
