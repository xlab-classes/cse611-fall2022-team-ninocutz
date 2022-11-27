CREATE TABLE `Booking` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CustomerId` int NOT NULL,
  `NumberOfPeople` int NOT NULL,
  `BookingDate` datetime NOT NULL,
  `BookingTimeSlot` varchar(30) DEFAULT NULL,
  `BookingStatus` varchar(50) DEFAULT NULL,
  `CreatedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` int DEFAULT NULL,
  `ModifiedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CustomerId` (`CustomerId`),
  CONSTRAINT `Booking_fk_1` FOREIGN KEY (`CustomerId`) REFERENCES `Customer` (`Id`)
);


CREATE TABLE `CurrentEvent` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EventId` int DEFAULT NULL,
  `CreatedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` int DEFAULT NULL,
  `ModifiedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `eventId` (`EventId`),
  CONSTRAINT `CurrentEvent_fk_1` FOREIGN KEY (`EventId`) REFERENCES `Event` (`Id`)
) ;
CREATE TABLE `Customer` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `EmailID` varchar(320) DEFAULT NULL,
  `MobileNumber` varchar(10) DEFAULT NULL,
  `Address` varchar(500) DEFAULT NULL,
  `Zipcode` varchar(10) DEFAULT NULL,
  `SendPromotion` tinyint(1) DEFAULT NULL,
  `CreatedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` int DEFAULT NULL,
  `ModifiedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Event` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ImageId` int DEFAULT NULL,
  `EventTypeId` int DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Longitude` decimal(8,6) DEFAULT NULL,
  `Latitude` decimal(9,6) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `EventDate` datetime DEFAULT NULL,
  `EventTimeSlot` varchar(100) DEFAULT NULL,
  `Zipcode` varchar(10) DEFAULT NULL,
  `Message` varchar(500) DEFAULT NULL,
  `CreatedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` int DEFAULT NULL,
  `ModifiedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `EventTypeId` (`EventTypeId`),
  CONSTRAINT `Event_fk_1` FOREIGN KEY (`EventTypeId`) REFERENCES `EventType` (`Id`)
);
CREATE TABLE `EventType` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Image` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ImageTypeId` int DEFAULT NULL,
  `Url` varchar(2048) DEFAULT NULL,
  `CreatedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` int DEFAULT NULL,
  `ModifiedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Image_type` (`ImageTypeId`),
  CONSTRAINT `Image_fk_1` FOREIGN KEY (`ImageTypeId`) REFERENCES `ImageType` (`Id`)
);

CREATE TABLE `ImageType` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Category` varchar(200) DEFAULT NULL,
  `CreatedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Notification` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NotificationType` varchar(50) NOT NULL,
  `NotificationTemplate` varchar(500) NOT NULL,
  `CreatedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` int DEFAULT NULL,
  `ModifiedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `RV_User` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `EmailID` varchar(320) DEFAULT NULL,
  `MobileNumber` varchar(10) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Zipcode` varchar(10) DEFAULT NULL,
  `CreatedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `CreatedBy` int DEFAULT NULL,
  `ModifiedOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ModifiedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
);
