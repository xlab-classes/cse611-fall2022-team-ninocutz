from app import Database
from model.UserModel import UserModel


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


def addUser(newUser : UserModel):
    db = Database()
    cursor = db.cursor()
    sql = "INSERT INTO RV_User (FirstName, LastName, EmailID, \
           MobileNumber, Address, Password, Zipcode, CreatedOn, \
           CreatedBy, ModifiedOn, ModifiedBy) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
    cursor.execute(sql, (newUser.firstName, newUser.lastName, newUser.emailId, newUser.mobileNumber,
                         newUser.address, newUser.password, newUser.zipcode, 
                         newUser.createdOn, newUser.createdBy, newUser.modifiedOn, newUser.modifiedBy))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id
