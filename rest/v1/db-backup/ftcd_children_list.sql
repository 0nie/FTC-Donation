-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2025 at 08:29 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viter_ftc_donation_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `ftcd_children_list`
--

CREATE TABLE `ftcd_children_list` (
  `children_list_aid` int(11) NOT NULL,
  `children_list_is_active` tinyint(1) NOT NULL,
  `children_list_first_name` varchar(128) NOT NULL,
  `children_list_last_name` varchar(128) NOT NULL,
  `children_list_birthdate` date NOT NULL,
  `children_list_age` int(11) NOT NULL,
  `children_list_donation` int(11) NOT NULL,
  `children_list_story` text NOT NULL,
  `children_list_created` datetime NOT NULL,
  `children_list_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ftcd_children_list`
--
ALTER TABLE `ftcd_children_list`
  ADD PRIMARY KEY (`children_list_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ftcd_children_list`
--
ALTER TABLE `ftcd_children_list`
  MODIFY `children_list_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
