import json
from rich import print

"""A little script to convert a JSON string to a Python dictionary for Slack's Block Kit Builder"""

di = json.loads("""{
	"type": "modal",
	"title": {
		"type": "plain_text",
		"text": "Clubs Directory",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Ok",
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
				"text": "Add your Club!",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Records Indicate that your club's data is as follows."
			}
		},
		{
			"type": "input",
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
			"optional": true,
			"element": {
				"type": "plain_text_input",
				"multiline": true,
				"action_id": "club_description_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Club Description",
				"emoji": true
			}
		},
		{
			"type": "input",
			"optional": true,
			"element": {
				"type": "multi_static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select socials",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": ":github: Github",
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
							"text": ":twitter: Twitter",
							"emoji": true
						},
						"value": "Twitter"
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
							"text": ":link: Website",
							"emoji": true
						},
						"value": "Website"
					}
				],
				"action_id": "socials_to_display_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Socials to Display",
				"emoji": true
			}
		},
		{
			"type": "input",
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
				"text": "Select Secondary Leaders",
				"emoji": true
			}
		},
		{
			"type": "input",
			"element": {
				"type": "email_text_input",
				"action_id": "primary_email"
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
