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
-- Table structure for table `dc_member`
--

DROP TABLE IF EXISTS `dc_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dc_member` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `name_last` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_first` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_patronymic` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submissionLevel` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dc_member`
--

LOCK TABLES `dc_member` WRITE;
/*!40000 ALTER TABLE `dc_member` DISABLE KEYS */;
INSERT INTO `dc_member` VALUES (1,'Мурасова','Людмила','Алексеевна','врач-терапевт высшей квалификационной категории','Поликлинка','заведующий поликлиникой'),(2,'Дмитренко','Светлана','Викторовна','врач-онколог высшей квалификационной категории','Отдел экспертизы качества медицинской помощи','заведующий отделом экспертизы качества медицинской помощи'),(3,'Мельникова','Светлана','Григорьевна','врач-терапевт высшей квалификационной категории','Терапевтическое отделение','заведующий терапевтическим отделением'),(4,'Радионова','Наталья','Владимировна','врач-кардиолог, высшая категория','кардиологический кабинет',''),(5,'Табак','Анна','Анатольевна','врач-кардиолог, вторая категория','кардиологический кабинет',''),(6,'Миселёва','Вера','Петровна','врач-эндокринолог, высшая категория','эндокринологический кабинет',''),(7,'Ионова','Наталья','Олеговна','врач-нарколог, высшая категория','наркологический кабинет',''),(8,'Гафантулина','Элина','Викторовна','врач-хирург, высшая категория','отделение амбулаторной хирургии','заведующий отделением амбулаторной хирургии');
/*!40000 ALTER TABLE `dc_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dc_protocol`
--

DROP TABLE IF EXISTS `dc_protocol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dc_protocol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dc_protocol`
--

LOCK TABLES `dc_protocol` WRITE;
/*!40000 ALTER TABLE `dc_protocol` DISABLE KEYS */;
INSERT INTO `dc_protocol` VALUES (5,'2020-12/1','2019-12-01 10:00:00','Экспертиза качества по пациенту'),(6,'2020-11/1','2019-11-01 10:00:00','Экспертиза качества по пациенту'),(7,'2020-10/1','2019-10-01 10:00:00','Экспертиза качества по пациенту'),(8,'2020-09/1','2019-09-01 10:00:00','Экспертиза качества по пациенту');
/*!40000 ALTER TABLE `dc_protocol` ENABLE KEYS */;
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

-- Dump completed on 2020-03-14 11:36:12
