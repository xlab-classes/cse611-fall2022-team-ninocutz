from app import Database


def addNewCustomer(firstName, lastName, emailId, mobileNumber, address, zipCode, sendPromotion=False):
    db = Database()
    cursor = db.cursor()
    sql = "INSERT INTO AFM.Customer (FirstName, LastName, EmailId, MobileNumber, Address, ZipCode, SendPromotion) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(sql, (firstName, lastName, emailId,
                   mobileNumber, address, zipCode, sendPromotion))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def getCustomerByMobileNumber(mobileNumber):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id, FirstName, EmailId, MobileNumber, Address, ZipCode FROM AFM.Customer WHERE MobileNumber = %s"
    cursor.execute(sql, (mobileNumber))

    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()
    if results:
        return results[0]

    return None


def getCustomersByZipCode(zipCode):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id, FirstName, EmailId, MobileNumber, Address, ZipCode FROM AFM.Customer WHERE ZipCode = %s"
    cursor.execute(sql, (zipCode))
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()

    return results
