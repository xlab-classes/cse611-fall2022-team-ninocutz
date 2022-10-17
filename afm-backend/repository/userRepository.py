from app import Database
from model.UserModel import UserModel


def getUserByEmail(emailId):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id, FirstName, LastName, EmailID, Password, MobileNumber, Address, ZipCode FROM AFM.RV_User WHERE EmailID = %s"
    cursor.execute(sql, (emailId))
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()

    if results:
        return results[0]

    return None


def getUserById(userId):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id, FirstName, LastName, EmailID, MobileNumber, Address, ZipCode FROM AFM.RV_User WHERE Id = %s"
    cursor.execute(sql, (userId))
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()
    if results:
        return results[0]

    return None


def reset_password(username, hashedPassword, userId):
    db = Database()
    cursor = db.cursor()
    sql = "UPDATE AFM.RV_User SET Password = %s, ModifiedBy = %s WHERE EmailID = %s"
    cursor.execute(sql, (hashedPassword, userId, username))
    cursor.close()
    db.commit()


def addUser(newUser: UserModel):
    db = Database()
    cursor = db.cursor()
    sql = "INSERT INTO AFM.RV_User (FirstName, LastName, EmailID, \
           MobileNumber, Address, Password, Zipcode, \
           CreatedBy) VALUES(%s, %s, %s, %s, %s, %s, %s, %s);"
    cursor.execute(sql, (newUser.firstName, newUser.lastName, newUser.emailId, newUser.mobileNumber,
                         newUser.address, newUser.hashedPassword, newUser.zipcode, newUser.createdBy))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def getAllUsers():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id, FirstName, LastName, EmailID, MobileNumber, Address, ZipCode FROM AFM.RV_User"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()

    return results


def deleteUser(userId):
    db = Database()
    cursor = db.cursor()
    sql = "DELETE FROM AFM.RV_User WHERE Id = %s"
    val = cursor.execute(sql, (userId))
    cursor.close()
    db.commit()
    return val == 1


def updateUser(userId, update_statement):
    db = Database()
    cursor = db.cursor()
    sql = "UPDATE AFM.RV_User SET " + update_statement + "WHERE Id = %s"
    val = cursor.execute(sql, (userId))
    cursor.close()
    db.commit()
    return val == 1
