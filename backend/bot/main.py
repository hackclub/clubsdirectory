import os

from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from helpers.geo import get_continent, lookup_lat_long

from helpers.air_table import (
    check_if_leader,
    get_club_by_leader,
    get_airtable_rec_id_from_slack_id,
    get_all_leaders_for_club,
    get_primary_leader,
    get_secondary_leaders,
    fetch_waiting_clubs,
    approve_club_airtable,
)
from helpers.slack_minor import slack_lookup_user_display

from helpers.air_table import (
    club_leaders,
    clubs_table,
    get_old_club_from_leader,
    search_clubs,
    club_data_to_obj,
)


load_dotenv()

# Initializes your app with your bot token and socket mode handler
app = App(token=os.environ.get("SLACK_BOT_TOKEN"))


def home_tab_view_signed(club, primary_leader, secondary_leaders, socials):
    club = club_data_to_obj(club)
    sec_leaders_str = (
        " ".join("<@" + x["fields"]["Slack ID"] + ">" for x in secondary_leaders)
        if len(secondary_leaders) > 0
        else "No secondary leaders, add some!"
    )
    return {
        "type": "home",
        "blocks": [
            {
                "type": "header",
                "text": {"type": "plain_text", "text": "Directory Operations"},
            },
            # {
            #     "type": "actions",
            #     "elements": [
            #         {
            #             "type": "button",
            #             "text": {
            #                 "type": "plain_text",
            #                 "text": "Club Lookup",
            #                 "emoji": True,
            #             },
            #             "style": "primary",
            #             "value": "club_lookup",
            #             "action_id": "club_lookup",
            #         },
            #         {
            #             "type": "button",
            #             "text": {"type": "plain_text", "text": "Help", "emoji": True},
            #             "value": "help",
            #             "action_id": "help",
            #         },
            #     ],
            # },
            {"type": "section", "text": {"type": "mrkdwn", "text": "*Your Club*"}},
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f'*Club Name:* {club.name if club.name else "Not Provided"}',
                },
                "accessory": {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "Edit", "emoji": True},
                    "value": "edit_club_name",
                    "action_id": "edit_club_name",
                },
            },
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f'*Description:* {club.description if club.description else "Not Provided"}',
                },
                "accessory": {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "Edit", "emoji": True},
                    "value": "edit_description",
                    "action_id": "edit_description",
                },
            },
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f'*Primary Leader:* <@{primary_leader["fields"]["Slack ID"]}>',
                },
            },
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*Other Leaders:* {sec_leaders_str}",
                },
                "accessory": {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "Edit", "emoji": True},
                    "value": "edit_secondary_leaders",
                    "action_id": "edit_secondary_leaders",
                },
            },
            {"type": "divider"},
            {
                "type": "section",
                "text": {"type": "mrkdwn", "text": f'*Socials:* {", ".join(socials)}'},
                "accessory": {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "Edit", "emoji": True},
                    "value": "club_socials_to_display",
                    "action_id": "club_socials_to_display",
                },
            },
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f'*Github:* {club.socials.github if club.socials.github else "Not Provided"}',
                },
                "accessory": {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "Edit", "emoji": True},
                    "value": "edit_github",
                    "action_id": "edit_github",
                },
            },
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f'*LinkedIn:* {club.socials.linkedin if club.socials.linkedin else "Not Provided"}',
                },
                "accessory": {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "Edit", "emoji": True},
                    "value": "edit_linkedin",
                    "action_id": "edit_linkedin",
                },
            },
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f'*Twitter:* {club.socials.twitter if club.socials.twitter else "Not Provided"}',
                },
                "accessory": {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "Edit", "emoji": True},
                    "value": "edit_twitter",
                    "action_id": "edit_twitter",
                },
            },
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f'*Scrapbook:* {club.scrapbook if club.scrapbook else "Not Provided"}',
                },
                "accessory": {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "Edit", "emoji": True},
                    "value": "edit_scrapbook",
                    "action_id": "edit_scrapbook",
                },
            },
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f'*Club Website:* {club.website if club.website else "Not Provided"}',
                },
                "accessory": {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "Edit", "emoji": True},
                    "value": "edit_website",
                    "action_id": "edit_website",
                },
            },
            {"type": "divider"},
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": f'{"Hide" if club.to_display else "Unhide"} My Club',
                            "emoji": True,
                        },
                        "value": "hide_club",
                        "action_id": "hide_club",
                    }
                ],
            },
        ],
    }


def home_tab_view_non_signed():
    return {
        "type": "home",
        "blocks": [
            {
                "type": "header",
                "text": {"type": "plain_text", "text": "Directory Operations"},
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Add your Club",
                            "emoji": True,
                        },
                        "style": "primary",
                        "value": "add_club",
                        "action_id": "add_club",
                    },
                    # {
                    #     "type": "button",
                    #     "text": {
                    #         "type": "plain_text",
                    #         "text": "Club Lookup",
                    #         "emoji": True,
                    #     },
                    #     "value": "club_lookup",
                    #     "action_id": "club_lookup",
                    # },
                    # {
                    #     "type": "button",
                    #     "text": {"type": "plain_text", "text": "Help", "emoji": True},
                    #     "value": "help",
                    # },
                ],
            },
        ],
    }


@app.event("app_home_opened")
def initial_home_tab(client, event, logger):
    """
    This function publishes the initial home tab view when the app home is opened, option to edit info for leaders and option to add club for non-leaders
    """
    try:
        if check_if_leader(event["user"]):
            club = get_club_by_leader(event["user"])

            primary_leader = get_primary_leader(club["id"])
            secondary_leaders = get_secondary_leaders(club["id"])
            socials = club["fields"]["Socials to Display"]

            # Call views.publish with the built-in client
            client.views_publish(
                # Use the user ID associated with the event
                user_id=event["user"],
                # Home tabs must be enabled in your app configuration
                view=home_tab_view_signed(
                    club, primary_leader, secondary_leaders, socials
                ),
            )
        else:
            # Call views.publish with the built-in client
            client.views_publish(
                # Use the user ID associated with the event
                user_id=event["user"],
                # Home tabs must be enabled in your app configuration
                view=home_tab_view_non_signed(),
            )
    except Exception as e:
        logger.error(f"Error publishing home tab: {e}")


@app.action("club_socials_to_display")
def club_socials_to_display(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "club_socials",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Submit", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "section",
                    "block_id": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Which socials do you want to enable for your club?",
                    },
                    "accessory": {
                        "type": "multi_static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select",
                            "emoji": True,
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":github:  Github",
                                    "emoji": True,
                                },
                                "value": "Github",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":linkedin: LinkedIn",
                                    "emoji": True,
                                },
                                "value": "LinkedIn",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":link: Club Website",
                                    "emoji": True,
                                },
                                "value": "Website",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":scrappy: Scrapbook",
                                    "emoji": True,
                                },
                                "value": "Scrapbook",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":twitter: Twitter",
                                    "emoji": True,
                                },
                                "value": "Twitter",
                            },
                        ],
                        "action_id": "multi_static_select-action",
                    },
                }
            ],
        },
    )

    client.views_update(
        view_id=body["view"]["id"],
        view=home_tab_view_signed(
            get_club_by_leader(body["user"]["id"]),
            get_primary_leader(get_club_by_leader(body["user"]["id"])["id"]),
            get_secondary_leaders(get_club_by_leader(body["user"]["id"])["id"]),
            get_club_by_leader(body["user"]["id"])["fields"]["Socials to Display"],
        ),
    )


@app.action("edit_club_name")
def edit_club_name(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "edit_club_name",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Submit", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Edit Club Name",
                        "emoji": True,
                    },
                },
                {
                    "type": "input",
                    "block_id": "plain_text_input-action",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "plain_text_input-action",
                    },
                    "label": {"type": "plain_text", "text": "New Name", "emoji": True},
                },
            ],
        },
    )

    client.views_update(
        view_id=body["view"]["id"],
        view=home_tab_view_signed(
            get_club_by_leader(body["user"]["id"]),
            get_primary_leader(get_club_by_leader(body["user"]["id"])["id"]),
            get_secondary_leaders(get_club_by_leader(body["user"]["id"])["id"]),
            get_club_by_leader(body["user"]["id"])["fields"]["Socials to Display"],
        ),
    )


@app.action("edit_description")
def edit_description(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "edit_description",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Submit", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "input",
                    "block_id": "plain_text_input-action",
                    "element": {
                        "type": "plain_text_input",
                        "multiline": True,
                        "action_id": "plain_text_input-action",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "New Description",
                        "emoji": True,
                    },
                }
            ],
        },
    )

    client.views_update(
        view_id=body["view"]["id"],
        view=home_tab_view_signed(
            get_club_by_leader(body["user"]["id"]),
            get_primary_leader(get_club_by_leader(body["user"]["id"])["id"]),
            get_secondary_leaders(get_club_by_leader(body["user"]["id"])["id"]),
            get_club_by_leader(body["user"]["id"])["fields"]["Socials to Display"],
        ),
    )


@app.action("edit_secondary_leaders")
def edit_secondary_leaders(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "edit_secondary_leaders",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Done", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Edit Secondary Leaders",
                        "emoji": True,
                    },
                },
                {
                    "type": "input",
                    "block_id": "secondary_leaders_select",
                    "optional": True,
                    "element": {
                        "type": "multi_users_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select secondary leaders",
                            "emoji": True,
                        },
                        "action_id": "secondary_leaders_select",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Pick the leaders",
                        "emoji": True,
                    },
                },
            ],
        },
    )

    client.views_update(
        view_id=body["view"]["id"],
        view=home_tab_view_signed(
            get_club_by_leader(body["user"]["id"]),
            get_primary_leader(get_club_by_leader(body["user"]["id"])["id"]),
            get_secondary_leaders(get_club_by_leader(body["user"]["id"])["id"]),
            get_club_by_leader(body["user"]["id"])["fields"]["Socials to Display"],
        ),
    )


@app.view("edit_secondary_leaders")
def handle_edit_secondary_leaders_select(ack, body, client, logger):
    ack()
    req_user = body["user"]["id"]

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    user_list = body["view"]["state"]["values"]["secondary_leaders_select"][
        "secondary_leaders_select"
    ]["selected_users"]

    # Check if every user is a leader and if not, add Airtable record
    for user in user_list:
        if not check_if_leader(user):
            # fetch airtable user
            slack_user = slack_lookup_user_display(user)
            if slack_user == -1:
                continue
            club_leaders.create(
                {
                    "Name": slack_user["name"],
                    "Slack ID": user,
                    "Email": "hello@example.com",
                    "Pronouns": slack_user["pronouns"],
                    "Is Primary": False,
                    "To Display": ["Email", "Twitter"],
                    "Website": slack_user["website"],
                    "Scrapbook": slack_user["scrapbook"],
                    "Github": slack_user["github"],
                    "LinkedIn": None,
                    "Twitter": None,
                    "Avatar": slack_user["avatar"],
                    "Club Link": [club["id"]],
                }
            )

        else:
            club_leaders.update(
                get_airtable_rec_id_from_slack_id(user), {"Club Link": [club["id"]]}
            )

    # Remove all other secondary leaders from club
    for leader in get_all_leaders_for_club(club["id"]):
        if (
            leader["fields"]["Slack ID"] not in user_list
            and "Is Primary" not in leader["fields"]
        ):
            club_leaders.delete(leader["id"])

    client.views_update(
        view_id=body["view"]["id"],
        view=home_tab_view_signed(
            get_club_by_leader(body["user"]["id"]),
            get_primary_leader(get_club_by_leader(body["user"]["id"])["id"]),
            get_secondary_leaders(get_club_by_leader(body["user"]["id"])["id"]),
            get_club_by_leader(body["user"]["id"])["fields"]["Socials to Display"],
        ),
    )


@app.view("edit_club_name")
def handle_edit_club_name(ack, body, client, logger):
    ack()
    req_user = body["user"]["id"]

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    new_name = body["view"]["state"]["values"]["plain_text_input-action"][
        "plain_text_input-action"
    ]["value"]

    clubs_table.update(club["id"], {"Club Name": new_name})

    client.views_update(
        view_id=body["view"]["id"],
        view=home_tab_view_signed(
            get_club_by_leader(body["user"]["id"]),
            get_primary_leader(get_club_by_leader(body["user"]["id"])["id"]),
            get_secondary_leaders(get_club_by_leader(body["user"]["id"])["id"]),
            get_club_by_leader(body["user"]["id"])["fields"]["Socials to Display"],
        ),
    )


@app.view("edit_description")
def handle_edit_description(ack, body, client, logger):
    ack()
    req_user = body["user"]["id"]

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    new_description = body["view"]["state"]["values"]["plain_text_input-action"][
        "plain_text_input-action"
    ]["value"]

    clubs_table.update(club["id"], {"Description": new_description})

    client.views_update(
        view_id=body["view"]["id"],
        view=home_tab_view_signed(
            get_club_by_leader(body["user"]["id"]),
            get_primary_leader(get_club_by_leader(body["user"]["id"])["id"]),
            get_secondary_leaders(get_club_by_leader(body["user"]["id"])["id"]),
            get_club_by_leader(body["user"]["id"])["fields"]["Socials to Display"],
        ),
    )


@app.action("multi_static_select-action")
def socials_multi_select(ack):
    """This function doesn't do anything just used to prevent errors on the Slack Side"""
    ack()
    pass


@app.view("club_socials")
def handle_view_submission_events(ack, body, logger):
    ack()
    req_user = body["user"]["id"]

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)
    clubs_table.update(
        club["id"],
        {
            "Socials to Display": [
                x["value"]
                for x in body["view"]["state"]["values"]["section"][
                    "multi_static_select-action"
                ]["selected_options"]
            ]
        },
    )


@app.action("hide_club")
def hide_club(ack, body, client, logger):
    ack()
    req_user = body["user"]["id"]

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    clubs_table.update(
        club["id"], {"To Display": False if "To Display" in club["fields"] else True}
    )

    client.views_update(
        view_id=body["view"]["id"],
        view=home_tab_view_signed(
            get_club_by_leader(body["user"]["id"]),
            get_primary_leader(get_club_by_leader(body["user"]["id"])["id"]),
            get_secondary_leaders(get_club_by_leader(body["user"]["id"])["id"]),
            get_club_by_leader(body["user"]["id"])["fields"]["Socials to Display"],
        ),
    )


@app.action("add_club")
def add_a_club_handler(ack, body, client, logger):
    ack()
    req_user = body["user"]["id"]

    old_club_from_leader = get_old_club_from_leader(req_user)

    if not old_club_from_leader:
        client.views_open(
            trigger_id=body["trigger_id"],
            view={
                "type": "modal",
                "title": {
                    "type": "plain_text",
                    "text": "Clubs Directory",
                    "emoji": True,
                },
                "submit": {"type": "plain_text", "text": "Ok", "emoji": True},
                "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": "Couldn't find your club!",
                            "emoji": True,
                        },
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Either you are not a leader or your club isn't linked to your Slack ID, please contact <@U03M1H014CX> for help!",
                        },
                    },
                ],
            },
        )

        return

    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "callback_id": "add_club_modal",
            "type": "modal",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Submit", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Add your Club!",
                        "emoji": True,
                    },
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Records Indicate that your club's data is as follows.",
                    },
                },
                {
                    "type": "input",
                    "block_id": "club_name",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "club_name_input",
                    },
                    "label": {"type": "plain_text", "text": "Club Name", "emoji": True},
                },
                {
                    "type": "input",
                    "optional": True,
                    "block_id": "club_description",
                    "element": {
                        "type": "plain_text_input",
                        "multiline": True,
                        "action_id": "club_description_action",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Club Description",
                        "emoji": True,
                    },
                },
                {
                    "type": "input",
                    "block_id": "club_socials",
                    "optional": True,
                    "element": {
                        "type": "multi_static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select socials",
                            "emoji": True,
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":github: Github",
                                    "emoji": True,
                                },
                                "value": "Github",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":linkedin: LinkedIn",
                                    "emoji": True,
                                },
                                "value": "LinkedIn",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":twitter: Twitter",
                                    "emoji": True,
                                },
                                "value": "Twitter",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":scrappy: Scrapbook",
                                    "emoji": True,
                                },
                                "value": "Scrapbook",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":link: Website",
                                    "emoji": True,
                                },
                                "value": "Website",
                            },
                        ],
                        "action_id": "socials_to_display_action",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Socials to Display",
                        "emoji": True,
                    },
                },
                {
                    "type": "input",
                    "block_id": "secondary_leaders_select",
                    "optional": True,
                    "element": {
                        "type": "multi_users_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select secondary leaders",
                            "emoji": True,
                        },
                        "action_id": "secondary_leaders_select",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Select Secondary Leaders",
                        "emoji": True,
                    },
                },
                {
                    "type": "input",
                    "block_id": "primary_email_input",
                    "element": {
                        "type": "email_text_input",
                        "action_id": "primary_email",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Primary Leader Email",
                        "emoji": True,
                    },
                },
            ],
        },
    )


@app.view("add_club_modal")
def handle_add_club_submission(ack, body, client, logger):
    ack()

    club_name = body["view"]["state"]["values"]["club_name"]["club_name_input"]["value"]
    club_description = body["view"]["state"]["values"]["club_description"][
        "club_description_action"
    ]["value"]
    club_socials = [
        x["value"]
        for x in body["view"]["state"]["values"]["club_socials"][
            "socials_to_display_action"
        ]["selected_options"]
    ]
    secondary_leaders = body["view"]["state"]["values"]["secondary_leaders_select"][
        "secondary_leaders_select"
    ]["selected_users"]
    primary_email = body["view"]["state"]["values"]["primary_email_input"][
        "primary_email"
    ]["value"]
    old_club_record = get_old_club_from_leader(body["user"]["id"])

    geo_data = lookup_lat_long(
        old_club_record["fields"]["Latitude"], old_club_record["fields"]["Longitude"]
    )

    club = clubs_table.create(
        {
            "Club Name": club_name,
            "Description": club_description,
            "Socials to Display": club_socials,
            "Club Venue": [old_club_record["id"]],
            "To Display": True,
            "Country": geo_data["country"],
            "Country Code": geo_data["country_code"].upper(),
            "State ISO Code": geo_data["ISO3166-2-lvl4"]
            if "ISO3166-2-lvl4" in geo_data
            else None,
            "State": geo_data["state"] if "state" in geo_data else None,
            "Postcode": geo_data["postcode"] if "postcode" in geo_data else None,
            "Continent": get_continent(geo_data["country_code"].upper()),
        }
    )

    for leader in secondary_leaders:
        slack_user = slack_lookup_user_display(leader)
        club_leaders.create(
            {
                "Name": slack_user["name"],
                "Club Link": [club["id"]],
                "Is Primary": False,
                "Email": "hello@example.com",
                "Slack ID": leader,
                "To Display": ["Email"],
                "Pronouns": slack_user["pronouns"]
                if "pronouns" in slack_user
                else None,
                "Avatar": slack_user["avatar"],
                "Github": slack_user["github"] if "github" in slack_user else None,
                "Website": slack_user["website"] if "website" in slack_user else None,
            }
        )

    slack_user = slack_lookup_user_display(body["user"]["id"])
    club_leaders.create(
        {
            "Name": slack_lookup_user_display(body["user"]["id"])["name"],
            "Club Link": [club["id"]],
            "Is Primary": True,
            "Email": primary_email,
            "Slack ID": body["user"]["id"],
            "To Display": ["Email"],
            "Pronouns": slack_user["pronouns"] if "pronouns" in slack_user else None,
            "Avatar": slack_user["avatar"],
            "Github": slack_user["github"] if "github" in slack_user else None,
            "Website": slack_user["website"] if "website" in slack_user else None,
        }
    )

    client.chat_postMessage(
        channel=body["user"]["id"],
        text=f"Your club has been created! You can view it once it's been approved by HQ!",
    )

    client.chat_postMessage(
        channel="C05ABUJ1BPF",
        text=f"Club {club_name} has been created by <@{body['user']['id']}>, seeking approval!",
    )


@app.command("/approve")
def approve_club(ack, respond, command, client, body):
    ack()

    if body["user_id"] not in [
        "U0409FSKU82",
        "U03M1H014CX",
        "U041FQB8VK2",
        "U04QH1TTMBP",
        "U0C7B14Q3",
    ]:
        respond("You don't have permission to do this!")
        return

    clubs_waiting = fetch_waiting_clubs()

    if len(clubs_waiting) == 0:
        respond("There are no clubs waiting for approval!")
        return

    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "approve_club",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Submit", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "section",
                    "block_id": "checkboxes-waiting",
                    "text": {
                        "type": "mrkdwn",
                        "text": "These are the clubs awaiting approval.",
                    },
                    "accessory": {
                        "type": "checkboxes",
                        "options": [
                            {
                                "text": {
                                    "type": "mrkdwn",
                                    "text": f'*{club["fields"]["Club Name"]}*',
                                },
                                "description": {
                                    "type": "mrkdwn",
                                    "text": f'{club["fields"]["Description"] if "Description" in club["fields"] else "No Description"}',
                                },
                                "value": f'{club["fields"]["ID"]}',
                            }
                            for club in clubs_waiting
                        ],
                        "action_id": "checkboxes-action",
                    },
                }
            ],
        },
    )


@app.view("approve_club")
def handle_approve_club(ack, body, client, logger):
    ack()

    clubs_to_approve = [
        x["value"]
        for x in body["view"]["state"]["values"]["checkboxes-waiting"][
            "checkboxes-action"
        ]["selected_options"]
    ]

    for club in clubs_to_approve:
        approve_club_airtable(club)

    client.chat_postMessage(
        channel=body["user"]["id"],
        text=f"Club(s) have been approved!",
    )


@app.action("checkboxes-action")
def placeholder_to_prevent_error_sign(ack, body, logger):
    ack()
    pass


@app.command("/lookup")
def lookup_club(ack, respond, command, client, body):
    ack()

    club_name = command["text"]

    club_search = search_clubs(club_name)

    if len(club_search) == 0:
        respond("No club found!")
        return

    clubs = []
    for c in club_search:
        club = club_data_to_obj(c)

        if not club.to_display:
            continue

        primary_leader = None

        for leader in club.leaders:
            if leader.is_primary:
                primary_leader = leader

        if not primary_leader:
            continue

        clubs.append(
            {
                "type": "header",
                "text": {"type": "plain_text", "text": club.name, "emoji": True},
            },
        )

        clubs.append(
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f'{club.description if club.description else "No Description"} \n *Venue:* {club.venue} \n *Primary Leader:* <@{primary_leader.slack_id}>',
                },
            }
        )

        clubs.append(
            {
                "type": "divider",
            }
        )

    respond(
        blocks=clubs,
    )


@app.view("lookup_club")
def handle_lookup_club(ack):
    ack()
    pass


@app.action("edit_github")
def handle_edit_github(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "edit_github",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Submit", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Edit Github",
                        "emoji": True,
                    },
                },
                {
                    "type": "input",
                    "block_id": "url_text_input-action",
                    "optional": True,
                    "element": {
                        "type": "url_text_input",
                        "action_id": "url_text_input-action",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "New Github",
                        "emoji": True,
                    },
                },
            ],
        },
    )

    client.views_update(
        view_id=body["view"]["id"],
        view=home_tab_view_signed(
            get_club_by_leader(body["user"]["id"]),
            get_primary_leader(get_club_by_leader(body["user"]["id"])["id"]),
            get_secondary_leaders(get_club_by_leader(body["user"]["id"])["id"]),
            get_club_by_leader(body["user"]["id"])["fields"]["Socials to Display"],
        ),
    )


@app.view("edit_github")
def handle_edit_github(ack, body, client, logger):
    ack()
    req_user = body["user"]["id"]

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    new_github = body["view"]["state"]["values"]["url_text_input-action"][
        "url_text_input-action"
    ]

    if "value" not in new_github:
        new_github = None
    else:
        new_github = new_github["value"]

    club_leaders.update(club["id"], {"Github": new_github})


@app.action("edit_linkedin")
def handle_edit_linkedin(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "edit_linkedin",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Submit", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Edit LinkedIn",
                        "emoji": True,
                    },
                },
                {
                    "type": "input",
                    "block_id": "url_text_input-action",
                    "optional": True,
                    "element": {
                        "type": "url_text_input",
                        "action_id": "url_text_input-action",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "New LinkedIn",
                        "emoji": True,
                    },
                },
            ],
        },
    )


@app.view("edit_linkedin")
def handle_edit_linkedin(ack, body, client, logger):
    ack()
    req_user = body["user"]["id"]

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    new_linkedin = body["view"]["state"]["values"]["url_text_input-action"][
        "url_text_input-action"
    ]

    if "value" not in new_linkedin:
        new_linkedin = None
    else:
        new_linkedin = new_linkedin["value"]

    club_leaders.update(club["id"], {"LinkedIn": new_linkedin})


@app.action("edit_website")
def handle_edit_website(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "edit_website",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Submit", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Edit Website",
                        "emoji": True,
                    },
                },
                {
                    "type": "input",
                    "block_id": "url_text_input-action",
                    "optional": True,
                    "element": {
                        "type": "url_text_input",
                        "action_id": "url_text_input-action",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "New Website",
                        "emoji": True,
                    },
                },
            ],
        },
    )


@app.view("edit_website")
def handle_edit_website(ack, body, client, logger):
    ack()
    req_user = body["user"]["id"]

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    new_website = body["view"]["state"]["values"]["url_text_input-action"][
        "url_text_input-action"
    ]

    if "value" not in new_website:
        new_website = None
    else:
        new_website = new_website["value"]

    club_leaders.update(club["id"], {"Website": new_website})


@app.action("edit_twitter")
def handle_edit_twitter(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "edit_twitter",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Submit", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Edit Twitter",
                        "emoji": True,
                    },
                },
                {
                    "type": "input",
                    "block_id": "url_text_input-action",
                    "optional": True,
                    "element": {
                        "type": "url_text_input",
                        "action_id": "url_text_input-action",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "New Twitter",
                        "emoji": True,
                    },
                },
            ],
        },
    )


@app.view("edit_twitter")
def handle_edit_twitter(ack, body, client, logger):
    ack()
    req_user = body["user"]["id"]

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    new_twitter = body["view"]["state"]["values"]["url_text_input-action"][
        "url_text_input-action"
    ]

    if "value" not in new_twitter:
        new_twitter = None
    else:
        new_twitter = new_twitter["value"]

    club_leaders.update(club["id"], {"Twitter": new_twitter})


@app.action("edit_scrapbook")
def handle_edit_scrapbook(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "edit_scrapbook",
            "title": {"type": "plain_text", "text": "Clubs Directory", "emoji": True},
            "submit": {"type": "plain_text", "text": "Submit", "emoji": True},
            "close": {"type": "plain_text", "text": "Cancel", "emoji": True},
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Edit Scrapbook",
                        "emoji": True,
                    },
                },
                {
                    "type": "input",
                    "block_id": "url_text_input-action",
                    "optional": True,
                    "element": {
                        "type": "url_text_input",
                        "action_id": "url_text_input-action",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "New Scrapbook",
                        "emoji": True,
                    },
                },
            ],
        },
    )


@app.view("edit_scrapbook")
def handle_edit_scrapbook(ack, body, client, logger):
    ack()
    req_user = body["user"]["id"]

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    new_scrapbook = body["view"]["state"]["values"]["url_text_input-action"][
        "url_text_input-action"
    ]

    if "value" not in new_scrapbook:
        new_scrapbook = None
    else:
        new_scrapbook = new_scrapbook["value"]

    club_leaders.update(club["id"], {"Scrapbook": new_scrapbook})


# Start your app
if __name__ == "__main__":
    SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"]).start()
