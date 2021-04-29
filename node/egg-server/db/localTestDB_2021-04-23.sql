# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 8.0.17)
# Database: localTestDB
# Generation Time: 2021-04-23 08:58:21 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table applications
# ------------------------------------------------------------

DROP TABLE IF EXISTS `applications`;

CREATE TABLE `applications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `app_id` varchar(40) DEFAULT NULL,
  `app_name` varchar(40) DEFAULT NULL,
  `app_desc` text,
  `create_date` timestamp NULL DEFAULT NULL,
  `release_status` tinyint(1) DEFAULT NULL,
  `release_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;

INSERT INTO `applications` (`id`, `app_id`, `app_name`, `app_desc`, `create_date`, `release_status`, `release_date`)
VALUES
	(1,'oa-1617694270763-206276','oa','OA 流程应用','2021-04-06 15:39:21',0,NULL),
	(3,'test01-1617694270763-206276','test01','test01 app','2021-04-13 14:05:41',NULL,NULL),
	(5,'test02-1617694270763-206276','test01','test01 app','2021-04-13 14:07:17',NULL,NULL);

/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table assets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assets`;

CREATE TABLE `assets` (
  `assets_id` varchar(40) NOT NULL,
  `assets_name` varchar(40) DEFAULT NULL,
  `assets_desc` text,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `drag_platform_path` varchar(40) NOT NULL,
  `schema_id` varchar(40) DEFAULT NULL,
  `app_id` varchar(40) DEFAULT NULL,
  `custom_code_id` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`assets_id`),
  KEY `schema_id` (`schema_id`),
  CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`schema_id`) REFERENCES `configs_schema` (`schema_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;

INSERT INTO `assets` (`assets_id`, `assets_name`, `assets_desc`, `create_date`, `drag_platform_path`, `schema_id`, `app_id`, `custom_code_id`)
VALUES
	('assets-network-1619145506341-924012','network','网点资产描述','2021-04-23 10:38:26','/configs',NULL,'oa-1617694270763-206276',NULL),
	('assets-network1-1619145871441-176529','network1','网点资产描述1','2021-04-23 10:44:31','/configs',NULL,'oa-1617694270763-206276',NULL),
	('assets-network2-1619146046425-321869','network2','网点资产描述2','2021-04-23 10:47:26','/configs',NULL,'oa-1617694270763-206276',NULL);

/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table configs_schema
# ------------------------------------------------------------

DROP TABLE IF EXISTS `configs_schema`;

CREATE TABLE `configs_schema` (
  `schema_id` varchar(40) NOT NULL,
  `schema_content` text NOT NULL,
  `page_id` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`schema_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `configs_schema` WRITE;
/*!40000 ALTER TABLE `configs_schema` DISABLE KEYS */;

INSERT INTO `configs_schema` (`schema_id`, `schema_content`, `page_id`)
VALUES
	('oa-leave-schema-001','{\"type\":\"page\",\"body\":[]}','oa-leave-1617694433000-206276');

/*!40000 ALTER TABLE `configs_schema` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table custom_code
# ------------------------------------------------------------

DROP TABLE IF EXISTS `custom_code`;

CREATE TABLE `custom_code` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` text,
  `filename` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `page_id` varchar(40) DEFAULT NULL,
  `custom_code_id` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `custom_code_id` (`custom_code_id`),
  UNIQUE KEY `page_id` (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `custom_code` WRITE;
/*!40000 ALTER TABLE `custom_code` DISABLE KEYS */;

INSERT INTO `custom_code` (`id`, `code`, `filename`, `page_id`, `custom_code_id`)
VALUES
	(1,'/** \n *自我排查问题 \n */\n\nfunction click2 {\n    console.log(\'6542345897\')\n}','leave-code-1617256296270-9513.js','oa-leave-1617694433000-206276','oa-leave-custom-code-001'),
	(19,'/** \n * 网点: 自我排查问题 \n */\n\nfunction click2 {\n    console.log(\'11145897\')\n}','network-code-1618381874445-570241.js','oa-network-1617694433000-206276','network-code-1618381874445-51756'),
	(20,'/** \n *test: 排查问题 \n */\n\nfunction click2(params) {\n return params.firstLongName+params.anotherLongName \n} console.log(\'6542345897\', click2({firstLongName: 3, anotherLongName: 5}))','test-leave-code-1618382295725-927479.js','test-leave-1617694433000-206276','test-leave-code-1618382295725-994920');

/*!40000 ALTER TABLE `custom_code` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pages`;

CREATE TABLE `pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `page_id` varchar(40) DEFAULT NULL,
  `app_id` varchar(40) DEFAULT NULL,
  `page_name` varchar(40) DEFAULT NULL,
  `drag_platform_path` varchar(40) DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `schema_id` varchar(40) DEFAULT NULL,
  `custom_code_id` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_id` (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;

INSERT INTO `pages` (`id`, `page_id`, `app_id`, `page_name`, `drag_platform_path`, `create_date`, `update_date`, `schema_id`, `custom_code_id`)
VALUES
	(1,'oa-leave-1617694433000-206276','oa-1617694270763-206276','leave','/configs','2021-04-13 14:46:22','2021-04-13 16:11:53','oa-leave-schema-001','oa-leave-custom-code-001'),
	(2,'test-leave-1617694433000-206276','test01-1617694270763-206276','test-leave','/configs','2021-04-13 14:46:22','2021-04-14 14:38:15',NULL,'test-leave-code-1618382295725-994920'),
	(3,'oa-network-1617694433000-206276','oa-1617694270763-206276','network','/configs','2021-04-13 15:03:05','2021-04-14 14:31:14',NULL,'network-code-1618381874445-51756');

/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
