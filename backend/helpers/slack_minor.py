# Description: This file contains functions that interact with the Slack API, it may or may not be used in the final version of the project.

import os

from dotenv import load_dotenv
from slack_sdk import WebClient
import slack_sdk.errors

load_dotenv()

SLACK_BOT_TOKEN = os.environ["SLACK_BOT_TOKEN"]

client = WebClient(token= SLACK_BOT_TOKEN)

def slack_lookup_user(user_id):
    """
    This function takes a slack user id and returns a dictionary of the user's profile information
    """

    try: 
        response = client.users_profile_get(user=user_id)
        data = {}

        data['name'] = response['profile']['real_name']

        try:
            data['pronouns'] = response['profile']['fields']['XfD4V9MG3V']['value']
        except KeyError:
            data['pronouns'] = None

        try:
            data['website'] = response['profile']['fields']['Xf5LNGS86L']['value']
        except KeyError:
            data['website'] = None

        try:
            data['scrapbook'] = response['profile']['fields']['Xf017187T1MW']['value']
        except KeyError:
            data['scrapbook'] = None

        try:
            data['github'] = response['profile']['fields']['Xf0DMHFDQA']['value']
        except KeyError:
            data['github'] = None

        try:
            data['avatar'] = response['profile']['image_original']
        except KeyError:
            data['avatar'] = None

        return data


    except slack_sdk.errors.SlackApiError:
       return -1