class UserModel:
    hashedPassword = None

    def __init__(self, firstName = None, lastName = None, emailId = None, mobileNumber = None,\
                 address = None, password = None, zipcode = None, createdBy = None, modifiedBy = None):
        self.firstName = firstName
        self.lastName = lastName
        self.emailId = emailId
        self.mobileNumber = mobileNumber
        self.address = address
        self.password = password
        self.zipcode = zipcode
        self.createdBy = createdBy
        self.modifiedBy = modifiedBy
