from repository import notificationsRepository


def insertNotification(notificationType, template, userId):
    id = notificationsRepository.getIdByNotificationType(notificationType)

    if id:
        notificationsRepository.updateNotification(
            id, notificationType, template, userId)
        return id

    return notificationsRepository.insertNotification(
        notificationType, template)


def updateNotification(id, notificationType, template, userId):
    return notificationsRepository.updateNotification(
        id, notificationType, template, userId)


def deleteNotification(id):
    return notificationsRepository.deleteNotification(id)


def getAllNotifications():
    return notificationsRepository.getAllNotifications()
