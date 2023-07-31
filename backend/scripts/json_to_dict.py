import json
from rich import print

"""A little script to convert a JSON string to a Python dictionary for Slack's Block Kit Builder"""

di = json.loads(
    """{
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Hey there! Don't forget to complete your club's <https://directory.hackclub.com|Directory> profile so you can begin connecting with other clubs in your area! It's completely optional, but more complete club profiles means more possibilities for collaboration. Now you can even add links to your club socials! Here's a <https://hackclub.slack.com/archives/C0M8PUPU6/p1685541426188659|link> to how it works!"
			}
		}
	]
}"""
)

print(di)
