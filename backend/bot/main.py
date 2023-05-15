import os

import json
from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

from helpers.air_table import check_if_leader

load_dotenv()

# Initializes your app with your bot token and socket mode handler
app = App(token=os.environ.get("SLACK_BOT_TOKEN"))


@app.command("/echo")
def repeat_text(ack, respond, command):
    # Acknowledge command request
    ack()
    respond(f"{command['text']}")


@app.event("app_home_opened")
def initial_home_tab(client, event, logger):
    """
    This function publishes the initial home tab view when the app home is opened, option to edit info for leaders and option to add club for non-leaders
    """
    try:

        if check_if_leader(event["user"]):
            # Call views.publish with the built-in client
            client.views_publish(
                # Use the user ID associated with the event
                user_id=event["user"],
                # Home tabs must be enabled in your app configuration
                view=json.loads("""{
                "type": "home",
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": "Directory Operations"
                        }
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Club Lookup",
                                    "emoji": true
                                },
                                "style": "primary",
                                "value": "club_lookup"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Help",
                                    "emoji": true
                                },
                                "value": "help"
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Your Club*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Club Name:* "
                        },
                        "accessory": {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Edit",
                                "emoji": true
                            },
                            "value": "edit_club_name"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Description:* "
                        },
                        "accessory": {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Edit",
                                "emoji": true
                            },
                            "value": "edit_description"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Primary Leader:* <@U0409FSKU82>"
                        },
                        "accessory": {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Edit",
                                "emoji": true
                            },
                            "value": "edit_primary_leader"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Other Leaders:* <@U0409FSKU82>, <@U0409FSKU82>"
                        },
                        "accessory": {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Edit",
                                "emoji": true
                            },
                            "value": "edit_secondary_leaders"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Hide My Club",
                                    "emoji": true
                                },
                                "value": "hide_club"
                            }
                        ]
                    }
                ]
            }"""))
        else:
            # Call views.publish with the built-in client
            client.views_publish(
                # Use the user ID associated with the event
                user_id=event["user"],
                # Home tabs must be enabled in your app configuration
                view=json.loads("""{
                "type": "home",
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": "Directory Operations"
                        }
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Add your Club",
                                    "emoji": true
                                },
                                "style": "primary",
                                "value": "add_club"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Club Lookup",
                                    "emoji": true
                                },
                                "value": "club_lookup"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Help",
                                    "emoji": true
                                },
                                "value": "help"
                            }
                        ]
                    }
                ]
            }"""))
    except Exception as e:
        logger.error(f"Error publishing home tab: {e}")


@app.action("edit_club_name")
def edit_club_name(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view=json.loads("""{
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "Clubs Directory",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Edit Club Name",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "plain_text_input-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "New Name",
                        "emoji": true
                    }
                }
            ]
        }""")
    )


@app.action("edit_description")
def edit_description(ack, body, client, logger):
    pass

# Start your app
if __name__ == '__main__':
    SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"]).start()
