import json

"""A little script to convert a Python dictionary to a JSON string for Slack's Block Kit Builder"""

di = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": '*Github:* Ho',
                    "accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Click Me",
					"emoji": True
				},
				"value": "click_me_123",
				"action_id": "button-action"
			}
                },
            },

print(json.dumps(di))