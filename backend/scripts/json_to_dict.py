import json
from rich import print

"""A little script to convert a JSON string to a Python dictionary for Slack's Block Kit Builder"""

di = json.loads("""{
	"type": "modal",
	"callback_id": "add_club",
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
				"text": "Add your Club",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "club_name_input",
			"element": {
				"type": "plain_text_input",
				"action_id": "club_name_input"
			},
			"label": {
				"type": "plain_text",
				"text": "Club Name",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "description_input",
			"element": {
				"type": "plain_text_input",
				"multiline": true,
				"action_id": "description_input"
			},
			"label": {
				"type": "plain_text",
				"text": "Description",
				"emoji": true
			}
		},
        {
			"type": "input",
            "block_id": "venue_select",
			"element": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select your venue",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "*Hello*",
							"emoji": true
						},
						"value": "value-0"
					}
				],
				"action_id": "venue_static_select-action"
			},
			"label": {
				"type": "plain_text",
				"text": "Select the Venue (contact Holly if you don't see yours)",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "socials_select",
			"optional": true,
			"element": {
				"type": "multi_static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": ":github:  Github",
							"emoji": true
						},
						"value": "Github"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":linkedin: LinkedIn",
							"emoji": true
						},
						"value": "LinkedIn"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":link: Club Website",
							"emoji": true
						},
						"value": "Website"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":scrappy: Scrapbook",
							"emoji": true
						},
						"value": "Scrapbook"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":twitter: Twitter",
							"emoji": true
						},
						"value": "Twitter"
					}
				],
				"action_id": "multi_static_select-action"
			},
			"label": {
				"type": "plain_text",
				"text": "Which socials do you want to enable for your club?",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "secondary_leaders_select",
			"optional": true,
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
		},
		{
			"type": "input",
			"block_id": "email_input",
			"element": {
				"type": "email_text_input",
				"action_id": "email_input"
			},
			"label": {
				"type": "plain_text",
				"text": "Primary Leader Email",
				"emoji": true
			}
		}
	]
}""")

print(di)
