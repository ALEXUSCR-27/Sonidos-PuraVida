-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 11-10-2023 a las 21:21:35
-- Versión del servidor: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- Versión de PHP: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sonidos_puravida`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureBuscarAdministrador` (IN `pNombreAdministrador` VARCHAR(20))  BEGIN
    SELECT * FROM Administradores WHERE pNombreAdministrador = nombreAdministrador;
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureBuscarProvincia` (IN `pCodigoProvincia` INT)  BEGIN
    SELECT * FROM Provincias WHERE pCodigoProvincia = codigoProvincia;
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureBuscarPublicacion` (IN `pCodigoPublicacion` INT)  BEGIN
    SELECT * FROM Publicaciones WHERE pCodigoPublicacion = codigoPublicacion;
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureEliminarAdministrador` (IN `pNombreAdministrador` VARCHAR(20))  BEGIN
    DELETE FROM Administradores
    WHERE pNombreAdministrador = nombreAdministrador;
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureEliminarProvincia` (IN `pCodigoProvincia` INT)  BEGIN
    DELETE FROM Provincias
    WHERE pCodigoProvincia = codigoProvincia;
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureEliminarPublicacion` (IN `pCodigoPublicacion` INT)  BEGIN
    DELETE FROM Publicaciones
    WHERE pCodigoPublicacion = codigoPublicacion;
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureGenerarReporte` (IN `fechaInicio` DATE, IN `fechaFin` DATE)  BEGIN
    SELECT * FROM Publicaciones
    WHERE fecha BETWEEN fechaInicio AND fechaFin;
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureInsertarAdministrador` (IN `nombreAdministrador` VARCHAR(20), IN `contraseña` VARCHAR(16))  BEGIN
    INSERT INTO Administradores (nombreAdministrador, contraseña)
    VALUES (nombreAdministrador, contraseña);
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureInsertarProvincia` (IN `codigoProvincia` INT, IN `nombreProvincia` VARCHAR(20), IN `area` POLYGON)  BEGIN
    INSERT INTO Provincias (codigoProvincia, provincia, area)
    VALUES (codigoProvincia, nombreProvincia, area);
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureInsertarPublicacion` (IN `provincia` VARCHAR(20), IN `tit` VARCHAR(150), IN `latitud` DECIMAL(9,6), IN `longitud` DECIMAL(9,6), IN `descrip` VARCHAR(255), IN `fechaPublicacion` DATE, IN `autor` VARCHAR(60), IN `apellido` VARCHAR(60), IN `sonido` VARCHAR(255), IN `foto` VARCHAR(255))  BEGIN
    INSERT INTO Publicaciones (provincia, titulo, ubicacion, descripcion, fecha, nombreAutor, apellidoAutor, sonido, fotografia)
    VALUES (provincia, tit, POINT(latitud, longitud), descrip, fechaPublicacion, autor, apellido, sonido, foto);
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureModificarAdministrador` (IN `nombreActual` VARCHAR(20), IN `nuevaContraseña` VARCHAR(16))  BEGIN
    UPDATE Administradores
    SET contraseña = nuevaContraseña
    WHERE nombreAdministrador = nombreActual;
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureModificarProvincia` (IN `pCodigoProvincia` INT, IN `nuevaArea` POLYGON)  BEGIN
    UPDATE Provincias
    SET area = nuevaArea
    WHERE pCodigoProvincia = codigoProvincia;
END$$

CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureModificarPublicacion` (
    IN `pCodigoPublicacion` INT,
    IN `nuevaLatitud` DECIMAL(9,6),
    IN `nuevaLongitud` DECIMAL(9,6),
    IN `nuevoTitulo` VARCHAR(255),
    IN `nuevaProvincia` VARCHAR(255),
    IN `nuevaDescripcion` VARCHAR(255),
    IN `nuevoNombreAutor` VARCHAR(255),
    IN `nuevoApellidoAutor` VARCHAR(255)
)  
BEGIN
    UPDATE Publicaciones
    SET
        ubicacion = POINT(nuevaLatitud, nuevaLongitud),
        titulo = nuevoTitulo,
        provincia = nuevaProvincia,
        descripcion = nuevaDescripcion,
        nombreAutor = nuevoNombreAutor,
        apellidoAutor = nuevoApellidoAutor
    WHERE codigoPublicacion = pCodigoPublicacion;
END$$


CREATE DEFINER=`admin`@`localhost` PROCEDURE `procedureFiltrarPublicaciones`(
    IN p_titulo VARCHAR(255),
    IN p_autor VARCHAR(255),
    IN p_provincia VARCHAR(255),
    IN p_fecha DATE
)
BEGIN
    IF p_titulo = '' THEN
        SET p_titulo = NULL;
    END IF;
    IF p_autor = '' THEN
        SET p_autor = NULL;
    END IF;
    IF p_provincia = '' THEN
        SET p_provincia = NULL;
    END IF;
    IF p_fecha = '1990-01-01' THEN
        SET p_fecha = NULL;
    END IF;

    SELECT *, AsText(ubicacion) as coordenadas FROM Publicaciones
    WHERE 
        (p_titulo IS NULL OR titulo LIKE CONCAT('%', p_titulo, '%'))
        AND (p_autor IS NULL OR nombreAutor LIKE CONCAT('%', p_autor, '%'))
        AND (p_provincia IS NULL OR provincia = p_provincia)
        AND (p_fecha IS NULL OR fecha = p_fecha);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Administradores`
--

CREATE TABLE `Administradores` (
  `nombreAdministrador` varchar(20) NOT NULL,
  `contraseña` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Administradores`
--

INSERT INTO `Administradores` (`nombreAdministrador`, `contraseña`) VALUES
('unedSPV', 'SPV_2023'),
('NomAdmin2', 'ContraseñaAdmin2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Provincias`
--

CREATE TABLE `Provincias` (
  `codigoProvincia` int(4) NOT NULL,
  `provincia` varchar(20) DEFAULT NULL,
  `area` polygon DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Provincias`
--

INSERT INTO `Provincias` (`codigoProvincia`, `provincia`, `area`) VALUES
(1, 'San José', 0x0000000001030000000100000005000000000000000000f03f000000000000f03f000000000000004000000000000000400000000000000840000000000000084000000000000010400000000000001040000000000000f03f000000000000f03f),
(7, 'Limon', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Publicaciones`
--

CREATE TABLE `Publicaciones` (
  `codigoPublicacion` int(11) NOT NULL,
  `provincia` varchar(20) DEFAULT NULL,
  `titulo` varchar(150) DEFAULT NULL,
  `ubicacion` point DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `nombreAutor` varchar(60) DEFAULT NULL,
  `ApellidoAutor` varchar(60) DEFAULT NULL,
  `sonido` varchar(255) DEFAULT NULL,
  `fotografia` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Publicaciones`
--
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Administradores`
--
ALTER TABLE `Administradores`
  ADD PRIMARY KEY (`nombreAdministrador`);

--
-- Indices de la tabla `Provincias`
--
ALTER TABLE `Provincias`
  ADD PRIMARY KEY (`codigoProvincia`);

--
-- Indices de la tabla `Publicaciones`
--
ALTER TABLE `Publicaciones`
  ADD PRIMARY KEY (`codigoPublicacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Publicaciones`
--
ALTER TABLE `Publicaciones`
  MODIFY `codigoPublicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Publicaciones`

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
