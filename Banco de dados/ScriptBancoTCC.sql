-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema BDmedcai
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema BDmedcai
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BDmedcai` DEFAULT CHARACTER SET utf8 ;
USE `BDmedcai` ;

-- -----------------------------------------------------
-- Table `BDmedcai`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDmedcai`.`Usuario` (
  `idUsuario` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  `Senha` VARCHAR(10) NULL,
  `Login` VARCHAR(45) NULL,
  `UF` VARCHAR(2) NULL,
  `Cidade` VARCHAR(45) NULL,
  `Bairro` VARCHAR(45) NULL,
  `Rua` VARCHAR(45) NULL,
  `NumeroCasa` INT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `idUsuario_UNIQUE` (`idUsuario` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BDmedcai`.`Noticias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDmedcai`.`Noticias` (
  `idNoticias` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NoticiasGeraisMedcina` LONGTEXT NULL,
  `NoticiasGeraisIAS` LONGTEXT NULL,
  `Usuario_idUsuario` INT UNSIGNED NOT NULL,
  `Permissao` TINYINT NULL,
  PRIMARY KEY (`idNoticias`),
  UNIQUE INDEX `IdNoticias_UNIQUE` (`idNoticias` ASC) ,
  INDEX `fk_Noticias_Usuario1_idx` (`Usuario_idUsuario` ASC) ,
  CONSTRAINT `fk_Noticias_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `BDmedcai`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BDmedcai`.`IA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDmedcai`.`IA` (
  `idIA` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `DoençasDermatologicas` LONGTEXT NULL,
  `Queimaduras` LONGTEXT NULL,
  `Imagens` BLOB NULL,
  PRIMARY KEY (`idIA`),
  UNIQUE INDEX `idIA_UNIQUE` (`idIA` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BDmedcai`.`Diagnostico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDmedcai`.`Diagnostico` (
  `idDiagnostico` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Diagnostico` VARCHAR(400) NULL,
  `Gravidade` VARCHAR(45) NULL,
  `PorcentagemChances` VARCHAR(45) NULL,
  `Usuario_idUsuario` INT UNSIGNED NOT NULL,
  `IA_idIA` INT UNSIGNED NOT NULL,
  `ImagemUsuario` BLOB NULL,
  PRIMARY KEY (`idDiagnostico`),
  UNIQUE INDEX `idDiagnostico_UNIQUE` (`idDiagnostico` ASC) ,
  INDEX `fk_Diagnostico_Usuario_idx` (`Usuario_idUsuario` ASC) ,
  INDEX `fk_Diagnostico_IA1_idx` (`IA_idIA` ASC) ,
  CONSTRAINT `fk_Diagnostico_Usuario`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `BDmedcai`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Diagnostico_IA1`
    FOREIGN KEY (`IA_idIA`)
    REFERENCES `BDmedcai`.`IA` (`idIA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BDmedcai`.`Tratamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDmedcai`.`Tratamento` (
  `idTratamento` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Tratamento` LONGTEXT NULL,
  `TipoDoença` VARCHAR(100) NULL,
  `Diagnostico_idDiagnostico` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idTratamento`),
  UNIQUE INDEX `idTratamento_UNIQUE` (`idTratamento` ASC) ,
  INDEX `fk_Tratamento_Diagnostico1_idx` (`Diagnostico_idDiagnostico` ASC) ,
  CONSTRAINT `fk_Tratamento_Diagnostico1`
    FOREIGN KEY (`Diagnostico_idDiagnostico`)
    REFERENCES `BDmedcai`.`Diagnostico` (`idDiagnostico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;