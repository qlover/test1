/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : py_scrapy

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-09-14 13:55:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for city58
-- ----------------------------
DROP TABLE IF EXISTS `city58`;
CREATE TABLE `city58` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `job_id` decimal(10,0) DEFAULT NULL,
  `job_type` varchar(255) DEFAULT NULL,
  `job_name` varchar(255) DEFAULT NULL,
  `job_zlink` varchar(255) DEFAULT NULL,
  `job_salary` varchar(255) DEFAULT NULL,
  `job_cate` varchar(255) DEFAULT NULL,
  `job_edu` varchar(255) DEFAULT NULL,
  `job_exp` varchar(255) DEFAULT NULL,
  `job_company` varchar(255) DEFAULT NULL,
  `job_pubtime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4390 DEFAULT CHARSET=utf8;
