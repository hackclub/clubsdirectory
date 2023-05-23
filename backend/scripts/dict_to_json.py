import json

"""A little script to convert a Python dictionary to a JSON string for Slack's Block Kit Builder"""

di = {
            'type': 'modal',
            'callback_id': 'add_club',
            'title': {'type': 'plain_text', 'text': 'Clubs Directory', 'emoji': True},
            'submit': {'type': 'plain_text', 'text': 'Submit', 'emoji': True},
            'close': {'type': 'plain_text', 'text': 'Cancel', 'emoji': True},
            'blocks': [
                {'type': 'header', 'text': {'type': 'plain_text',
                                            'text': 'Add your Club', 'emoji': True}},
                {
                    'type': 'input',
                    'block_id': 'club_name_input',
                    'element': {'type': 'plain_text_input', 'action_id': 'club_name_input'},
                    'label': {'type': 'plain_text', 'text': 'Club Name', 'emoji': True}
                },
                {
                    'type': 'input',
                    'block_id': 'description_input',
                    'element': {'type': 'plain_text_input', 'multiline': True, 'action_id': 'description_input'},
                    'label': {'type': 'plain_text', 'text': 'Description', 'emoji': True}
                },
                {
                    'type': 'input',
                    'block_id': 'socials_select',
                    'optional': True,
                    'element': {
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
                    },
                    'label': {'type': 'plain_text', 'text': 'Which socials do you want to enable for your club?', 'emoji': True}
                }, 
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
                },
                {
                    'type': 'input',
                    'block_id': 'email_input',
                    'element': {'type': 'email_text_input', 'action_id': 'email_input'},
                    'label': {'type': 'plain_text', 'text': 'Primary Leader Email', 'emoji': True}
                }
            ]
        }

print(json.dumps(di))