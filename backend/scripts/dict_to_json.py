import json

"""A little script to convert a Python dictionary to a JSON string for Slack's Block Kit Builder"""

di = {'blocks': [{'type': 'section', 'text': {'type': 'mrkdwn', 'text': "Hey there! Don't forget to complete your club's <https://directory.hackclub.com|Directory> profile so you \ncan begin connecting with other clubs in your area! It's completely optional, but more complete club profiles means more \npossibilities for collaboration. Now you can even add links to your club socials! Here's a \n<https://hackclub.slack.com/archives/C0M8PUPU6/p1685541426188659|link> to how it works!"}}]}

print(json.dumps(di))