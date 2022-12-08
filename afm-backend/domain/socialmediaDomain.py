import requests
import os
import tweepy
from repository import notificationsRepository
from PIL import Image, ImageOps

facebook_id = os.environ.get("FB_ID")
client_secret = os.environ.get("FB_SECRET")
client_id = os.environ.get('FB_CLIENT_ID')
consumer_key = os.environ.get('CONSUMER_KEY')
consumer_secret_key = os.environ.get('CONSUMER_SECRET_KEY')
access_token = os.environ.get('TWITTER_ACCESS_TOKEN')
access_token_secret = os.environ.get('TWITTER_ACCESS_TOKEN_SECRET')


def postToInstagram(access_token, image_url, message):
    if not message or not message.strip():
        message = notificationsRepository.getNotificationByType(
            'Instagram')[0]['NotificationTemplate']
    long_access_token = generate_long_lived_token(access_token)
    instagram_id = get_instagram_id(long_access_token)
    if not instagram_id:
        return False
    container_id = generate_container_id(
        instagram_id, image_url, long_access_token, message)
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


def postToFacebook(access_token, image_url, message):
    if not message or not message.strip():
        message = notificationsRepository.getNotificationByType(
            'Facebook')[0]['NotificationTemplate']
    page_id, page_access_token = get_facebook_page_id_token(access_token)
    if not page_id and not page_access_token:
        return False
    post_id = publish_content_to_facebook(
        page_id, image_url, message, page_access_token)
    if not post_id:
        return False
    return True


def publish_content_to_facebook(page_id, image_url, message, page_access_token):
    url = f'https://graph.facebook.com/{page_id}/photos?url={image_url}&message={message}&access_token={page_access_token}'
    response = requests.post(url=url)
    post_id = 0
    if response.status_code == 200:
        post_id = response.json()['id']
    return post_id


def get_facebook_page_id_token(access_token):
    url = f'https://graph.facebook.com/v15.0/me/accounts?access_token={access_token}'
    response = requests.get(url=url)
    page_id, access_token = 0, 0
    if response.status_code == 200:
        page_id = response.json()['data'][0]['id']
        access_token = response.json()['data'][0]['access_token']
    return page_id, access_token


def postToTwitter(image_path, message):
    if not message or not message.strip():
        message = notificationsRepository.getNotificationByType(
            'Twitter')[0]['NotificationTemplate']
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret_key)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)

    # Compress Image if size is huge
    current_size = os.path.getsize(image_path)
    if current_size > 3000000:
        quality = 90
        while current_size > 3000000:
            compress_pic(image_path, quality)
            current_size = os.stat(image_path).st_size
            quality -= 5

    status = api.update_status_with_media(filename=image_path, status=message)
    if not status.id:
        return False
    return True


def compress_pic(file_path, qual):
    picture = Image.open(file_path)
    fixed_image = ImageOps.exif_transpose(picture)

    fixed_image.save(file_path, "JPEG", optimize=True, quality=qual)

    processed_size = os.stat(file_path).st_size

    return processed_size
