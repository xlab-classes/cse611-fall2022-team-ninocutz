from app import Database

db = Database()


def addNewCustomer(firstName, lastName, emailId, mobileNumber, address, zipCode, sendPromotion=False):
    cursor = db.cursor()
    sql = "INSERT INTO AFM.Customer(FirstName, LastName, EmailId, MobileNumber, Address, ZipCode, SendPromotion) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(sql, (firstName, lastName, emailId,
                   mobileNumber, address, zipCode, sendPromotion))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def getCustomerByMobileNumber(mobileNumber):
    cursor = db.cursor()
    sql = "SELECT Id, FirstName, EmailId, MobileNumber, Address, ZipCode FROM AFM.Customer WHERE MobileNumber = %s"
    cursor.execute(sql, (mobileNumber))

    results = cursor.fetchall()

    if results:
        customer = results[0]
    else:
        customer = None

    cursor.close()
    return customer
