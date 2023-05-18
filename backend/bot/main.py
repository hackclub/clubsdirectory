import os

import json
from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

from helpers.air_table import check_if_leader, get_club_by_leader, get_airtable_rec_id_from_slack_id, get_all_leaders_for_club
from helpers.classes import Leader, ClubElement
from helpers.slack_minor import slack_lookup_full_user, slack_lookup_user_display

from helpers.air_table import club_leaders, clubs_table



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
                    "value": "club_lookup",
                    "action_id": "club_lookup"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Help",
                        "emoji": true
                    },
                    "value": "help",
                    "action_id": "help"
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
                "value": "edit_club_name",
                "action_id": "edit_club_name"
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
                "value": "edit_description",
                "action_id": "edit_description"
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
                "value": "edit_secondary_leaders",
                "action_id": "edit_secondary_leaders"
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
                    "value": "hide_club",
                    "action_id": "hide_club"
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
                                "value": "add_club",
                                "action_id": "add_club"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Club Lookup",
                                    "emoji": true
                                },
                                "value": "club_lookup",
                                "action_id": "club_lookup"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Help",
                                    "emoji": true
                                },
                                "value": "help",
                                "action_id": "help"
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
            "callback_id": "edit_club_name",
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
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view=json.loads("""{
	"type": "modal",
    "callback_id": "edit_description",
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
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"multiline": true,
				"action_id": "plain_text_input-action"
			},
			"label": {
				"type": "plain_text",
				"text": "New Description",
				"emoji": true
			}
		}
	]
}""")
    )

@app.action("edit_secondary_leaders")
def edit_secondary_leaders(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view=json.loads("""{
	"type": "modal",
    "callback_id": "edit_secondary_leaders",
	"title": {
		"type": "plain_text",
		"text": "Clubs Directory",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Done",
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
				"text": "Edit Secondary Leaders",
				"emoji": true
			}
		},
		{
			"type": "input",
            "block_id": "secondary_leaders_select",
			"element": {
				"type": "multi_users_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select secondary leaders",
					"emoji": true
				},
				"action_id": "secondary_leaders_select"
			},
			"label": {
				"type": "plain_text",
				"text": "Pick the leaders",
				"emoji": true
			}
		}
	]
}""")
    )

@app.view("edit_secondary_leaders")
def handle_edit_secondary_leaders_select(ack, body, logger):
    ack()
    req_user = body['user']['id']

    if not check_if_leader(req_user):
        return
    
    club = get_club_by_leader(req_user)

    user_list = body['view']['state']['values']['secondary_leaders_select']['secondary_leaders_select']['selected_users']

    # Check if every user is a leader and if not, add Airtable record
    for user in user_list:
        if not check_if_leader(user):
            # fetch airtable user
            slack_user = slack_lookup_user_display(user)
            if slack_user == -1:
                continue
            club_leaders.create({'Name': slack_user['name'], 'Slack ID': user, 'Email': 'hello@example.com', 'Pronouns': slack_user['pronouns'], 'Is Primary': False, 'To Display': ['Email', 'Twitter'], 'Website': slack_user['website'], 'Scrapbook': slack_user['scrapbook'], 'Github': slack_user['github'], 'LinkedIn': None, 'Twitter': None, 'Avatar': slack_user['avatar'], 'Club Link': [club['id']]})

        else:
            club_leaders.update(get_airtable_rec_id_from_slack_id(user), {'Club Link': [club['id']]})

    # Remove all other secondary leaders from club
    for leader in get_all_leaders_for_club(club['id']):
        if leader['fields']['Slack ID'] not in user_list and leader['fields']['Is Primary'] == False:
            club_leaders.delete(leader['id'])


    

# Start your app
if __name__ == '__main__':
    SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"]).start()
