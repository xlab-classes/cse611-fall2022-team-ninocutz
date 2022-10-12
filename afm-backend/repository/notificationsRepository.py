from app import Database


def getAllNotifications():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id, NotificationType, NotificationTemplate  FROM AFM.Notification"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def getIdByNotificationType(notificationType):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id FROM AFM.Notification WHERE NotificationType = %s;"
    cursor.execute(sql, (notificationType))
    results = cursor.fetchall()

    if results and results[0]:
        return results[0][0]
    return False


def insertNotification(notificationType, template, userId):
    db = Database()
    cursor = db.cursor()
    sql = "INSERT INTO AFM.Notification(NotificationType, NotificationTemplate, CreatedBy) VALUES (%s, %s, %s)"
    cursor.execute(sql, (notificationType, template, userId))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def updateNotification(id, notificationType, template, userId):
    db = Database()
    cursor = db.cursor()
    sql = "UPDATE AFM.Notification SET NotificationType = %s, NotificationTemplate = %s, ModifiedBy = %s WHERE Id = %s;"
    val = cursor.execute(sql, (notificationType, template, userId, id))
    cursor.close()
    db.commit()
    return val == 1


def deleteNotification(id):
    db = Database()
    cursor = db.cursor()
    sql = "DELETE FROM AFM.Notification WHERE Id = %s"
    val = cursor.execute(sql, (id))
    cursor.close()
    db.commit()
    return val == 1
