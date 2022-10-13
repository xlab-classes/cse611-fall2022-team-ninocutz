
class UserModel:
    def __init__(self, firstName, lastName, emailId, mobileNumber, address, password, zipcode, createdOn, createdBy, modifiedOn, modifiedBy):
        self.firstName = firstName
        self.lastName = lastName
        self.emailId = emailId
        self.mobileNumber = mobileNumber
        self.address = address
        self.password = password
        self.zipcode = zipcode
        self.createdOn = createdOn
        self.createdBy = createdBy
        self.modifiedOn = modifiedOn
        self.modifiedBy = modifiedBy
    
    def putPassword(self, hashedPassword):
        self.password = hashedPassword
    
    def getPassword(self):
        return self.password
