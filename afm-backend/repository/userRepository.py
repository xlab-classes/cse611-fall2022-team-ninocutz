from app import Database


def getUserByEmail(emailId):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT * FROM RV_User WHERE EmailID = %s"
    cursor.execute(sql, (emailId))
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()

    return results


def reset_password(username, hashedPassword, userId):
    db = Database()
    cursor = db.cursor()
    sql = "UPDATE RV_User SET Password = %s, ModifiedBy = %s WHERE EmailID = %s"
    cursor.execute(sql, (hashedPassword, userId, username))
    cursor.close()
    db.commit()


def addUser(userName, hashedPassword):
    db = Database()
    cursor = db.cursor()
    sql = "INSERT INTO `AFM`.`RV_User` (`EmailID`,`Password`) VALUES(%s, %s);"
    cursor.execute(sql, (userName, hashedPassword))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id
