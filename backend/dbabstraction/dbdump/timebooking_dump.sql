-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: timebooking
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL,
  `person_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('0f966a6e-4d64-47c4-8c6b-f133b01f3816','2022-06-30 19:44:09','2637ea2d-3a1b-4d1a-8b76-3c92749685e0'),('172fca05-11c2-4c08-b8aa-791f870a9596','2022-06-30 19:44:09','eb7f4b97-2eb1-4acf-907e-6726e9eca4b9'),('6305d742-3697-42f9-8cb5-d74a0e89ebca','2022-06-30 19:44:09','59eceb3b-890a-43d1-ada1-d10973e97260'),('7241600d-e075-4edd-8539-48150c59a947','2022-06-30 18:40:41','6a1bf002-9e5c-46c6-9eb9-5d625e5704b6'),('76300c90-5a9a-4938-8844-9a7fa3846b66','2022-06-30 19:44:09','847444dc-ceb7-4b8e-bd44-8767a7f3ac3a'),('7e33c440-708f-4ebe-9cef-7222939097bc','2022-06-30 19:44:09','4a4f37ff-7928-4e4a-8e75-851d223ee5e4'),('cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','2022-06-30 19:44:09','b168b262-acf3-4908-9726-7a44373ee1d0');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arrivals`
--

DROP TABLE IF EXISTS `arrivals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arrivals` (
  `id` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL,
  `occurence` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrivals`
--

LOCK TABLES `arrivals` WRITE;
/*!40000 ALTER TABLE `arrivals` DISABLE KEYS */;
INSERT INTO `arrivals` VALUES ('048f275b-f3b0-4e09-a2d5-c8889f06ffd6','2022-06-30 19:44:09','2022-07-02 09:30:00'),('2a08a230-0c67-41ce-a8ae-61daceedc37a','2022-06-30 18:40:41','2022-06-21 08:20:00'),('2cd8ff3a-3efb-44c2-b6c6-b55ad337dd59','2022-06-30 19:44:09','2022-06-27 19:48:00'),('4c1920ec-659d-4c34-9b40-d67371158084','2022-06-30 19:44:09','2022-07-02 07:50:00'),('51e50218-e8f4-4a3a-9a86-18a935417ba5','2022-06-30 19:44:09','2022-07-01 09:05:00'),('5e8689c7-0328-4634-8e2d-b9cc0727dd0b','2022-06-30 19:44:09','2022-06-30 07:30:00'),('7715e360-f19a-4f83-9f82-15fb3516b77f','2022-06-30 19:44:09','2022-06-28 06:02:00'),('b8cdd1ba-6ca8-4cf3-842e-5295d96cb264','2022-06-30 19:44:09','2022-07-01 08:50:00'),('c557d0ee-ff5d-4a8f-be41-15e39c35ba1d','2022-06-30 19:44:09','2022-07-02 07:05:00'),('d4416e05-6531-4119-9405-0dc5c4cf3008','2022-06-30 19:44:09','2022-06-23 07:50:00'),('d805fda7-3281-4fcd-8ee0-793c0f5571da','2022-06-30 19:44:09','2022-07-01 08:58:00'),('ddbcdd1f-3799-4230-bf4e-3f9508db6921','2022-06-30 18:40:41','2022-06-22 08:02:00'),('e6867926-9d06-4c0f-bdf6-a80b95e0ea0f','2022-06-30 19:44:09','2022-07-02 07:03:00'),('e7fdb60b-0c4f-4e3a-b904-0eab4e1b78e6','2022-06-30 19:44:09','2022-06-27 08:50:00');
/*!40000 ALTER TABLE `arrivals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_transactions`
--

DROP TABLE IF EXISTS `event_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_transactions` (
  `id` varchar(255) NOT NULL,
  `last_change` varchar(255) NOT NULL,
  `account_id` varchar(255) NOT NULL,
  `event_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_transactions`
--

LOCK TABLES `event_transactions` WRITE;
/*!40000 ALTER TABLE `event_transactions` DISABLE KEYS */;
INSERT INTO `event_transactions` VALUES ('0697a0aa-0888-4e19-a9f3-aae8632e06e4','2022-06-30 19:44:09.087275','0f966a6e-4d64-47c4-8c6b-f133b01f3816','9c6bd311-9260-4331-995e-b3fd4291833b'),('077df0c8-a14b-4a4c-a9c1-45e5f0cb79a3','2022-06-30 19:44:09.087275','0f966a6e-4d64-47c4-8c6b-f133b01f3816','b8cdd1ba-6ca8-4cf3-842e-5295d96cb264'),('0ef21fe2-3caf-4384-b044-2f934054527a','2022-06-30 19:44:09.087275','6305d742-3697-42f9-8cb5-d74a0e89ebca','dfaf3373-c05d-4334-aa0b-2f1f163e96ca'),('1a35f022-7552-489d-95b1-0c0527ada428','2022-06-30 19:44:09.087275','0f966a6e-4d64-47c4-8c6b-f133b01f3816','f515d560-8aa8-4a20-aa40-124e44de5359'),('2461abd4-4c15-474b-8767-07aa6dc99bca','2022-06-30 19:44:09.087275','7e33c440-708f-4ebe-9cef-7222939097bc','51e50218-e8f4-4a3a-9a86-18a935417ba5'),('38a81e16-6fe7-49f2-bfba-f6756c0ba311','2022-06-30 18:40:40.746621','7241600d-e075-4edd-8539-48150c59a947','ddbcdd1f-3799-4230-bf4e-3f9508db6921'),('51a46282-e33d-4526-9792-952b7c99ab26','2022-06-30 19:44:09.087275','7e33c440-708f-4ebe-9cef-7222939097bc','048f275b-f3b0-4e09-a2d5-c8889f06ffd6'),('56250e8e-6fb6-49f5-aa77-0acab768cc55','2022-06-30 19:44:09.087275','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','e7fdb60b-0c4f-4e3a-b904-0eab4e1b78e6'),('6cad63aa-af04-48cd-9ca7-dd79620bc141','2022-06-30 19:44:09.087275','7241600d-e075-4edd-8539-48150c59a947','2cd8ff3a-3efb-44c2-b6c6-b55ad337dd59'),('75233ad0-5dd5-40da-8c04-5ac998334c55','2022-06-30 19:44:09.087275','0f966a6e-4d64-47c4-8c6b-f133b01f3816','5e8689c7-0328-4634-8e2d-b9cc0727dd0b'),('82620bfd-33aa-4b25-8e67-15232c5c0099','2022-06-30 19:44:09.087275','7e33c440-708f-4ebe-9cef-7222939097bc','66657f84-24f5-42f0-bbaa-025486372367'),('82c5cc87-34e1-41e4-b0fb-6a4918856584','2022-06-30 19:44:09.087275','6305d742-3697-42f9-8cb5-d74a0e89ebca','e6867926-9d06-4c0f-bdf6-a80b95e0ea0f'),('878e9bec-393f-4892-a8fa-c0e68923c4a4','2022-06-30 18:40:40.746621','7241600d-e075-4edd-8539-48150c59a947','07a628f9-2441-4d1c-b4a5-884075d383da'),('8a3e5611-e52b-4a15-b089-7e2d1cb752b5','2022-06-30 19:44:09.087275','76300c90-5a9a-4938-8844-9a7fa3846b66','8a04b299-fc01-4e19-a1e0-3596c2a06b28'),('909e389d-d695-4784-9ede-90693eca79eb','2022-06-30 19:44:09.087275','7241600d-e075-4edd-8539-48150c59a947','d4416e05-6531-4119-9405-0dc5c4cf3008'),('97cb27ce-7a3b-4da2-9c02-f901e05bb95e','2022-06-30 19:44:09.087275','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','9fc7e1ee-c6b4-4d45-a684-016a26053bdc'),('99ad00d5-ccde-4a34-96c8-504f657df6a1','2022-06-30 18:40:40.746621','7241600d-e075-4edd-8539-48150c59a947','de3f82e8-12ba-45e9-ae7b-bd7482376a7b'),('9a9ccb47-4e8c-4885-96b3-4c743843d6b4','2022-06-30 19:44:09.087275','0f966a6e-4d64-47c4-8c6b-f133b01f3816','018c607e-217b-4071-bdc6-5c735001d04b'),('a02964c2-23ea-4cc8-83f6-902d435314d1','2022-06-30 19:44:09.087275','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','ee9ac12d-2d9a-4dcd-a0fe-ef06d7ca6bbe'),('a0c3178b-f418-433e-bf40-bac03331f322','2022-06-30 19:44:09.087275','7241600d-e075-4edd-8539-48150c59a947','949e689d-9802-4215-b688-c99d0953c07d'),('af345837-6389-458e-8ce5-c62e9fa08eaa','2022-06-30 19:44:09.087275','6305d742-3697-42f9-8cb5-d74a0e89ebca','b5608594-8441-4b44-be31-cd9f3501d901'),('c03331a4-c68f-4e7c-b696-408eeacdc8f4','2022-06-30 19:44:09.087275','7e33c440-708f-4ebe-9cef-7222939097bc','0a00b038-46d2-4f63-b5cb-cee9453476d9'),('c2a613e3-03c7-40ae-9152-9470e72ba0d8','2022-06-30 18:40:40.746621','7241600d-e075-4edd-8539-48150c59a947','2a08a230-0c67-41ce-a8ae-61daceedc37a'),('c2e98756-74bf-40c4-8319-f4998f1f39e8','2022-06-30 19:44:09.087275','6305d742-3697-42f9-8cb5-d74a0e89ebca','d805fda7-3281-4fcd-8ee0-793c0f5571da'),('db667e95-f6cf-4906-a7a6-9f480e1236f2','2022-06-30 19:44:09.087275','76300c90-5a9a-4938-8844-9a7fa3846b66','c557d0ee-ff5d-4a8f-be41-15e39c35ba1d'),('e0137647-b0a8-41c4-ae2b-00a19b03e1be','2022-06-30 19:44:09.087275','0f966a6e-4d64-47c4-8c6b-f133b01f3816','4c1920ec-659d-4c34-9b40-d67371158084'),('e27e8306-e2e5-4add-985d-7cd539bf477e','2022-06-30 19:44:09.087275','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','7715e360-f19a-4f83-9f82-15fb3516b77f');
/*!40000 ALTER TABLE `event_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interval_transactions`
--

DROP TABLE IF EXISTS `interval_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interval_transactions` (
  `id` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL,
  `account_id` varchar(255) NOT NULL,
  `task_id` varchar(255) DEFAULT NULL,
  `interval_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interval_transactions`
--

LOCK TABLES `interval_transactions` WRITE;
/*!40000 ALTER TABLE `interval_transactions` DISABLE KEYS */;
INSERT INTO `interval_transactions` VALUES ('0928daa1-4746-4b96-8e86-238594b6a479','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc','843da0ba-ac3c-4c1e-b0ff-d5cf8567fae1','4bd52fa3-59d8-4a73-8a2c-ca3bc14880cd'),('095eb30d-1ffa-4f46-ba6c-2595ce3ae613','2022-06-30 18:40:41','7241600d-e075-4edd-8539-48150c59a947',NULL,'fbf508cd-4c50-48f6-aa94-255c6686c13b'),('0bd65062-ff6a-4ef8-9c80-0f8dcdba5cb0','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca','39a4fcf1-bf2e-414a-80ca-7bfede98a6d0','9ee41153-421d-4cdb-8f4d-7a1eac026760'),('0e3f2e85-581d-4ba8-8c60-c27f0ef105de','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc','0e4d75b8-cae0-4ede-9a20-b6ae10a3a81f','37bc9290-e263-41f6-aa32-f0e52e1a515c'),('176c7be6-3b96-46c0-8076-1e77a8a4863e','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','08345c11-f367-43ad-80b0-cce8d7e79284','d5d40c8b-8102-4ed4-8b05-7470645d53ab'),('18837690-51e3-4bb7-aafd-8ebc67cf6cec','2022-06-30 19:44:09','76300c90-5a9a-4938-8844-9a7fa3846b66','df10128a-b1cb-4483-ab51-1e9894bff9ba','03f3fb71-1114-4b09-be22-1ac19e5e80a1'),('1a02f8cb-6e49-452e-8033-e9cb02b3f58a','2022-06-30 19:44:09','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','b8a8b176-744e-43cd-9cbf-60127ab2e3b2','b8e74df3-9dfb-497e-9135-81868b166aa8'),('1c042a51-4784-4cad-abd3-e0c743a4a8d4','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','1d0ea723-bd1c-4d87-bd29-c2c1a6eb6bbb','83db822b-b3b1-409a-bc20-ac6e6ee5bb65'),('1de1b74e-0d1e-4820-8c3c-b9428965c9ee','2022-06-30 19:44:09','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','64271e11-6895-47f7-8443-a85e4b44e5a8','60690fca-5d94-4774-afa8-b122d1897789'),('2af27561-7926-4230-9075-a5e17d498c1c','2022-06-30 18:40:41','7241600d-e075-4edd-8539-48150c59a947','2bcda842-cf81-4226-8f85-79e3fad2653c','dc771c24-fb09-4ff4-9685-86f883bea24c'),('2b507f73-d971-4db6-abaf-9f85e033210f','2022-06-30 19:44:09','7241600d-e075-4edd-8539-48150c59a947','08345c11-f367-43ad-80b0-cce8d7e79284','58d68d0f-ca83-4b7d-b5f4-aca782b595a8'),('2d5f5e87-16fb-425b-a843-1035adb0da96','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','843da0ba-ac3c-4c1e-b0ff-d5cf8567fae1','75779058-f08c-4fd9-99b4-bcd35f3b8b2f'),('343341c2-65ee-4e05-aa80-d6dc4a9622cb','2022-06-30 19:44:09','76300c90-5a9a-4938-8844-9a7fa3846b66','64271e11-6895-47f7-8443-a85e4b44e5a8','19b80588-d47d-4752-b8ce-0a7dc75c62de'),('3d271afd-eb1d-4ea8-9a1c-539e35fdbccf','2022-06-30 19:44:09','7241600d-e075-4edd-8539-48150c59a947','39a4fcf1-bf2e-414a-80ca-7bfede98a6d0','9b36e6dd-95a5-4598-8ac0-b0be7b39385c'),('4322e24d-2eb6-4a6b-90b9-198e6e56f2aa','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca','167e86ba-b9df-4590-bcd6-4ca6857e8d80','c0c26007-955c-44bb-8952-cf7d526aed79'),('43584334-998a-4958-b1bc-08b278edacf6','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca','61cbda43-d0f5-4b74-8a3e-fef70b64a40c','d31f1d70-e1e8-4832-a167-5f79c07490f7'),('45a71203-0ff8-4dca-96be-7fce653b74e1','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc',NULL,'1f63a6e9-ad50-405b-802b-7cdcfd40dcda'),('489539f6-cc45-4181-8d41-5de7dea9ece3','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc','1d0ea723-bd1c-4d87-bd29-c2c1a6eb6bbb','84afa5ed-9cf9-4744-84e7-2cf16e02b519'),('49500f59-0fe9-4360-8f03-2d0e8448550c','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc','843da0ba-ac3c-4c1e-b0ff-d5cf8567fae1','77cf7ad9-b1d4-46e2-8646-55790903d7d0'),('4cdd254f-f05a-4529-8420-53b8a086d6fa','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','4a052bcf-fe90-477b-8502-d9ac3e692074','91557136-04c7-4f49-aeac-fa6b93c3488c'),('4d3a16c3-af3e-492c-b29e-7dd079ad2715','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc','4e0ae0cd-1fb5-4146-b81a-82af0ff03b50','dc64bb0c-b6ab-4208-bb40-cf608051d657'),('4feb325e-6121-4089-83bf-ea70fe7b884c','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca','80e63164-fac3-42fb-8ce1-434c8a53f681','54449e74-bb88-46ff-a22e-1907857a9a64'),('5ea272a1-de47-4070-9b27-c5f4b2b17e2a','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc',NULL,'247641e1-1a0a-4bbd-9906-329fb73d672a'),('65c457df-2904-449d-bdf8-c67c0819dbe0','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816',NULL,'c94d8fb4-67fa-4af1-9027-2722d4508418'),('6972436e-e1c3-4de4-a47e-728d8e9cd434','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca','167e86ba-b9df-4590-bcd6-4ca6857e8d80','99acf0f4-fbc0-438b-bde4-f31dce1ccf3a'),('69cebb96-2233-468c-9a53-eac5134dd8f7','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816',NULL,'16c0e80a-ca22-4f63-a1bb-1850cf278e6c'),('6cd8f9c7-50fd-49f8-bb03-48bd63bea866','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','4696e346-2d70-4c72-92e9-aa7d7962bcd5','2d46177c-6664-4db2-8123-de962ab58c3c'),('6efc9130-4a12-4b3f-bd9d-39fd1d6fba3c','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc','6d177f99-a3ff-4297-b921-4d0ad80097d2','dd1f2f1d-d9e6-4451-b7f5-a5e0cd152653'),('74e7445b-a599-454e-8a59-be997d52f913','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc','0e4d75b8-cae0-4ede-9a20-b6ae10a3a81f','96bcaeef-445f-4ef4-b978-6ff0d37427ea'),('7c09dff2-0cbd-48ad-b9d3-b65236d43710','2022-06-30 18:40:41','7241600d-e075-4edd-8539-48150c59a947','5cd4a147-e784-46ac-aaac-cc061f6fbdf0','6d4ff99f-8cce-413e-8e6c-b9d5fd3f7b5e'),('8804d439-edda-4312-abd4-c8ea6109ef97','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca','9c3da72e-aaec-4b6f-ab78-f49415755bbc','61ba7506-f414-48b1-a88e-df1585697347'),('8826a50e-e859-4bd3-a954-03219f29358c','2022-06-30 19:44:09','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','202f030d-3003-4d8f-a444-f0f3534a2b0a','d569cd7b-ac3a-4784-a1cb-e84c1414b0ef'),('8a2a308a-dbc2-440c-b454-40f9c8374e68','2022-06-30 19:44:09','7241600d-e075-4edd-8539-48150c59a947','61cbda43-d0f5-4b74-8a3e-fef70b64a40c','d6bd4934-83c8-45e1-901d-335d603e1def'),('8ceec20d-326d-4cf7-90be-61e15ca68d8e','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','950a6e31-ffee-45be-9d31-800b1d143bfb','1fc05991-26f6-43f1-b317-e42a4da0da4e'),('8d65b8a7-d33f-4f5b-9318-86fe7347da19','2022-06-30 19:44:09','7241600d-e075-4edd-8539-48150c59a947',NULL,'aeca79f5-b42c-45e5-b73e-e42dcf0c9667'),('8db79ecf-0450-4707-9569-c5248ea79779','2022-06-30 19:44:09','76300c90-5a9a-4938-8844-9a7fa3846b66','f1d24ac1-ad9f-4b17-8ce9-b0c468f89ff6','8f79562f-bdbe-4264-80a7-ad50794c1b9d'),('94f1171a-451a-4ee5-931f-bb5112c894f7','2022-06-30 18:40:41','7241600d-e075-4edd-8539-48150c59a947',NULL,'775c7eb3-1b8f-4f1e-b852-3744be0d9ff3'),('94fd3fbb-9429-4a27-8487-6c639906f94d','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc','0fd0c6cf-2ec3-4c6d-8f7d-feff12a3c2ce','1de6cdbb-4167-43cd-acb6-963855501701'),('96348b1f-6dbf-4e02-80c1-c79de8b1aee3','2022-06-30 18:40:41','7241600d-e075-4edd-8539-48150c59a947','5cd4a147-e784-46ac-aaac-cc061f6fbdf0','c7d11e7e-039f-466a-a264-23d8e42c865a'),('96ab1778-89d0-4b21-9a09-9f9b28b4a965','2022-06-30 18:40:41','7241600d-e075-4edd-8539-48150c59a947','6d177f99-a3ff-4297-b921-4d0ad80097d2','c6b693d2-c2a2-4dd0-93e7-8e05ea99e838'),('97c3e425-fdf8-42b8-a52d-c74fb856463f','2022-06-30 19:44:09','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb',NULL,'8e24b2cb-b6d2-41af-9714-d4bc62d822b2'),('9c58b566-6fee-4e92-807c-a024c1fefdf2','2022-06-30 18:40:41','7241600d-e075-4edd-8539-48150c59a947','1d0ea723-bd1c-4d87-bd29-c2c1a6eb6bbb','b1e79e69-3337-4ff9-8f48-475883d92deb'),('9dfbdf6a-1293-4f6d-a8e7-7c3b67b111fb','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','08345c11-f367-43ad-80b0-cce8d7e79284','d63ab187-2fcc-4101-bbb0-5e7762ac3cc1'),('9ffb8ac9-eb42-4eaa-9941-0a949813fb84','2022-06-30 18:40:41','7241600d-e075-4edd-8539-48150c59a947','1d0ea723-bd1c-4d87-bd29-c2c1a6eb6bbb','2f447536-04b6-48a5-b0a8-424532f57412'),('a432e81f-e8d3-4de9-bab4-31fb3346d299','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','5fb1edf4-e684-415b-8418-d9b1571c8bfa','1ae32f6f-be35-4471-b47e-8747527ef845'),('a7613d4a-fe1b-4a5f-8e1d-ed79665c0952','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca',NULL,'e09fca4f-e1cc-4186-9d87-47636ddf991f'),('aff4ecbc-64bc-4388-8ce0-6f30ba39a4c8','2022-06-30 19:44:09','7241600d-e075-4edd-8539-48150c59a947','61cbda43-d0f5-4b74-8a3e-fef70b64a40c','ad73c393-d216-4200-9588-8e3f9edacc27'),('b6f2ad82-890c-4126-8a12-8b8509812aba','2022-06-30 19:44:09','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','96429526-0b6e-49d0-aa37-ddb236cb454c','67a368f8-f23d-4c7d-b431-bf15655efad2'),('b74534b5-e25b-40f6-b2a5-87efcf08e0a4','2022-06-30 19:44:09','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb',NULL,'d032f1ea-2473-4f42-913d-f5ec9eed8a81'),('b8ec5aaa-21a4-4276-b66d-aee8f45aab94','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca',NULL,'9b5dfd71-a005-40d1-b50d-88c47f6b9da5'),('b9bdecbb-0658-4ed6-a285-705bd1429cb1','2022-06-30 19:44:09','76300c90-5a9a-4938-8844-9a7fa3846b66',NULL,'36660088-94d4-4049-a7b4-4da17679d9aa'),('be024ee5-1335-49b9-b5a8-47415d88f40b','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca','d8f891e5-ead6-4b14-ad18-4385d9a6115f','326cb97a-ad24-45ca-abb4-c723a14b626a'),('c25fd1b9-834e-4b23-a9ab-6d737a1e9a71','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816',NULL,'2371e562-e7fa-4d53-a761-a216f21c90fa'),('c4cd9fd7-1577-4838-bdb6-9caedc4345d4','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca','80e63164-fac3-42fb-8ce1-434c8a53f681','33341754-05dc-4f8f-b6e9-1a93d4bb5064'),('cb6fbe2a-0483-410a-87d1-35b1078e621a','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','4696e346-2d70-4c72-92e9-aa7d7962bcd5','9d15cf4a-72aa-4592-92b1-3387f09845b0'),('ce498288-8ac7-4da7-bdf8-54db080c0534','2022-06-30 19:44:09','76300c90-5a9a-4938-8844-9a7fa3846b66','f21837e0-b199-4a86-9db5-7c9686c726d4','39a6ec16-4232-4316-9e09-e9587a547437'),('d6397efb-0aa0-43d2-bda8-c7ac5be015e0','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','a397de91-2f01-4744-8a51-92a3a07074f2','78379abe-42b6-47aa-b624-501805ca8061'),('daeddc22-8aa8-476c-8161-2504e3397c23','2022-06-30 19:44:09','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','b8a8b176-744e-43cd-9cbf-60127ab2e3b2','6ec060b0-941a-445a-a74c-0a491150baf8'),('e7cb68cb-e467-4e76-8b56-dae44264f0af','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','843da0ba-ac3c-4c1e-b0ff-d5cf8567fae1','23a5ea8c-a97f-44be-9223-a84cddac7ead'),('eead4348-3132-47ef-948c-61fa5113d4fd','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','1d0ea723-bd1c-4d87-bd29-c2c1a6eb6bbb','b28c17d3-e2e8-4d2a-b419-3f669ee8182b'),('f2d8fb8c-5415-420e-b10f-723207bdb8fb','2022-06-30 19:44:09','7e33c440-708f-4ebe-9cef-7222939097bc','df10128a-b1cb-4483-ab51-1e9894bff9ba','f4a0324d-c757-4100-9711-aaf05ef14b2f'),('f3edf198-5c46-4245-b458-9044df4f4388','2022-06-30 19:44:09','cf8cc9e5-8f68-4b59-9d3d-86b66e1ce1fb','f21837e0-b199-4a86-9db5-7c9686c726d4','8f698bd3-2624-4ebd-b9a7-97635372795d'),('f6a966c6-334e-4504-b43c-4790e6502bf0','2022-06-30 19:44:09','6305d742-3697-42f9-8cb5-d74a0e89ebca','39a4fcf1-bf2e-414a-80ca-7bfede98a6d0','047cc005-992d-49b9-84f6-69dafe45bc5c'),('fa66d06d-1fd1-424d-8aee-73069d184032','2022-06-30 18:40:41','7241600d-e075-4edd-8539-48150c59a947','6d177f99-a3ff-4297-b921-4d0ad80097d2','5f96a7c0-0626-43e7-8451-3d0bed2d3d94'),('ff48f8f8-97f8-4056-8fd2-2f5d6f4d9390','2022-06-30 19:44:09','0f966a6e-4d64-47c4-8c6b-f133b01f3816','5cd4a147-e784-46ac-aaac-cc061f6fbdf0','80dec1b1-3ac9-4faa-8e59-c6244da1be47');
/*!40000 ALTER TABLE `interval_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaves` (
  `id` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL,
  `occurence` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

LOCK TABLES `leaves` WRITE;
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
INSERT INTO `leaves` VALUES ('018c607e-217b-4071-bdc6-5c735001d04b','2022-06-30 19:44:09','2022-07-01 18:03:00'),('07a628f9-2441-4d1c-b4a5-884075d383da','2022-06-30 18:40:41','2022-06-21 17:20:00'),('0a00b038-46d2-4f63-b5cb-cee9453476d9','2022-06-30 19:44:09','2022-07-02 18:30:00'),('66657f84-24f5-42f0-bbaa-025486372367','2022-06-30 19:44:09','2022-07-01 18:10:00'),('8a04b299-fc01-4e19-a1e0-3596c2a06b28','2022-06-30 19:44:09','2022-07-02 16:06:00'),('949e689d-9802-4215-b688-c99d0953c07d','2022-06-30 19:44:09','2022-06-23 16:57:00'),('9c6bd311-9260-4331-995e-b3fd4291833b','2022-06-30 19:44:09','2022-07-02 16:45:00'),('9fc7e1ee-c6b4-4d45-a684-016a26053bdc','2022-06-30 19:44:09','2022-06-28 15:02:00'),('b5608594-8441-4b44-be31-cd9f3501d901','2022-06-30 19:44:09','2022-07-01 17:54:00'),('de3f82e8-12ba-45e9-ae7b-bd7482376a7b','2022-06-30 18:40:41','2022-06-22 17:15:00'),('dfaf3373-c05d-4334-aa0b-2f1f163e96ca','2022-06-30 19:44:09','2022-07-02 16:00:00'),('ee9ac12d-2d9a-4dcd-a0fe-ef06d7ca6bbe','2022-06-30 19:44:09','2022-06-27 17:55:00'),('f515d560-8aa8-4a20-aa40-124e44de5359','2022-06-30 19:44:09','2022-06-30 16:45:00');
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pause_times`
--

DROP TABLE IF EXISTS `pause_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pause_times` (
  `id` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pause_times`
--

LOCK TABLES `pause_times` WRITE;
/*!40000 ALTER TABLE `pause_times` DISABLE KEYS */;
INSERT INTO `pause_times` VALUES ('16c0e80a-ca22-4f63-a1bb-1850cf278e6c','2022-06-30 19:44:09','2022-06-30 12:05:00','2022-06-30 13:10:00'),('1f63a6e9-ad50-405b-802b-7cdcfd40dcda','2022-06-30 19:44:09','2022-07-01 12:10:00','2022-07-01 13:10:00'),('2371e562-e7fa-4d53-a761-a216f21c90fa','2022-06-30 19:44:09','2022-07-01 11:50:00','2022-07-01 12:57:00'),('247641e1-1a0a-4bbd-9906-329fb73d672a','2022-06-30 19:44:09','2022-07-02 12:20:00','2022-07-02 13:20:00'),('36660088-94d4-4049-a7b4-4da17679d9aa','2022-06-30 19:44:09','2022-07-02 12:03:00','2022-07-02 13:00:00'),('775c7eb3-1b8f-4f1e-b852-3744be0d9ff3','2022-06-30 18:40:41','2022-06-22 12:33:00','2022-06-22 13:35:00'),('8e24b2cb-b6d2-41af-9714-d4bc62d822b2','2022-06-30 19:44:09','2022-06-28 11:55:00','2022-06-28 13:00:00'),('9b5dfd71-a005-40d1-b50d-88c47f6b9da5','2022-06-30 19:44:09','2022-07-02 12:00:00','2022-07-02 13:01:00'),('aeca79f5-b42c-45e5-b73e-e42dcf0c9667','2022-06-30 19:44:09','2022-06-23 12:04:00','2022-06-23 13:08:00'),('c94d8fb4-67fa-4af1-9027-2722d4508418','2022-06-30 19:44:09','2022-07-02 12:10:00','2022-07-02 13:00:00'),('d032f1ea-2473-4f42-913d-f5ec9eed8a81','2022-06-30 19:44:09','2022-06-27 12:02:00','2022-06-27 13:05:00'),('e09fca4f-e1cc-4186-9d87-47636ddf991f','2022-06-30 19:44:09','2022-07-01 12:02:00','2022-07-01 13:05:00'),('fbf508cd-4c50-48f6-aa94-255c6686c13b','2022-06-30 18:40:41','2022-06-21 12:04:00','2022-06-21 13:07:00');
/*!40000 ALTER TABLE `pause_times` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persons`
--

DROP TABLE IF EXISTS `persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persons` (
  `id` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `role` enum('MANAGER','EMPLOYEE') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persons`
--

LOCK TABLES `persons` WRITE;
/*!40000 ALTER TABLE `persons` DISABLE KEYS */;
INSERT INTO `persons` VALUES ('2637ea2d-3a1b-4d1a-8b76-3c92749685e0','2022-06-30 19:44:09','Hans','Klopfer','hans-klopfer@company.com','Hans_Klopfer','N9JMWz0wXzZJt2ma05MgSWs6r7x2','EMPLOYEE'),('4a4f37ff-7928-4e4a-8e75-851d223ee5e4','2022-06-30 19:44:09','Philipp','Heinrichs','philipp-heinrichs@company.com','Phil Heinrichs','N9JMWz0wXzZJt2ma05MgSWs6r7p3','EMPLOYEE'),('59eceb3b-890a-43d1-ada1-d10973e97260','2022-06-30 19:44:09','Caro','Weber','caro-weber@company.com','Caro_W','N9JMWz0wXzZJt2ma05MgSWs6r7y1','EMPLOYEE'),('6a1bf002-9e5c-46c6-9eb9-5d625e5704b6','2022-06-30 18:40:41','Fritz','Maier','fritz-maier@company.com','Fritzi','N9JMWz0wXzZJt2ma05MgSWs6r7y5','EMPLOYEE'),('847444dc-ceb7-4b8e-bd44-8767a7f3ac3a','2022-06-30 19:44:09','Nicole','Sauer','sauernicole94@gmail.com','NicoleSauer','arJsEVPM1XbU0bx3RKbtDW7e4sF2','EMPLOYEE'),('b168b262-acf3-4908-9726-7a44373ee1d0','2022-06-30 19:44:09','Klaus','Schneider','klaus-schneider@company.com','KlausS.','N9JMWz0wXzZJt2ma05MgSWs6r7z2','EMPLOYEE');
/*!40000 ALTER TABLE `persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_times`
--

DROP TABLE IF EXISTS `project_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_times` (
  `id` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_times`
--

LOCK TABLES `project_times` WRITE;
/*!40000 ALTER TABLE `project_times` DISABLE KEYS */;
INSERT INTO `project_times` VALUES ('67f808aa-2830-414d-91d9-9bbb44e120fe','2022-06-30 19:44:09','2022-03-18 06:00:00','2022-07-31 02:00:00'),('77c08c43-e6bb-41d6-9c60-f2ff67ce4dd5','2022-06-30 19:44:09','2022-04-11 02:00:00','2022-10-19 02:00:00'),('97c68338-ff16-4e25-a2b0-2abcf420e3d6','2022-06-30 19:44:09','2022-07-01 02:00:00','2022-07-06 02:00:00'),('ae1876d4-b7d0-4005-9fd7-5881601cca41','2022-06-30 19:44:09','2022-06-01 02:00:00','2022-07-11 02:00:00'),('d6ebf213-e828-457d-bb1b-935199b424bd','2022-06-30 19:44:09','2022-06-16 02:00:00','2022-09-01 02:00:00'),('dc5f7293-65a1-4e29-848b-97d5a448a3d2','2022-06-30 19:44:09','2022-02-10 06:00:00','2023-02-10 06:00:00'),('e0cf5810-b7ed-418a-9a40-de0310922076','2022-06-30 19:44:09','2022-05-06 02:00:00','2022-12-09 07:00:00'),('fdb71289-ddc7-4416-a4e4-d49ba8ef5af2','2022-06-30 19:44:09','2022-01-21 05:00:00','2022-11-18 05:00:00');
/*!40000 ALTER TABLE `project_times` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `customer` varchar(255) NOT NULL,
  `project_time_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('067ffa28-e1c3-4f30-bb0e-97a59768f608','2022-06-30 19:44:09','Tool To Analyze X','Mahle GmbH','ae1876d4-b7d0-4005-9fd7-5881601cca41'),('07d61b73-4df0-4fc0-8fc4-b37f149210c9','2022-06-30 19:44:09','Design New Spoiler For Taycan','Porsche AG','e0cf5810-b7ed-418a-9a40-de0310922076'),('2653ebf6-e883-4c4e-9cea-a2426e63ad2d','2022-06-30 19:44:09','Software For New Driving Assistant','BMW AG','dc5f7293-65a1-4e29-848b-97d5a448a3d2'),('45a70306-59e4-46da-8b0b-fa5e63954391','2022-06-30 19:44:09','Marketing Campaign','Mercedes-Benz Group','67f808aa-2830-414d-91d9-9bbb44e120fe'),('5fad7bf6-c73d-4023-8a5c-8c5ab796e1b6','2022-06-30 19:44:09','System To Measure Car Emissions (not that accurate)','Volkswagen AG','97c68338-ff16-4e25-a2b0-2abcf420e3d6'),('c2e0e936-b922-47e8-ad96-1646abec5142','2022-06-30 19:44:09','Software For New Break System','BMW AG','d6ebf213-e828-457d-bb1b-935199b424bd'),('ea467c7f-21b5-4da9-a171-c23c8f452dc6','2022-06-30 19:44:09','Software For Time Management','Bosch GmbH','fdb71289-ddc7-4416-a4e4-d49ba8ef5af2'),('eaea0859-78df-4227-b078-3f6f0bdb0421','2022-06-30 19:44:09','Website Overhaul','Hochschule der Medien Stuttgart','77c08c43-e6bb-41d6-9c60-f2ff67ce4dd5');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_has_persons`
--

DROP TABLE IF EXISTS `projects_has_persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_has_persons` (
  `person_id` varchar(255) NOT NULL,
  `project_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_has_persons`
--

LOCK TABLES `projects_has_persons` WRITE;
/*!40000 ALTER TABLE `projects_has_persons` DISABLE KEYS */;
INSERT INTO `projects_has_persons` VALUES ('6a1bf002-9e5c-46c6-9eb9-5d625e5704b6','c2e0e936-b922-47e8-ad96-1646abec5142'),('6a1bf002-9e5c-46c6-9eb9-5d625e5704b6','067ffa28-e1c3-4f30-bb0e-97a59768f608'),('6a1bf002-9e5c-46c6-9eb9-5d625e5704b6','2653ebf6-e883-4c4e-9cea-a2426e63ad2d'),('6a1bf002-9e5c-46c6-9eb9-5d625e5704b6','ea467c7f-21b5-4da9-a171-c23c8f452dc6'),('6a1bf002-9e5c-46c6-9eb9-5d625e5704b6','5fad7bf6-c73d-4023-8a5c-8c5ab796e1b6'),('b168b262-acf3-4908-9726-7a44373ee1d0','067ffa28-e1c3-4f30-bb0e-97a59768f608'),('b168b262-acf3-4908-9726-7a44373ee1d0','07d61b73-4df0-4fc0-8fc4-b37f149210c9'),('b168b262-acf3-4908-9726-7a44373ee1d0','eaea0859-78df-4227-b078-3f6f0bdb0421'),('2637ea2d-3a1b-4d1a-8b76-3c92749685e0','067ffa28-e1c3-4f30-bb0e-97a59768f608'),('2637ea2d-3a1b-4d1a-8b76-3c92749685e0','07d61b73-4df0-4fc0-8fc4-b37f149210c9'),('2637ea2d-3a1b-4d1a-8b76-3c92749685e0','2653ebf6-e883-4c4e-9cea-a2426e63ad2d'),('2637ea2d-3a1b-4d1a-8b76-3c92749685e0','45a70306-59e4-46da-8b0b-fa5e63954391'),('2637ea2d-3a1b-4d1a-8b76-3c92749685e0','c2e0e936-b922-47e8-ad96-1646abec5142'),('2637ea2d-3a1b-4d1a-8b76-3c92749685e0','ea467c7f-21b5-4da9-a171-c23c8f452dc6'),('59eceb3b-890a-43d1-ada1-d10973e97260','2653ebf6-e883-4c4e-9cea-a2426e63ad2d'),('59eceb3b-890a-43d1-ada1-d10973e97260','5fad7bf6-c73d-4023-8a5c-8c5ab796e1b6'),('59eceb3b-890a-43d1-ada1-d10973e97260','eaea0859-78df-4227-b078-3f6f0bdb0421'),('b168b262-acf3-4908-9726-7a44373ee1d0','2653ebf6-e883-4c4e-9cea-a2426e63ad2d'),('4a4f37ff-7928-4e4a-8e75-851d223ee5e4','c2e0e936-b922-47e8-ad96-1646abec5142'),('4a4f37ff-7928-4e4a-8e75-851d223ee5e4','45a70306-59e4-46da-8b0b-fa5e63954391'),('4a4f37ff-7928-4e4a-8e75-851d223ee5e4','5fad7bf6-c73d-4023-8a5c-8c5ab796e1b6'),('847444dc-ceb7-4b8e-bd44-8767a7f3ac3a','07d61b73-4df0-4fc0-8fc4-b37f149210c9'),('847444dc-ceb7-4b8e-bd44-8767a7f3ac3a','c2e0e936-b922-47e8-ad96-1646abec5142');
/*!40000 ALTER TABLE `projects_has_persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_times`
--

DROP TABLE IF EXISTS `task_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_times` (
  `id` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_times`
--

LOCK TABLES `task_times` WRITE;
/*!40000 ALTER TABLE `task_times` DISABLE KEYS */;
INSERT INTO `task_times` VALUES ('03f3fb71-1114-4b09-be22-1ac19e5e80a1','2022-06-30 19:44:09','2022-07-02 13:09:00','2022-07-02 15:25:00'),('047cc005-992d-49b9-84f6-69dafe45bc5c','2022-06-30 19:44:09','2022-07-02 07:10:00','2022-07-02 10:00:00'),('19b80588-d47d-4752-b8ce-0a7dc75c62de','2022-06-30 19:44:09','2022-07-02 10:54:00','2022-07-02 12:02:00'),('1ae32f6f-be35-4471-b47e-8747527ef845','2022-06-30 19:44:09','2022-07-01 15:41:00','2022-07-01 18:25:00'),('1de6cdbb-4167-43cd-acb6-963855501701','2022-06-30 19:44:09','2022-07-01 11:32:00','2022-07-01 12:05:00'),('1fc05991-26f6-43f1-b317-e42a4da0da4e','2022-06-30 19:44:09','2022-06-30 09:20:00','2022-06-30 11:40:00'),('23a5ea8c-a97f-44be-9223-a84cddac7ead','2022-06-30 19:44:09','2022-06-30 13:15:00','2022-06-30 14:50:00'),('2d46177c-6664-4db2-8123-de962ab58c3c','2022-06-30 19:44:09','2022-07-02 10:58:00','2022-07-02 12:07:00'),('2f447536-04b6-48a5-b0a8-424532f57412','2022-06-30 18:40:41','2022-06-21 13:25:00','2022-06-21 15:30:00'),('326cb97a-ad24-45ca-abb4-c723a14b626a','2022-06-30 19:44:09','2022-07-01 16:50:00','2022-07-01 17:50:00'),('33341754-05dc-4f8f-b6e9-1a93d4bb5064','2022-06-30 19:44:09','2022-07-02 13:05:00','2022-07-02 14:30:00'),('37bc9290-e263-41f6-aa32-f0e52e1a515c','2022-06-30 19:44:09','2022-07-01 10:30:00','2022-07-01 11:30:00'),('39a6ec16-4232-4316-9e09-e9587a547437','2022-06-30 19:44:09','2022-07-02 07:10:00','2022-07-02 10:50:00'),('4bd52fa3-59d8-4a73-8a2c-ca3bc14880cd','2022-06-30 19:44:09','2022-07-02 11:16:00','2022-07-02 12:18:00'),('54449e74-bb88-46ff-a22e-1907857a9a64','2022-06-30 19:44:09','2022-07-02 10:05:00','2022-07-02 11:55:00'),('58d68d0f-ca83-4b7d-b5f4-aca782b595a8','2022-06-30 19:44:09','2022-06-23 10:31:00','2022-06-23 11:59:00'),('5f96a7c0-0626-43e7-8451-3d0bed2d3d94','2022-06-30 18:40:41','2022-06-21 15:40:00','2022-06-21 17:10:00'),('60690fca-5d94-4774-afa8-b122d1897789','2022-06-30 19:44:09','2022-06-28 06:15:00','2022-06-28 10:30:00'),('61ba7506-f414-48b1-a88e-df1585697347','2022-06-30 19:44:09','2022-07-01 09:05:00','2022-07-01 10:55:00'),('67a368f8-f23d-4c7d-b431-bf15655efad2','2022-06-30 19:44:09','2022-06-27 09:03:00','2022-06-27 12:00:00'),('6d4ff99f-8cce-413e-8e6c-b9d5fd3f7b5e','2022-06-30 18:40:41','2022-06-22 10:59:00','2022-06-22 12:32:00'),('6ec060b0-941a-445a-a74c-0a491150baf8','2022-06-30 19:44:09','2022-06-28 10:42:00','2022-06-28 11:48:00'),('75779058-f08c-4fd9-99b4-bcd35f3b8b2f','2022-06-30 19:44:09','2022-06-30 11:45:00','2022-06-30 12:00:00'),('77cf7ad9-b1d4-46e2-8646-55790903d7d0','2022-06-30 19:44:09','2022-07-02 13:25:00','2022-07-02 14:40:00'),('78379abe-42b6-47aa-b624-501805ca8061','2022-06-30 19:44:09','2022-07-01 13:00:00','2022-07-01 15:30:00'),('80dec1b1-3ac9-4faa-8e59-c6244da1be47','2022-06-30 19:44:09','2022-07-02 08:00:00','2022-07-02 10:50:00'),('83db822b-b3b1-409a-bc20-ac6e6ee5bb65','2022-06-30 19:44:09','2022-07-01 08:55:00','2022-07-01 09:36:00'),('84afa5ed-9cf9-4744-84e7-2cf16e02b519','2022-06-30 19:44:09','2022-07-01 15:45:00','2022-07-01 18:05:00'),('8f698bd3-2624-4ebd-b9a7-97635372795d','2022-06-30 19:44:09','2022-06-28 13:06:00','2022-06-28 15:01:00'),('8f79562f-bdbe-4264-80a7-ad50794c1b9d','2022-06-30 19:44:09','2022-07-02 15:27:00','2022-07-02 16:03:00'),('91557136-04c7-4f49-aeac-fa6b93c3488c','2022-06-30 19:44:09','2022-06-30 07:42:00','2022-06-30 09:15:00'),('96bcaeef-445f-4ef4-b978-6ff0d37427ea','2022-06-30 19:44:09','2022-07-01 13:15:00','2022-07-01 15:41:00'),('99acf0f4-fbc0-438b-bde4-f31dce1ccf3a','2022-06-30 19:44:09','2022-07-02 14:40:00','2022-07-02 15:30:00'),('9b36e6dd-95a5-4598-8ac0-b0be7b39385c','2022-06-30 19:44:09','2022-06-23 15:48:00','2022-06-23 16:50:00'),('9d15cf4a-72aa-4592-92b1-3387f09845b0','2022-06-30 19:44:09','2022-07-02 13:05:00','2022-07-02 15:45:00'),('9ee41153-421d-4cdb-8f4d-7a1eac026760','2022-06-30 19:44:09','2022-07-01 11:00:00','2022-07-01 12:00:00'),('ad73c393-d216-4200-9588-8e3f9edacc27','2022-06-30 19:44:09','2022-06-23 08:01:00','2022-06-23 10:24:00'),('b1e79e69-3337-4ff9-8f48-475883d92deb','2022-06-30 18:40:41','2022-06-21 11:45:00','2022-06-21 12:00:00'),('b28c17d3-e2e8-4d2a-b419-3f669ee8182b','2022-06-30 19:44:09','2022-07-01 09:40:00','2022-07-01 11:45:00'),('b8e74df3-9dfb-497e-9135-81868b166aa8','2022-06-30 19:44:09','2022-06-27 13:12:00','2022-06-27 17:05:00'),('c0c26007-955c-44bb-8952-cf7d526aed79','2022-06-30 19:44:09','2022-07-01 13:10:00','2022-07-01 16:47:00'),('c6b693d2-c2a2-4dd0-93e7-8e05ea99e838','2022-06-30 18:40:41','2022-06-21 08:23:00','2022-06-21 11:37:00'),('c7d11e7e-039f-466a-a264-23d8e42c865a','2022-06-30 18:40:41','2022-06-22 13:39:00','2022-06-22 17:10:00'),('d31f1d70-e1e8-4832-a167-5f79c07490f7','2022-06-30 19:44:09','2022-07-02 15:32:00','2022-07-02 15:58:00'),('d569cd7b-ac3a-4784-a1cb-e84c1414b0ef','2022-06-30 19:44:09','2022-06-27 17:09:00','2022-06-27 17:50:00'),('d5d40c8b-8102-4ed4-8b05-7470645d53ab','2022-06-30 19:44:09','2022-06-30 15:00:00','2022-06-30 16:40:00'),('d63ab187-2fcc-4101-bbb0-5e7762ac3cc1','2022-06-30 19:44:09','2022-07-02 15:50:00','2022-07-02 16:40:00'),('d6bd4934-83c8-45e1-901d-335d603e1def','2022-06-30 19:44:09','2022-06-23 13:23:00','2022-06-23 15:40:00'),('dc64bb0c-b6ab-4208-bb40-cf608051d657','2022-06-30 19:44:09','2022-07-02 09:35:00','2022-07-02 11:15:00'),('dc771c24-fb09-4ff4-9685-86f883bea24c','2022-06-30 18:40:41','2022-06-22 08:38:00','2022-06-22 10:50:00'),('dd1f2f1d-d9e6-4451-b7f5-a5e0cd152653','2022-06-30 19:44:09','2022-07-02 14:45:00','2022-07-02 18:27:00'),('f4a0324d-c757-4100-9711-aaf05ef14b2f','2022-06-30 19:44:09','2022-07-01 09:15:00','2022-07-01 10:25:00');
/*!40000 ALTER TABLE `task_times` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `est_working_time` decimal(10,2) NOT NULL,
  `project_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('08345c11-f367-43ad-80b0-cce8d7e79284','2022-06-30 18:40:41','Identify Requirements',1.00,'ea467c7f-21b5-4da9-a171-c23c8f452dc6'),('0e4d75b8-cae0-4ede-9a20-b6ae10a3a81f','2022-06-30 18:40:41','Create Billboard Design',7.00,'45a70306-59e4-46da-8b0b-fa5e63954391'),('0fd0c6cf-2ec3-4c6d-8f7d-feff12a3c2ce','2022-06-30 18:40:41','Create Unit Tests',0.20,'5fad7bf6-c73d-4023-8a5c-8c5ab796e1b6'),('167e86ba-b9df-4590-bcd6-4ca6857e8d80','2022-06-30 18:40:41','Add Login For Students',6.00,'eaea0859-78df-4227-b078-3f6f0bdb0421'),('1d0ea723-bd1c-4d87-bd29-c2c1a6eb6bbb','2022-06-30 18:40:41','Analyze Previously Used System',5.00,'c2e0e936-b922-47e8-ad96-1646abec5142'),('202f030d-3003-4d8f-a444-f0f3534a2b0a','2022-06-30 18:40:41','Identify Requirements',0.50,'eaea0859-78df-4227-b078-3f6f0bdb0421'),('2b67de98-42c1-4ee7-b5bd-85eee41cfbc7','2022-06-30 18:40:41','Identify Requirements',1.00,'2653ebf6-e883-4c4e-9cea-a2426e63ad2d'),('2bcda842-cf81-4226-8f85-79e3fad2653c','2022-06-30 18:40:41','Identify Requirements',1.00,'067ffa28-e1c3-4f30-bb0e-97a59768f608'),('39a4fcf1-bf2e-414a-80ca-7bfede98a6d0','2022-06-30 18:40:41','Analyze Previously Used System',4.00,'5fad7bf6-c73d-4023-8a5c-8c5ab796e1b6'),('4696e346-2d70-4c72-92e9-aa7d7962bcd5','2022-06-30 18:40:41','Create Unit Tests',3.00,'067ffa28-e1c3-4f30-bb0e-97a59768f608'),('4a052bcf-fe90-477b-8502-d9ac3e692074','2022-06-30 18:40:41','Identify Requirements',1.00,'45a70306-59e4-46da-8b0b-fa5e63954391'),('4e0ae0cd-1fb5-4146-b81a-82af0ff03b50','2022-06-30 18:40:41','Identify Possible Problems',3.00,'5fad7bf6-c73d-4023-8a5c-8c5ab796e1b6'),('5799c9b6-7ff0-44b0-b508-bc2e039c4d38','2022-06-30 18:40:41','Analyze Previously Used System',2.00,'2653ebf6-e883-4c4e-9cea-a2426e63ad2d'),('5cd4a147-e784-46ac-aaac-cc061f6fbdf0','2022-06-30 18:40:41','Identify Possible Problems',5.00,'067ffa28-e1c3-4f30-bb0e-97a59768f608'),('5fb1edf4-e684-415b-8418-d9b1571c8bfa','2022-06-30 18:40:41','Identify Use Cases',0.50,'2653ebf6-e883-4c4e-9cea-a2426e63ad2d'),('61cbda43-d0f5-4b74-8a3e-fef70b64a40c','2022-06-30 18:40:41','Create Unit Tests',3.50,'2653ebf6-e883-4c4e-9cea-a2426e63ad2d'),('64271e11-6895-47f7-8443-a85e4b44e5a8','2022-06-30 18:40:41','Test Aerodynamics',11.00,'07d61b73-4df0-4fc0-8fc4-b37f149210c9'),('6d177f99-a3ff-4297-b921-4d0ad80097d2','2022-06-30 18:40:41','Identify Requirements',2.00,'c2e0e936-b922-47e8-ad96-1646abec5142'),('80e63164-fac3-42fb-8ce1-434c8a53f681','2022-06-30 18:40:41','Implement Interactive Calendar',4.00,'eaea0859-78df-4227-b078-3f6f0bdb0421'),('843da0ba-ac3c-4c1e-b0ff-d5cf8567fae1','2022-06-30 18:40:41','Create Flyer Design',12.50,'45a70306-59e4-46da-8b0b-fa5e63954391'),('950a6e31-ffee-45be-9d31-800b1d143bfb','2022-06-30 18:40:41','Sketch First Ideas',6.00,'45a70306-59e4-46da-8b0b-fa5e63954391'),('96429526-0b6e-49d0-aa37-ddb236cb454c','2022-06-30 18:40:41','Create First Sketches',6.00,'07d61b73-4df0-4fc0-8fc4-b37f149210c9'),('9c3da72e-aaec-4b6f-ab78-f49415755bbc','2022-06-30 18:40:41','Identify Possible Problems',1.00,'2653ebf6-e883-4c4e-9cea-a2426e63ad2d'),('a397de91-2f01-4744-8a51-92a3a07074f2','2022-06-30 18:40:41','Identify Possible Problems',6.00,'ea467c7f-21b5-4da9-a171-c23c8f452dc6'),('b8a8b176-744e-43cd-9cbf-60127ab2e3b2','2022-06-30 18:40:41','Test Design in Simulations',8.00,'07d61b73-4df0-4fc0-8fc4-b37f149210c9'),('c91b25db-357f-4be0-99bb-ce3c01d659f2','2022-06-30 18:40:41','Identify Requirements',1.50,'07d61b73-4df0-4fc0-8fc4-b37f149210c9'),('d8f891e5-ead6-4b14-ad18-4385d9a6115f','2022-06-30 18:40:41','Implement News Feed',4.00,'eaea0859-78df-4227-b078-3f6f0bdb0421'),('df10128a-b1cb-4483-ab51-1e9894bff9ba','2022-06-30 18:40:41','Identify Possible Problems',4.00,'c2e0e936-b922-47e8-ad96-1646abec5142'),('ece27cc2-8cf9-4652-a798-0e9f90c2fb69','2022-06-30 18:40:41','Create Unit Tests',3.30,'ea467c7f-21b5-4da9-a171-c23c8f452dc6'),('f1d24ac1-ad9f-4b17-8ce9-b0c468f89ff6','2022-06-30 18:40:41','Create Unit Tests',5.00,'c2e0e936-b922-47e8-ad96-1646abec5142'),('f21837e0-b199-4a86-9db5-7c9686c726d4','2022-06-30 18:40:41','Create Clay Prototype',17.00,'07d61b73-4df0-4fc0-8fc4-b37f149210c9'),('fada31a1-1d4e-44e0-a37a-c496c7a4d6e0','2022-06-30 18:40:41','Identify Requirements',1.00,'5fad7bf6-c73d-4023-8a5c-8c5ab796e1b6');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-30 21:54:15
