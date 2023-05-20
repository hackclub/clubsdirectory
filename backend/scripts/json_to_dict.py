import json
from rich import print

"""A little script to convert a JSON string to a Python dictionary for Slack's Block Kit Builder"""

di = json.loads("""{
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
                    "block_id": "plain_text_input-action",
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

print(di)
