import os
import smtplib
import ssl
from email.message import EmailMessage
import threading

from flask import url_for

def email_thread(msg, sender_email, sender_passcode, recipient_email):
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(sender_email, sender_passcode)
        smtp.sendmail(sender_email, recipient_email, msg.as_string())


def send_email(username, token):
    msg = EmailMessage()

    msg_sender_email = os.environ.get("EMAIL_SENDER")
    msg_sender_passcode = os.environ.get("EMAIL_SENDER_PASSCODE")
    msg_recipient_email = username

    msg['From'] = msg_sender_email
    msg['To'] = msg_recipient_email
    msg['Subject'] = "Password Reset Link"

    reset_url = url_for("user_blueprint.reset_password", token=token, _external=True)
    msg_body = "Hello, "+"\n"+"Please follow this link to reset your password - {}".format(reset_url)+"\n"\
                "Note: Please keep in mind the link is valid only for 15 minutes. If link expires, request password reset again from our website."+\
                "\n"+"\n"+"\n"+"Regards,"+"\n"+"Architect For Men"
    msg.set_content(msg_body)

    thread = threading.Thread(target=email_thread, args=(msg, msg_sender_email, msg_sender_passcode, msg_recipient_email,))
    thread.start()
    thread.join()
    return 'Email succesfully sent', 200