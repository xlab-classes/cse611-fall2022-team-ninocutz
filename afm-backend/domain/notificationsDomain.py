from repository import notificationsRepository


def insertNotification(notificationType, template):
    id = notificationsRepository.getIdByNotificationType(notificationType)

    if id:
        notificationsRepository.updateNotification(
            id, notificationType, template)
        return id

    return notificationsRepository.insertNotification(
        notificationType, template)


def updateNotification(id, notificationType, template):
    return notificationsRepository.updateNotification(
        id, notificationType, template)


def deleteNotification(id):
    return notificationsRepository.deleteNotification(id)


def getAllNotifications():
    return notificationsRepository.getAllNotifications()
