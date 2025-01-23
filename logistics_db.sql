-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2025 at 07:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logistics_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE `deliveries` (
  `id` int(11) NOT NULL,
  `truck` varchar(50) DEFAULT NULL,
  `pickup` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `driver` varchar(100) DEFAULT NULL,
  `driver_image` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `lat` decimal(9,6) DEFAULT NULL,
  `lng` decimal(9,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliveries`
--

INSERT INTO `deliveries` (`id`, `truck`, `pickup`, `destination`, `driver`, `driver_image`, `status`, `lat`, `lng`) VALUES
(1, 'EV-2017002348', '2972 Godomey', '8502 Preston', 'Durrell Steward', 'driver1.jpg', 'In Transit', 37.774900, -122.419400),
(2, 'EV-2017003222', '2872 Westheimer', '8502 Preston', 'Jenny Wilson', 'driver2.jpg', 'Delivered', 34.052200, -118.243700),
(3, 'EV-2017002312', '2972 Westheimer', '8502 Preston', 'Darrell Steward', 'driver1.jpg', 'Pending Pickup', 40.712800, -74.006000);

-- --------------------------------------------------------

--
-- Table structure for table `historique`
--

CREATE TABLE `historique` (
  `id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historique`
--

INSERT INTO `historique` (`id`, `message`, `timestamp`) VALUES
(1, 'Camion 125B a dépasser 48 heures de stationnement - 10:17 AM', '2025-01-23 03:53:33'),
(2, 'Nouveau camion détecté dans \"Main entrance 2\" - 9:10 AM', '2025-01-23 03:53:33'),
(3, 'Véhicule détecté dans Office B11 - 8:44 AM', '2025-01-23 03:53:33'),
(4, 'Véhicule détecté dans Area 2 - 8:41 AM', '2025-01-23 03:53:33');

-- --------------------------------------------------------

--
-- Table structure for table `livraisons`
--

CREATE TABLE `livraisons` (
  `id` int(11) NOT NULL,
  `numero_commande` varchar(50) NOT NULL,
  `statut` enum('en cours','programmée') NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `livraisons`
--

INSERT INTO `livraisons` (`id`, `numero_commande`, `statut`, `TIMESTAMP`) VALUES
(1, '000012', 'en cours', '2025-01-23 03:48:22'),
(2, '000013', 'en cours', '2025-01-23 03:48:22'),
(3, '000014', 'en cours', '2025-01-23 03:48:22'),
(4, '000015', 'programmée', '2025-01-23 03:48:22'),
(5, '000016', 'programmée', '2025-01-23 03:48:22'),
(6, '000017', 'programmée', '2025-01-23 03:48:22');

-- --------------------------------------------------------

--
-- Table structure for table `parking_data`
--

CREATE TABLE `parking_data` (
  `id` int(11) NOT NULL,
  `parking_name` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `available` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` enum('libre','occupé','maintenance') DEFAULT 'libre',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parking_data`
--

INSERT INTO `parking_data` (`id`, `parking_name`, `capacity`, `available`, `location`, `status`, `timestamp`) VALUES
(1, 'Parking A', 100, 70, 'Zone 1', 'libre', '2025-01-23 03:57:17'),
(2, 'Parking B', 200, 50, 'Zone 2', 'occupé', '2025-01-23 03:57:17'),
(3, 'Parking C', 150, 90, 'Zone 3', 'libre', '2025-01-23 03:57:17'),
(4, 'Parking D', 120, 10, 'Zone 4', 'maintenance', '2025-01-23 03:57:17');

-- --------------------------------------------------------

--
-- Table structure for table `parking_data1`
--

CREATE TABLE `parking_data1` (
  `id` int(11) NOT NULL,
  `permanent` int(11) DEFAULT NULL,
  `temporaire` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parking_data1`
--

INSERT INTO `parking_data1` (`id`, `permanent`, `temporaire`) VALUES
(1, 60, 40);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_traffic_data`
--

CREATE TABLE `vehicle_traffic_data` (
  `id` int(11) NOT NULL,
  `month` varchar(50) DEFAULT NULL,
  `traffic` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle_traffic_data`
--

INSERT INTO `vehicle_traffic_data` (`id`, `month`, `traffic`) VALUES
(1, 'Janvier', 15000),
(2, 'Février', 13500),
(3, 'Mars', 16000),
(4, 'Avril', 17000),
(5, 'Mai', 18000),
(6, 'Juin', 19000),
(7, 'Juillet', 20000),
(8, 'Août', 21000),
(9, 'Septembre', 19500),
(10, 'Octobre', 17500),
(11, 'Novembre', 16000),
(12, 'Décembre', 15500);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `livraisons`
--
ALTER TABLE `livraisons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parking_data`
--
ALTER TABLE `parking_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parking_data1`
--
ALTER TABLE `parking_data1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle_traffic_data`
--
ALTER TABLE `vehicle_traffic_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `historique`
--
ALTER TABLE `historique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `livraisons`
--
ALTER TABLE `livraisons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `parking_data`
--
ALTER TABLE `parking_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `parking_data1`
--
ALTER TABLE `parking_data1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vehicle_traffic_data`
--
ALTER TABLE `vehicle_traffic_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
