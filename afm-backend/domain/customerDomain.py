from repository import customerRepository


def addCustomer(firstName, lastName, address, zipCode, emailId, mobileNumber):
    customer = customerRepository.getCustomerByMobileNumber(mobileNumber)

    if customer:
        return customer['Id']
    else:
        return customerRepository.addNewCustomer(
            firstName, lastName, emailId, mobileNumber, address, zipCode, True)
