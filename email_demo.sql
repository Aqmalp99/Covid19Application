-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: covidtracingapp
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `covidtracingapp`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `covidtracingapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `covidtracingapp`;

--
-- Table structure for table `hotspots`
--

DROP TABLE IF EXISTS `hotspots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotspots` (
  `hotspotID` int NOT NULL AUTO_INCREMENT,
  `venueID` int DEFAULT NULL,
  `hoID` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  PRIMARY KEY (`hotspotID`),
  KEY `hoID` (`hoID`),
  KEY `venueID` (`venueID`),
  CONSTRAINT `hotspots_ibfk_1` FOREIGN KEY (`hoID`) REFERENCES `users` (`userID`),
  CONSTRAINT `hotspots_ibfk_2` FOREIGN KEY (`venueID`) REFERENCES `venue` (`venueID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotspots`
--

LOCK TABLES `hotspots` WRITE;
/*!40000 ALTER TABLE `hotspots` DISABLE KEYS */;
INSERT INTO `hotspots` VALUES (2,1033,24,'2021-06-07','16:13:00'),(3,1034,24,'2021-06-07','16:13:00'),(4,1035,NULL,'2021-05-03','23:14:59');
/*!40000 ALTER TABLE `hotspots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `given_name` varchar(30) DEFAULT NULL,
  `surname` varchar(30) DEFAULT NULL,
  `street_number` varchar(15) DEFAULT NULL,
  `street_name` varchar(30) DEFAULT NULL,
  `surburb` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `postcode` varchar(15) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(260) DEFAULT NULL,
  `isUser` tinyint(1) DEFAULT NULL,
  `isVenueManager` tinyint(1) DEFAULT NULL,
  `isHealthOfficial` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL),(3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL),(4,'aqmal','pulle','sa','sa','sa','SA','33','44444','2021-06-12','aq@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0),(5,'qq','q','q','q','q2','SA','2','q','2021-06-16','q','d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',0,1,0),(6,'1','1','1','1','1','SA','1','1','0001-01-01','1','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',0,1,0),(7,'1','1','1','1','1','SA','1','1','0001-01-01','1','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',0,1,0),(8,'11111','1','1','1','1','SA','1','1','0001-01-01','1','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',0,1,0),(9,'yes','no','e','e','e','SA','3','ee','2021-06-18','e','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',0,1,0),(10,'aaq','kkkk','d','s','s','VIC','3','f','2021-06-04','d','043a718774c572bd8a25adbeb1bfcd5c0256ae11cecf9f9c3f925d0e52beaf89',0,1,0),(11,'aqmal','1','3','3','3','SA','3','3','2021-06-02','3','4cf6829aa93728e8f3c97df913fb1bfa95fe5810e2933a05943f8312a98d9cf2',0,1,0),(12,'aqyyy','yes','sa','21','21','NSW','21','12','2021-06-05','aqmal@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0),(13,'q','2','2','2','2','VIC','2','2','2021-06-19','2','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',0,1,0),(14,'aAaa','a','1','1','1','NSW','1','1','2021-06-05','1','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',0,1,0),(15,'q','q','1','1','1','SA','1','2222','2021-06-18','2','4cf6829aa93728e8f3c97df913fb1bfa95fe5810e2933a05943f8312a98d9cf2',0,1,0),(16,'yes','o','1','1','1','TAS','1','1','2021-06-12','1','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',0,1,0),(17,'aaaaaa','a','22','22','22','SA','22','1111','2021-06-24','33','4cf6829aa93728e8f3c97df913fb1bfa95fe5810e2933a05943f8312a98d9cf2',0,1,0),(18,'aqmal','pi','s','s','s2','VIC','3','s','2021-06-19','s','4cf6829aa93728e8f3c97df913fb1bfa95fe5810e2933a05943f8312a98d9cf2',0,1,0),(19,'3','3','s','s','s','SA','2','3','2021-06-05','s','043a718774c572bd8a25adbeb1bfcd5c0256ae11cecf9f9c3f925d0e52beaf89',0,1,0),(20,'damn','shouldwok','as','sa','sa','SA','222','sa','2021-06-16','sa','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1',0,1,0),(21,'shae','ho','ah','ha','ah','WA','22','a','2021-06-09','haha','090b235e9eb8f197f2dd927937222c570396d971222d9009a9189e2b6cc0a2c1',0,1,0),(22,'test','num','88','num','sa','SA','7777','2222','2021-06-01','aq@gmail.com','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1',0,1,0),(23,'aqmal','pulle','10','name','lol','QLD','2222','02222222','2021-06-02','aqmal.pulle@gmail.com','4cf6829aa93728e8f3c97df913fb1bfa95fe5810e2933a05943f8312a98d9cf2',0,1,0),(24,'aqmal',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test1@gmail.com','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1',0,1,1),(25,'1','1','1','1','1','SA','1','1','0001-01-01','1','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',0,0,1),(26,'shae','yes','10','pes','sa','SA','2888','ff','2021-06-08','no@gmail.com','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1',0,0,1),(27,'r','r','','','','','','r','2021-06-09','r','4cf6829aa93728e8f3c97df913fb1bfa95fe5810e2933a05943f8312a98d9cf2',0,0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venue`
--

DROP TABLE IF EXISTS `venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venue` (
  `venueID` int NOT NULL AUTO_INCREMENT,
  `venue_name` varchar(50) DEFAULT NULL,
  `venue_manager` int DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `street_number` varchar(15) DEFAULT NULL,
  `street_name` varchar(30) DEFAULT NULL,
  `suburb` varchar(30) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `postcode` varchar(15) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`venueID`),
  KEY `venue_manager` (`venue_manager`),
  CONSTRAINT `venue_ibfk_1` FOREIGN KEY (`venue_manager`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=1036 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue`
--

LOCK TABLES `venue` WRITE;
/*!40000 ALTER TABLE `venue` DISABLE KEYS */;
INSERT INTO `venue` VALUES (11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1000,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1001,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1002,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1003,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1004,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1005,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1008,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1009,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1010,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1011,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1012,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1013,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1014,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1015,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1016,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1017,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1018,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1019,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1020,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1021,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1022,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1023,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1024,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1025,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1026,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1027,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1028,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1029,'aq',20,2,NULL,NULL,NULL,NULL,NULL,NULL),(1030,'hun',21,99,'27','nu','bu','SA','7777','2222'),(1032,NULL,23,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1033,NULL,24,NULL,'10','pelagic road','seaford meadows','SA','5169',NULL),(1034,NULL,26,NULL,'12','anzac highway','everard park','SA','5035',NULL),(1035,'Hungry Jacks',NULL,NULL,'1','Grenfell Street','Modbury','SA','5092','04121231');
/*!40000 ALTER TABLE `venue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-12 15:22:38
