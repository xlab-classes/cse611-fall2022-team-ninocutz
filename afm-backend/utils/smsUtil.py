import os
from twilio.rest import Client
import threading
import smtplib
import ssl
from email.message import EmailMessage

TWILIO_SMS_SERVICE = "twilio_sms"
DEFAULT_SMS_SERVICE = "default_sms"

def twilio_sms_thread(message_body, numbers):
    account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
    auth_token = os.environ.get("TWILIO_AUTH_TOKEN")

    client = Client(account_sid, auth_token)

    for number in numbers:
        message = client.messages.create(body=message_body,from_=os.environ.get("TWILIO_PHONE_NUMBER"),to=number) 
    return message.sid

def default_sms_thread(message_body, numbers):
    sms_gateway_domains = ["@txt.att.net", "@sms.myboostmobile.com", "@mms.cricketwireless.net", "@msg.fi.google.com", 
                          "@text.republicwireless.com", "@messaging.sprintpcs.com", "@vtext.com", "@tmomail.net", 
                          "@message.ting.com", "@email.uscc.net", "@vtext.com", "@vmobl.com"]
    

    msg_sender_email = os.environ.get("EMAIL_SENDER")
    msg_sender_passcode = os.environ.get("EMAIL_SENDER_PASSCODE")

    for number in numbers:
        for item in sms_gateway_domains:
            recipient_address = number+item
            msg = EmailMessage()
            msg['From'] = msg_sender_email
            msg['To'] = recipient_address
            msg['Subject'] = "Architect For Men"
            msg_body = message_body
            msg.set_content(msg_body)

            context = ssl.create_default_context()
            with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
                smtp.login(msg_sender_email, msg_sender_passcode)
                smtp.sendmail(msg_sender_email, recipient_address, msg.as_string())
    return

def send_promotional_sms(numbers, sms_service_type):
    website_link = "http://localhost:4200"
    message_body = "Hello, AFM-HD RV is near your location. Book your appointment on {}".format(website_link)

    if sms_service_type == TWILIO_SMS_SERVICE:
        threading.Thread(target=twilio_sms_thread, args=(message_body, numbers,)).start()
    else:
        threading.Thread(target=default_sms_thread, args=(message_body, numbers,)).start()
    return True