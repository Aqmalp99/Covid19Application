CREATE TABLE users (
    userID int NOT NULL AUTO_INCREMENT,
    given_name varchar(30),
    surname varchar(30),
    street_number varchar(15),
    street_name varchar(30),
    surburb varchar(30),
    city varchar(30),
    state varchar(30),
    postcode varchar(15),
    contact_number varchar(20),
    date_of_birth DATE,
    email varchar(50),
    password varchar(260),
    isUser BOOL,
    isVenueManager BOOL,
    isHealthOfficial BOOL,
    PRIMARY KEY (userID)
);

CREATE TABLE venue (
    venueID int NOT NULL AUTO_INCREMENT,
	venue_name varchar(50),
	venue_manager INT,
	capacity INT,
	street_number varchar(15),
	street_name varchar(30),
	suburb varchar(30),
	city varchar(30),
	state varchar(20),
    postcode varchar(15),
	contact_number varchar(20),
	userID int,
	PRIMARY KEY (venueID),
	FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE hotspots (
    hotspotID INT NOT NULL AUTO_INCREMENT,
	venueID INT,
	start_date DATE,
	end_date DATE,
	PRIMARY KEY (hotspotID),
    FOREIGN KEY (venueID) REFERENCES venue(venueID)
);

CREATE TABLE venue_managers (
    venue_manager_ID INT NOT NULL AUTO_INCREMENT,
    userID int,
	PRIMARY KEY (venue_manager_ID),
	FOREIGN KEY (userID) REFERENCES venue(userID)
);

CREATE TABLE health_official (
    adminID INT NOT NULL AUTO_INCREMENT,
    userID int,
    role varchar(50),
	PRIMARY KEY (adminID),
	FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE checkins (
    checkinID int NOT NULL AUTO_INCREMENT,
    checkindate DATE,
    checkintime TIME,
    userID int,
    venueID int,
    PRIMARY KEY (checkinID),
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (venueID) REFERENCES venue(venueID)
);