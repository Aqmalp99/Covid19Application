CREATE TABLE users (
    userID int NOT NULL AUTO_INCREMENT,
    given_name varchar(30),
    surname varchar(30),
    street_number varchar(15),
    street_name varchar(30),
    surburb varchar(30),
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
	state varchar(20),
    postcode varchar(15),
	contact_number varchar(20),
	PRIMARY KEY (venueID),
	FOREIGN KEY (venue_manager) REFERENCES users(userID)
);
-- UPDATE venue
-- SET venue_name = ?, capacity= ?, street_number=?,street_name=?,suburb=?,state=?,postcode=?,contact_number=?
-- WHERE venue_manager=?;
INSERT INTO venue (venue_manager,street_number,street_name,suburb,state,postcode)
VALUES (26,"12","anzac highway","everard park","SA","5035");


CREATE TABLE hotspots (
    hotspotID INT NOT NULL AUTO_INCREMENT,
	venueID INT,
	hoID INT,
	start_date DATE,
	start_time TIME,
	PRIMARY KEY (hotspotID),
	FOREIGN KEY (hoID) REFERENCES users(userID),
    FOREIGN KEY (venueID) REFERENCES venue(venueID)
);
-- INSERT INTO hotspots (venueID,hoID,start_date,start_time)
-- VALUES (?,  ?, ?,?);
SELECT venue.venueID,street_number,street_name,suburb,state,postcode
FROM venue
INNER JOIN hotspots
ON venue.venueID=hotspots.venueID;
-- CREATE TABLE venue_managers (
--     venue_manager_ID INT NOT NULL AUTO_INCREMENT,
--     userID int,
-- 	PRIMARY KEY (venue_manager_ID),
-- 	FOREIGN KEY (userID) REFERENCES venue(userID)
-- );

-- CREATE TABLE health_official (
--     adminID INT NOT NULL AUTO_INCREMENT,
--     userID int,
--     role varchar(50),
-- 	PRIMARY KEY (adminID),
-- 	FOREIGN KEY (userID) REFERENCES users(userID)
-- );

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