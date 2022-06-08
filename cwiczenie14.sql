USE master
GO

DROP DATABASE IF EXISTS Cwiczenie14
GO

CREATE DATABASE Cwiczenie14
GO

USE Cwiczenie14
GO

CREATE TABLE Produkty (
  Id INT IDENTITY PRIMARY KEY,
  Nazwa VARCHAR(20) NOT NULL,
  LiczbaSztuk TINYINT NOT NULL,
  Kolor VARCHAR(10) CHECK(Kolor in ('czerwony', 'zielony', 'niebieski'))
)

INSERT INTO Produkty VALUES
('Spodnie', 10, 'czerwony'),
('Koszula', 5, 'niebieski'),
('Sukienka', 13, 'zielony')

CREATE USER appUser FOR LOGIN appUser
GO

EXEC sp_addrolemember 'db_datawriter', 'appUser'
EXEC sp_addrolemember 'db_datareader', 'appUser'