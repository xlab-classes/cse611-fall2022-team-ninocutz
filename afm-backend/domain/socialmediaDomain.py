import requests
import os

facebook_id = os.environ.get("FB_ID")
client_secret = os.environ.get("FB_SECRET")
client_id = os.environ.get('FB_CLIENT_ID')


def postToInstagram(access_token, image_url):
    '''
    '''
    long_access_token = generate_long_lived_token(access_token)
    instagram_id = get_instagram_id(long_access_token)
    if not instagram_id:
        return False
    container_id = generate_container_id(
        instagram_id, image_url, long_access_token, 'testing')
    if not container_id:
        return container_id
    post_id = publish_content(instagram_id, container_id, long_access_token)
    if not post_id:
        return False
    return True


def get_instagram_id(access_token):
    url = f'https://graph.facebook.com/v15.0/{facebook_id}?fields=instagram_business_account&access_token=' + str(
        access_token)
    response = requests.get(url=url)
    instagram_id = 0
    if response.status_code == 200:
        instagram_id = response.json()['instagram_business_account']['id']
    return instagram_id


def generate_container_id(instagram_id, image_url, access_token, caption):
    url = f'https://graph.facebook.com/v15.0/{instagram_id}/media?image_url={image_url}&caption={caption}&access_token={access_token}'
    response = requests.post(url=url)
    container_id = 0
    if response.status_code == 200:
        container_id = response.json()['id']
    return container_id


def publish_content(instagram_id, container_id, access_token):
    url = f'https://graph.facebook.com/v15.0/{instagram_id}/media_publish?creation_id={container_id}&access_token={access_token}'
    response = requests.post(url=url)
    post_id = 0
    if response.status_code == 200:
        post_id = response.json()['id']
    return post_id


def generate_long_lived_token(access_token):
    url = f'https://graph.facebook.com/v15.0/oauth/access_token?grant_type=fb_exchange_token&client_id={client_id}&client_secret={client_secret}&fb_exchange_token={access_token}'
    response = requests.get(url=url)
    access_token = 0
    if response.status_code == 200:
        access_token = response.json()['access_token']
    return access_token
