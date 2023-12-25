-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2023 at 08:18 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `dataadmin`
--

CREATE TABLE `dataadmin` (
  `ID` int(255) NOT NULL,
  `IDuser` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `NIK` bigint(255) NOT NULL,
  `Nama` varchar(255) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dataadmin`
--

INSERT INTO `dataadmin` (`ID`, `IDuser`, `Password`, `NIK`, `Nama`, `Gender`, `Status`) VALUES
(1, 'admin', '$2a$12$ltSNWJaqYWYMK5hnOeyNSev3M6MPTGW2LKEorc.HAYj600kNO/V2W', 1247984732589728, 'admin', 'Laki-laki', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `datalaporan`
--

CREATE TABLE `datalaporan` (
  `ID` int(255) NOT NULL,
  `KK` bigint(16) NOT NULL,
  `Nama` varchar(255) NOT NULL,
  `Month` varchar(255) NOT NULL,
  `Year` int(255) NOT NULL,
  `Date` date DEFAULT NULL,
  `Status` varchar(255) NOT NULL,
  `Nominal` bigint(255) DEFAULT NULL,
  `Expired` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `datalaporan`
--

INSERT INTO `datalaporan` (`ID`, `KK`, `Nama`, `Month`, `Year`, `Date`, `Status`, `Nominal`, `Expired`) VALUES
(70, 1234567890123456, 'User1', 'Januari', 2023, '0000-00-00', 'Lunas', 150000, 'NONE'),
(71, 123123, 'user2', 'Januari', 2023, NULL, 'On Going', 0, 'NONE');

--
-- Triggers `datalaporan`
--
DELIMITER $$
CREATE TRIGGER `update_status` BEFORE INSERT ON `datalaporan` FOR EACH ROW SET NEW.Status = CASE
    WHEN NEW.Nominal < 15000 THEN 'On Going'
    WHEN NEW.Nominal >= 15000 THEN 'Lunas'
    ELSE NEW.Status
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_status_update` BEFORE UPDATE ON `datalaporan` FOR EACH ROW SET NEW.Status = CASE
    WHEN NEW.Nominal < 15000 THEN 'On Going'
    WHEN NEW.Nominal >= 15000 THEN 'Lunas'
    ELSE NEW.Status
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `datapengeluaran`
--

CREATE TABLE `datapengeluaran` (
  `ID` int(255) NOT NULL,
  `Nominal` bigint(255) NOT NULL,
  `Keterangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `datapengeluaran`
--

INSERT INTO `datapengeluaran` (`ID`, `Nominal`, `Keterangan`) VALUES
(9, 10000, 'Beli Sembako'),
(10, 1000, 'test'),
(11, 1500000, 'asdasd');

-- --------------------------------------------------------

--
-- Table structure for table `datapetugas`
--

CREATE TABLE `datapetugas` (
  `ID` int(11) NOT NULL,
  `IDuser` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `NIK` bigint(255) NOT NULL,
  `Nama` varchar(255) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `datapetugas`
--

INSERT INTO `datapetugas` (`ID`, `IDuser`, `Password`, `NIK`, `Nama`, `Gender`, `Status`) VALUES
(30, 'Admin', '$2a$12$w9t33/pp7ATucl6pz/E5OuzrontjCBBbmIc4lWL1aE5.Ul/T5e8QS', 1476583484588383, 'Admin', 'Laki-laki', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `datauser`
--

CREATE TABLE `datauser` (
  `ID` int(11) NOT NULL,
  `IDuser` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `NIK` bigint(16) NOT NULL,
  `Nama` varchar(255) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `datauser`
--

INSERT INTO `datauser` (`ID`, `IDuser`, `Password`, `NIK`, `Nama`, `Gender`, `Status`) VALUES
(1, 'loginuser', '$2a$12$tB6W/NjU8BgKm6b.1h5aiO7ObkQ3rd6cJ/UEx1nKTNVsYowJywk2.', 1404092837827832, 'USER', 'Laki-laki', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `datawarga`
--

CREATE TABLE `datawarga` (
  `ID` int(255) NOT NULL,
  `KK` bigint(16) NOT NULL,
  `Nama` varchar(255) NOT NULL,
  `Alamat` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `datawarga`
--

INSERT INTO `datawarga` (`ID`, `KK`, `Nama`, `Alamat`, `Status`) VALUES
(18, 1234567890123456, 'User1', 'AlamatUser1', 'Active'),
(22, 123123, 'user2', 'user2', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `month`
--

CREATE TABLE `month` (
  `ID` int(11) NOT NULL,
  `bulan` varchar(255) NOT NULL,
  `tahun` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `month`
--

INSERT INTO `month` (`ID`, `bulan`, `tahun`) VALUES
(77, 'Januari', 76),
(72, 'Januari', 2023),
(75, 'Januari', 2024),
(74, 'Januari', 2025),
(79, 'Januari', 2026);

-- --------------------------------------------------------

--
-- Table structure for table `year`
--

CREATE TABLE `year` (
  `ID` int(255) NOT NULL,
  `years` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year`
--

INSERT INTO `year` (`ID`, `years`) VALUES
(2023, 2023),
(2024, 2024),
(2025, 2025),
(2026, 2026);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dataadmin`
--
ALTER TABLE `dataadmin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `datalaporan`
--
ALTER TABLE `datalaporan`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `KK` (`KK`,`Month`,`Year`);

--
-- Indexes for table `datapengeluaran`
--
ALTER TABLE `datapengeluaran`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `datapetugas`
--
ALTER TABLE `datapetugas`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `IDuser` (`IDuser`);

--
-- Indexes for table `datauser`
--
ALTER TABLE `datauser`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `datawarga`
--
ALTER TABLE `datawarga`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `month`
--
ALTER TABLE `month`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `bulan` (`bulan`,`tahun`);

--
-- Indexes for table `year`
--
ALTER TABLE `year`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dataadmin`
--
ALTER TABLE `dataadmin`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `datalaporan`
--
ALTER TABLE `datalaporan`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `datapengeluaran`
--
ALTER TABLE `datapengeluaran`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `datapetugas`
--
ALTER TABLE `datapetugas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `datauser`
--
ALTER TABLE `datauser`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `datawarga`
--
ALTER TABLE `datawarga`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `month`
--
ALTER TABLE `month`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
