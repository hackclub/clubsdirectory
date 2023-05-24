import os

from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

from helpers.air_table import check_if_leader, get_club_by_leader, get_airtable_rec_id_from_slack_id, get_all_leaders_for_club, get_primary_leader, get_secondary_leaders
from helpers.slack_minor import slack_lookup_user_display

from helpers.air_table import club_leaders, clubs_table


load_dotenv()

# Initializes your app with your bot token and socket mode handler
app = App(token=os.environ.get("SLACK_BOT_TOKEN"))


def home_tab_view_signed(club, primary_leader, secondary_leaders, socials):
    sec_leaders_str = " ".join("<@" + x['fields']['Slack ID'] + ">" for x in secondary_leaders) if len(
        secondary_leaders) > 0 else "No secondary leaders, add some!"
    return {
        'type': 'home',
        'blocks': [
            {'type': 'header', 'text': {
                'type': 'plain_text', 'text': 'Directory Operations'}},
            {
                'type': 'actions',
                'elements': [
                    {
                        'type': 'button',
                        'text': {'type': 'plain_text', 'text': 'Club Lookup', 'emoji': True},
                        'style': 'primary',
                        'value': 'club_lookup',
                        'action_id': 'club_lookup'
                    },
                    {'type': 'button', 'text': {'type': 'plain_text', 'text': 'Help',
                                                'emoji': True}, 'value': 'help', 'action_id': 'help'}
                ]
            },
            {'type': 'section', 'text': {
                'type': 'mrkdwn', 'text': '*Your Club*'}},
            {'type': 'divider'},
            {
                'type': 'section',
                'text': {'type': 'mrkdwn', 'text': f'*Club Name:* {club["fields"]["Club Name"]}'},
                'accessory': {
                    'type': 'button',
                    'text': {'type': 'plain_text', 'text': 'Edit', 'emoji': True},
                    'value': 'edit_club_name',
                    'action_id': 'edit_club_name'
                }
            },
            {'type': 'divider'},
            {
                'type': 'section',
                'text': {'type': 'mrkdwn', 'text': f'*Description:* {club["fields"]["Description"] if "Description" in club["fields"] else "No description yet!"}'},
                'accessory': {
                    'type': 'button',
                    'text': {'type': 'plain_text', 'text': 'Edit', 'emoji': True},
                    'value': 'edit_description',
                    'action_id': 'edit_description'
                }
            },
            {'type': 'divider'},
            {'type': 'section', 'text': {'type': 'mrkdwn',
                                         'text': f'*Primary Leader:* <@{primary_leader["fields"]["Slack ID"]}>'}},
            {'type': 'divider'},
            {
                'type': 'section',
                'text': {'type': 'mrkdwn', 'text': f'*Other Leaders:* {sec_leaders_str}'},
                'accessory': {
                    'type': 'button',
                    'text': {'type': 'plain_text', 'text': 'Edit', 'emoji': True},
                    'value': 'edit_secondary_leaders',
                    'action_id': 'edit_secondary_leaders'
                }
            },
            {'type': 'divider'},
            {'type': 'section', 'text': {'type': 'mrkdwn', 'text': f'*Socials:* {", ".join(socials)}'}, 'accessory': {
                'type': 'button', 'text': {'type': 'plain_text', 'text': 'Edit', 'emoji': True}, 'value': 'club_socials_to_display', 'action_id': 'club_socials_to_display'}},
            {'type': 'divider'},
            {
                'type': 'actions',
                'elements': [
                    {'type': 'button', 'text': {'type': 'plain_text', 'text': f'{"Hide" if "To Display" in club["fields"] else "Unhide"} My Club',
                                                'emoji': True}, 'value': 'hide_club', 'action_id': 'hide_club'}
                ]
            }
        ]
    }


def home_tab_view_non_signed():
    return {
        'type': 'home',
        'blocks': [
            {'type': 'header', 'text': {
                'type': 'plain_text', 'text': 'Directory Operations'}},
            {
                'type': 'actions',
                'elements': [
                    {
                        'type': 'button',
                        'text': {'type': 'plain_text', 'text': 'Add your Club', 'emoji': True},
                        'style': 'primary',
                        'value': 'add_club',
                        'action_id': 'add_club'
                    },
                    {
                        'type': 'button',
                        'text': {'type': 'plain_text', 'text': 'Club Lookup', 'emoji': True},
                        'value': 'club_lookup',
                        'action_id': 'club_lookup'
                    },
                    {'type': 'button', 'text': {'type': 'plain_text',
                                                'text': 'Help', 'emoji': True}, 'value': 'help'}
                ]
            }
        ]
    }


@app.event("app_home_opened")
def initial_home_tab(client, event, logger):
    """
    This function publishes the initial home tab view when the app home is opened, option to edit info for leaders and option to add club for non-leaders
    """
    try:

        if check_if_leader(event["user"]):

            club = get_club_by_leader(event["user"])

            primary_leader = get_primary_leader(club['id'])
            secondary_leaders = get_secondary_leaders(club['id'])
            socials = club['fields']['Socials to Display']

            # Call views.publish with the built-in client
            client.views_publish(
                # Use the user ID associated with the event
                user_id=event["user"],
                # Home tabs must be enabled in your app configuration
                view=home_tab_view_signed(club, primary_leader, secondary_leaders, socials))
        else:
            # Call views.publish with the built-in client
            client.views_publish(
                # Use the user ID associated with the event
                user_id=event["user"],
                # Home tabs must be enabled in your app configuration
                view=home_tab_view_non_signed()
            )
    except Exception as e:
        logger.error(f"Error publishing home tab: {e}")


@app.action("club_socials_to_display")
def club_socials_to_display(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            'type': 'modal',
            'callback_id': 'club_socials',
            'title': {'type': 'plain_text', 'text': 'Clubs Directory', 'emoji': True},
            'submit': {'type': 'plain_text', 'text': 'Submit', 'emoji': True},
            'close': {'type': 'plain_text', 'text': 'Cancel', 'emoji': True},
            'blocks': [
                {
                    'type': 'section',
                    'block_id': 'section',
                    'text': {'type': 'mrkdwn', 'text': 'Which socials do you want to enable for your club?'},
                    'accessory': {
                        'type': 'multi_static_select',
                        'placeholder': {'type': 'plain_text', 'text': 'Select', 'emoji': True},
                        'options': [
                            {'text': {'type': 'plain_text', 'text': ':github:  Github',
                                      'emoji': True}, 'value': 'Github'},
                            {'text': {'type': 'plain_text', 'text': ':linkedin: LinkedIn',
                                      'emoji': True}, 'value': 'LinkedIn'},
                            {'text': {'type': 'plain_text', 'text': ':link: Club Website',
                                      'emoji': True}, 'value': 'Website'},
                            {'text': {'type': 'plain_text', 'text': ':scrappy: Scrapbook',
                                      'emoji': True}, 'value': 'Scrapbook'},
                            {'text': {'type': 'plain_text', 'text': ':twitter: Twitter',
                                      'emoji': True}, 'value': 'Twitter'}
                        ],
                        'action_id': 'multi_static_select-action'
                    }
                }
            ]
        }
    )

    client.views_update(
        view_id=body['view']['id'],
        view=home_tab_view_signed(get_club_by_leader(body['user']['id']), get_primary_leader(get_club_by_leader(body['user']['id'])['id']), get_secondary_leaders(
            get_club_by_leader(body['user']['id'])['id']), get_club_by_leader(body['user']['id'])['fields']['Socials to Display']))


@ app.action("edit_club_name")
def edit_club_name(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            'type': 'modal',
            'callback_id': 'edit_club_name',
            'title': {'type': 'plain_text', 'text': 'Clubs Directory', 'emoji': True},
            'submit': {'type': 'plain_text', 'text': 'Submit', 'emoji': True},
            'close': {'type': 'plain_text', 'text': 'Cancel', 'emoji': True},
            'blocks': [
                {'type': 'header', 'text': {'type': 'plain_text',
                                            'text': 'Edit Club Name', 'emoji': True}},
                {
                    'type': 'input',
                    'block_id': 'plain_text_input-action',
                    'element': {'type': 'plain_text_input', 'action_id': 'plain_text_input-action'},
                    'label': {'type': 'plain_text', 'text': 'New Name', 'emoji': True}
                }
            ]
        }
    )

    client.views_update(
        view_id=body['view']['id'],
        view=home_tab_view_signed(get_club_by_leader(body['user']['id']), get_primary_leader(get_club_by_leader(body['user']['id'])['id']), get_secondary_leaders(
            get_club_by_leader(body['user']['id'])['id']), get_club_by_leader(body['user']['id'])['fields']['Socials to Display']))


@ app.action("edit_description")
def edit_description(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            'type': 'modal',
            'callback_id': 'edit_description',
            'title': {'type': 'plain_text', 'text': 'Clubs Directory', 'emoji': True},
            'submit': {'type': 'plain_text', 'text': 'Submit', 'emoji': True},
            'close': {'type': 'plain_text', 'text': 'Cancel', 'emoji': True},
            'blocks': [
                {
                    'type': 'input',
                    'block_id': 'plain_text_input-action',
                    'element': {'type': 'plain_text_input', 'multiline': True, 'action_id': 'plain_text_input-action'},
                    'label': {'type': 'plain_text', 'text': 'New Description', 'emoji': True}
                }
            ]
        }
    )

    client.views_update(
        view_id=body['view']['id'],
        view=home_tab_view_signed(get_club_by_leader(body['user']['id']), get_primary_leader(get_club_by_leader(body['user']['id'])['id']), get_secondary_leaders(
            get_club_by_leader(body['user']['id'])['id']), get_club_by_leader(body['user']['id'])['fields']['Socials to Display']))


@ app.action("edit_secondary_leaders")
def edit_secondary_leaders(ack, body, client, logger):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            'type': 'modal',
            'callback_id': 'edit_secondary_leaders',
            'title': {'type': 'plain_text', 'text': 'Clubs Directory', 'emoji': True},
            'submit': {'type': 'plain_text', 'text': 'Done', 'emoji': True},
            'close': {'type': 'plain_text', 'text': 'Cancel', 'emoji': True},
            'blocks': [
                {'type': 'header', 'text': {'type': 'plain_text',
                                            'text': 'Edit Secondary Leaders', 'emoji': True}},
                {
                    'type': 'input',
                    'block_id': 'secondary_leaders_select',
                    'optional': True,
                    'element': {
                        'type': 'multi_users_select',
                        'placeholder': {'type': 'plain_text', 'text': 'Select secondary leaders', 'emoji': True},
                        'action_id': 'secondary_leaders_select'
                    },
                    'label': {'type': 'plain_text', 'text': 'Pick the leaders', 'emoji': True}
                }
            ]
        }
    )

    client.views_update(
        view_id=body['view']['id'],
        view=home_tab_view_signed(get_club_by_leader(body['user']['id']), get_primary_leader(get_club_by_leader(body['user']['id'])['id']), get_secondary_leaders(
            get_club_by_leader(body['user']['id'])['id']), get_club_by_leader(body['user']['id'])['fields']['Socials to Display']))


@app.view("edit_secondary_leaders")
def handle_edit_secondary_leaders_select(ack, body, client, logger):
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
            club_leaders.create({'Name': slack_user['name'], 'Slack ID': user, 'Email': 'hello@example.com', 'Pronouns': slack_user['pronouns'], 'Is Primary': False, 'To Display': ['Email', 'Twitter'],
                                'Website': slack_user['website'], 'Scrapbook': slack_user['scrapbook'], 'Github': slack_user['github'], 'LinkedIn': None, 'Twitter': None, 'Avatar': slack_user['avatar'], 'Club Link': [club['id']]})

        else:
            club_leaders.update(get_airtable_rec_id_from_slack_id(
                user), {'Club Link': [club['id']]})

    # Remove all other secondary leaders from club
    for leader in get_all_leaders_for_club(club['id']):
        if leader['fields']['Slack ID'] not in user_list and 'Is Primary' not in leader['fields']:
            club_leaders.delete(leader['id'])

    client.views_update(
        view_id=body['view']['id'],
        view=home_tab_view_signed(get_club_by_leader(body['user']['id']), get_primary_leader(get_club_by_leader(body['user']['id'])['id']), get_secondary_leaders(
            get_club_by_leader(body['user']['id'])['id']), get_club_by_leader(body['user']['id'])['fields']['Socials to Display']))


@ app.view("edit_club_name")
def handle_edit_club_name(ack, body, client, logger):
    ack()
    req_user = body['user']['id']

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    new_name = body['view']['state']['values']['plain_text_input-action']['plain_text_input-action']['value']

    clubs_table.update(club['id'], {'Club Name': new_name})

    client.views_update(
        view_id=body['view']['id'],
        view=home_tab_view_signed(get_club_by_leader(body['user']['id']), get_primary_leader(get_club_by_leader(body['user']['id'])['id']), get_secondary_leaders(
            get_club_by_leader(body['user']['id'])['id']), get_club_by_leader(body['user']['id'])['fields']['Socials to Display']))


@ app.view("edit_description")
def handle_edit_description(ack, body, client, logger):
    ack()
    req_user = body['user']['id']

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    new_description = body['view']['state']['values']['plain_text_input-action']['plain_text_input-action']['value']

    clubs_table.update(club['id'], {'Description': new_description})

    client.views_update(
        view_id=body['view']['id'],
        view=home_tab_view_signed(get_club_by_leader(body['user']['id']), get_primary_leader(get_club_by_leader(body['user']['id'])['id']), get_secondary_leaders(
            get_club_by_leader(body['user']['id'])['id']), get_club_by_leader(body['user']['id'])['fields']['Socials to Display']))


@ app.action("multi_static_select-action")
def socials_multi_select(ack):
    """This function doesn't do anything just used to prevent errors on the Slack Side """
    ack()
    pass


@ app.view("club_socials")
def handle_view_submission_events(ack, body, logger):
    ack()
    req_user = body['user']['id']

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)
    clubs_table.update(club['id'], {'Socials to Display': [x['value'] for x in body['view']
                       ['state']['values']['section']['multi_static_select-action']['selected_options']]})


@ app.action("hide_club")
def hide_club(ack, body, client, logger):
    ack()
    req_user = body['user']['id']

    if not check_if_leader(req_user):
        return

    club = get_club_by_leader(req_user)

    clubs_table.update(
        club['id'], {'To Display': False if 'To Display' in club['fields'] else True})

    client.views_update(
        view_id=body['view']['id'],
        view=home_tab_view_signed(get_club_by_leader(body['user']['id']), get_primary_leader(get_club_by_leader(body['user']['id'])['id']), get_secondary_leaders(
            get_club_by_leader(body['user']['id'])['id']), get_club_by_leader(body['user']['id'])['fields']['Socials to Display']))


# Start your app
if __name__ == '__main__':
    SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"]).start()
