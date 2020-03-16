-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: main
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `remd_journal`
--

DROP TABLE IF EXISTS `remd_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `remd_journal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `initiator_name` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `initiator_post` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_departure` datetime DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `remd_journal`
--

LOCK TABLES `remd_journal` WRITE;
/*!40000 ALTER TABLE `remd_journal` DISABLE KEYS */;
/*!40000 ALTER TABLE `remd_journal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `protocol_id` int DEFAULT NULL,
  `f_2` tinyint(1) DEFAULT NULL,
  `f_3` tinyint(1) DEFAULT NULL,
  `f_4` date DEFAULT NULL,
  `f_5` tinyint DEFAULT NULL,
  `f_6_name_last` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_6_name_first` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_6_patronymic` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_7_1` date DEFAULT NULL,
  `f_7_2` tinyint DEFAULT NULL,
  `f_8` tinyint DEFAULT NULL,
  `f_9` tinyint DEFAULT NULL,
  `f_10` tinyint DEFAULT NULL,
  `f_11_1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_11_2` mediumint DEFAULT NULL,
  `f_11_3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_11_4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_11_5` tinyint DEFAULT NULL,
  `f_11_6` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_11_7` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_11_8` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_11_9` smallint DEFAULT NULL,
  `f_11_10` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_12` tinyint(1) DEFAULT NULL,
  `f_13` tinyint DEFAULT NULL,
  `f_13_address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_13_ogrn` bigint DEFAULT NULL,
  `f_14_1` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_14_2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_15` bigint DEFAULT NULL,
  `f_16_1` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_16_2_1` smallint DEFAULT NULL,
  `f_16_2_2` mediumint DEFAULT NULL,
  `f_16_3` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_16_4` date DEFAULT NULL,
  `f_17_1_1` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_17_1_2_1` smallint DEFAULT NULL,
  `f_17_1_2_2` mediumint DEFAULT NULL,
  `f_17_1_3` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_17_1_4` date DEFAULT NULL,
  `f_17_2_1` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_17_2_2_1` smallint DEFAULT NULL,
  `f_17_2_2_2` mediumint DEFAULT NULL,
  `f_17_2_3` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_17_2_4` date DEFAULT NULL,
  `f_17_3_1` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_17_3_2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_17_4` bigint DEFAULT NULL,
  `f_17_5_1` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_17_5_2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_17_5_3` bigint DEFAULT NULL,
  `f_18` tinyint DEFAULT NULL,
  `f_19_1` tinyint DEFAULT NULL,
  `f_19_2` date DEFAULT NULL,
  `f_19_3` tinyint DEFAULT NULL,
  `f_19_4` tinyint DEFAULT NULL,
  `f_19_5` tinyint DEFAULT NULL,
  `f_19_6` tinyint DEFAULT NULL,
  `f_19_7` date DEFAULT NULL,
  `f_19_8` tinyint DEFAULT NULL,
  `f_20_1` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_20_2_1` tinyint DEFAULT NULL,
  `f_20_2_2` tinyint DEFAULT NULL,
  `f_20_2_3` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_20_3` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_21_1` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_21_2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_21_3` tinyint DEFAULT NULL,
  `f_21_4` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_21_5` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_21_6` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_21_7` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_22` smallint DEFAULT NULL,
  `f_23` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_24` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_25` text COLLATE utf8mb4_unicode_ci,
  `f_25_1` tinyint(1) DEFAULT NULL,
  `f_25_2` bigint DEFAULT NULL,
  `f_26_programm_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_26_protol_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_26` tinyint DEFAULT NULL,
  `f_26_1_i` tinyint DEFAULT NULL,
  `f_26_2_i` tinyint DEFAULT NULL,
  `f_27_1` decimal(5,2) DEFAULT NULL,
  `f_27_2` decimal(5,2) DEFAULT NULL,
  `f_27_3` smallint DEFAULT NULL,
  `f_27_4` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_27_5` decimal(7,2) DEFAULT NULL,
  `f_27_6_1` decimal(3,1) DEFAULT NULL,
  `f_27_6_2` decimal(3,1) DEFAULT NULL,
  `f_27_7` decimal(2,1) DEFAULT NULL,
  `f_27_8` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_28` text COLLATE utf8mb4_unicode_ci,
  `f_29` text COLLATE utf8mb4_unicode_ci,
  `f_30_1` text COLLATE utf8mb4_unicode_ci,
  `f_30_2` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_30_3` text COLLATE utf8mb4_unicode_ci,
  `f_30_4` text COLLATE utf8mb4_unicode_ci,
  `f_30_5` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_30_6` text COLLATE utf8mb4_unicode_ci,
  `f_31` tinyint DEFAULT NULL,
  `f_32` tinyint DEFAULT NULL,
  `f_33` tinyint DEFAULT NULL,
  `f_34` text COLLATE utf8mb4_unicode_ci,
  `f_35` text COLLATE utf8mb4_unicode_ci,
  `f_36` text COLLATE utf8mb4_unicode_ci,
  `f_37` text COLLATE utf8mb4_unicode_ci,
  `f_signature` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (14,7,NULL,NULL,NULL,NULL,'Gorchakovh','Alexandr',NULL,NULL,99,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Senior Angular Developer','Expert',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ERFERF',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"main\":3,\"other\":[\"1\",\"2\",\"4\"]}'),(15,NULL,NULL,NULL,NULL,NULL,'Gorchakov','Alexandr',NULL,NULL,99,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Senior Angular Developer','Expert',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'sdsf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,NULL,NULL,NULL,NULL,7,'Gorchakov','AlexandrRR',NULL,NULL,99,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Senior Angular Developer','Expert',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'REFERf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_journal`
--

DROP TABLE IF EXISTS `ticket_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_journal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `name_last` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_first` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `patronymic` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_born` date DEFAULT NULL,
  `diagnosis` text COLLATE utf8mb4_unicode_ci,
  `msa_level` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `commission_members` varchar(555) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `msa_date` date DEFAULT NULL,
  `result` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_journal`
--

LOCK TABLES `ticket_journal` WRITE;
/*!40000 ALTER TABLE `ticket_journal` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_journal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_result`
--

DROP TABLE IF EXISTS `ticket_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_result` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `name_last` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_first` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `patronymic` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_born` date DEFAULT NULL,
  `diagnosis` text COLLATE utf8mb4_unicode_ci,
  `msa_level` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `commission_members` varchar(555) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_result`
--

LOCK TABLES `ticket_result` WRITE;
/*!40000 ALTER TABLE `ticket_result` DISABLE KEYS */;
INSERT INTO `ticket_result` VALUES (2,'2020-02-10','Захаров','Алексей','Александрович','М','1993-01-11','F30','Вторичное','Лебедев А.П., Егоров Е.Н.','Зарегистрирован'),(3,'2020-02-12','Яковлев','Максим','Иванович','М','1989-06-14','F60','Вторичное','Лебедев А.П., Макаров К.Н.','Зарегистрирован'),(4,'2020-02-20','Сорокин','Артём','Александрович','М','1986-05-20','F90','Первичное','Павлов В.П., Егоров Е.Н.','Зарегистрирован');
/*!40000 ALTER TABLE `ticket_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `role` char(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_access` char(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'msa_user','all'),(2,'msa_user','all'),(3,'msa_user','all'),(4,'msa_user','all');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-14 11:36:09
