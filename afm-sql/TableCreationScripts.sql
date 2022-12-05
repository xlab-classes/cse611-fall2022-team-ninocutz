CREATE TABLE `Customer` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(50) DEFAULT NULL,
  `LastName` VARCHAR(50) DEFAULT NULL,
  `EmailID` VARCHAR(320) DEFAULT NULL,
  `MobileNumber` VARCHAR(10) DEFAULT NULL,
  `Address` VARCHAR(500) DEFAULT NULL,
  `Zipcode` VARCHAR(10) DEFAULT NULL,
  `SendPromotion` TINYINT DEFAULT NULL,
  `CreatedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` INT DEFAULT NULL,
  `ModifiedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` INT DEFAULT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Booking` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `CustomerId` INT NOT NULL,
  `NumberOfPeople` INT NOT NULL,
  `BookingDate` DATETIME NOT NULL,
  `BookingTimeSlot` VARCHAR(30) DEFAULT NULL,
  `BookingStatus` VARCHAR(50) DEFAULT NULL,
  `CreatedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` INT DEFAULT NULL,
  `ModifiedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` INT DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CustomerId` (`CustomerId`),
  CONSTRAINT `Booking_fk_1` FOREIGN KEY (`CustomerId`) REFERENCES `Customer` (`Id`)
);

CREATE TABLE `EventType` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) DEFAULT NULL,
  `Description` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `ImageType` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Category` VARCHAR(200) DEFAULT NULL,
  `CreatedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Image` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ImageTypeId` INT DEFAULT NULL,
  `Url` VARCHAR(2048) DEFAULT NULL,
  `CreatedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` INT DEFAULT NULL,
  `ModifiedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` INT DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Image_type` (`ImageTypeId`),
  CONSTRAINT `Image_fk_1` FOREIGN KEY (`ImageTypeId`) REFERENCES `ImageType` (`Id`)
);

CREATE TABLE `Notification` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NotificationType` VARCHAR(50) NOT NULL,
  `NotificationTemplate` VARCHAR(500) NOT NULL,
  `CreatedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` INT DEFAULT NULL,
  `ModifiedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` INT DEFAULT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `RV_User` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(50) DEFAULT NULL,
  `LastName` VARCHAR(50) DEFAULT NULL,
  `EmailID` VARCHAR(320) DEFAULT NULL,
  `MobileNumber` VARCHAR(10) DEFAULT NULL,
  `Address` VARCHAR(255) DEFAULT NULL,
  `Password` VARCHAR(255) DEFAULT NULL,
  `Zipcode` VARCHAR(10) DEFAULT NULL,
  `CreatedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` INT DEFAULT NULL,
  `ModifiedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` INT DEFAULT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Event` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ImageId` INT DEFAULT NULL,
  `EventTypeId` INT DEFAULT NULL,
  `Name` VARCHAR(50) DEFAULT NULL,
  `Longitude` DECIMAL(8,6) DEFAULT NULL,
  `Latitude` DECIMAL(9,6) DEFAULT NULL,
  `Address` VARCHAR(255) DEFAULT NULL,
  `EventDate` DATETIME DEFAULT NULL,
  `EventTimeSlot` VARCHAR(100) DEFAULT NULL,
  `Zipcode` VARCHAR(10) DEFAULT NULL,
  `Message` VARCHAR(500) DEFAULT NULL,
  `CreatedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` INT DEFAULT NULL,
  `ModifiedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` INT DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `EventTypeId` (`EventTypeId`),
  CONSTRAINT `Event_fk_1` FOREIGN KEY (`EventTypeId`) REFERENCES `EventType` (`Id`)
);

CREATE TABLE `CurrentEvent` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `EventId` INT DEFAULT NULL,
  `CreatedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` INT DEFAULT NULL,
  `ModifiedOn` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` INT DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `eventId` (`EventId`),
  CONSTRAINT `CurrentEvent_fk_1` FOREIGN KEY (`EventId`) REFERENCES `Event` (`Id`)
) ;

INSERT INTO `EventType`
( `Name`, `Description`)
VALUES
('Wedding', 'Wedding'),
('Club', 'Club'),
('Birthday', 'Birthday'),
('Corporate', 'Corporate');

INSERT INTO `ImageType`
(`Category`)
VALUES
('Gallery');

INSERT INTO `AFM`.`Notification`
(`NotificationType`, `NotificationTemplate`)
VALUES
('Facebook', 'Hello,
The AFM RV is nearby to your registered address!!!!
Use the following link to get more details and book your appointment.
{}'),
('Instagram', 'Hello,
The AFM RV is nearby to your registered address!!!!
Use the following link to get more details and book your appointment.
{}'),
('Email', 'Hello,
The AFM RV is nearby to your registered address!!!!
Use the following link to get more details and book your appointment.
{}'),
('SMS', 'Hello,
The AFM RV is nearby to your registered address!!!!
Use the following link to get more details and book your appointment.
{}');