from repository import notificationsRepository


def insertNotification(notificationType, template, userId):
    notification = notificationsRepository.getNotificationByType(
        notificationType)

    if len(notification) > 0:
        id = notification[0]['Id']
        notificationsRepository.updateNotification(
            id, notificationType, template, userId)
        return id

    return notificationsRepository.insertNotification(
        notificationType, template, userId)


def updateNotification(id, notificationType, template, userId):
    return notificationsRepository.updateNotification(
        id, notificationType, template, userId)


def deleteNotification(id):
    return notificationsRepository.deleteNotification(id)


def getAllNotifications():
    return notificationsRepository.getAllNotifications()


def getNotificationByType(notificationType):
    return notificationsRepository.getNotificationByType(notificationType)
