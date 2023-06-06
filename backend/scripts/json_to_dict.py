import json
from rich import print

"""A little script to convert a JSON string to a Python dictionary for Slack's Block Kit Builder"""

di = json.loads("""{
	"type": "modal",
	"title": {
		"type": "plain_text",
		"text": "Approve Club",
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
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "These are the clubs awaiting approval."
			},
			"accessory": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "mrkdwn",
							"text": "*Club Name*"
						},
						"description": {
							"type": "mrkdwn",
							"text": "*Ledaer*- Leader name"
						},
						"value": "club-id"
					}
				],
				"action_id": "checkboxes-action"
			}
		}
	]
}""")

print(di)
