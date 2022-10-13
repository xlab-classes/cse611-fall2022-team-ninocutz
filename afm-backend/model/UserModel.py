class UserModel:
    hashedPassword = None

    def __init__(self, firstName, lastName, emailId, mobileNumber, address, password, zipcode, createdBy):
        self.firstName = firstName
        self.lastName = lastName
        self.emailId = emailId
        self.mobileNumber = mobileNumber
        self.address = address
        self.password = password
        self.zipcode = zipcode
        self.createdBy = createdBy
