use AFM;

CREATE TABLE RV_User (
    Id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FirstName varchar(50),
    LastName varchar(50),
    EmailID varchar(320),
    Address varchar(255),
    [Password] varchar(255),
    Zipcode varchar(10),
    CreatedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    CreatedBy int(11),
    ModifiedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    ModifiedBy int(11)
);

CREATE TABLE Event (
    Id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    imageId int(11),
    eventTypeId int(11),
    longitude decimal(8,6),
    latitude decimal(9,6),
    EmailID varchar(320),
    Address varchar(255),
    EventDate datetime,
    EventTimeSlot varchar(100),
    EventTimeLine varchar(10),
    Zipcode varchar(10),
    Message varchar(500),
    CreatedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    CreatedBy int(11),
    ModifiedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    ModifiedBy int(11),
    FOREIGN KEY (eventTypeId)  REFERENCES EventType(Id)
);

CREATE TABLE EventType (
    Id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name varchar(100),
    Description varchar(500)
);

CREATE TABLE Booking (
    Id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerID int(11),
    BookingDate datetime not null,
    number_of_people int,
    CreatedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    CreatedBy int(11),
    ModifiedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    ModifiedBy int(11),
    FOREIGN KEY (customerID)  REFERENCES Customer(Id)
);

CREATE TABLE Customer (
    Id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FirstName varchar(50),
    LastName varchar(50),
    EmailID varchar(320),
    Zipcode varchar(10),
    CreatedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    CreatedBy int(11),
    ModifiedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    ModifiedBy int(11)
   
);

CREATE TABLE image (
    Id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_type int,
    url varchar(2048),
    CreatedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    CreatedBy int(11),
    ModifiedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    ModifiedBy int(11),
    FOREIGN KEY (image_type)  REFERENCES image_type(Id)
);

CREATE TABLE image_type (
    Id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_type varchar(50),
    category varchar(200),
    CreatedOn TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6)
);