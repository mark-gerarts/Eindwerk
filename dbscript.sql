-- DB Create script
CREATE TABLE Leerkrachten(
	id INT IDENTITY PRIMARY KEY,
	naam VARCHAR(255),
	voornaam VARCHAR(255),
);

CREATE TABLE Vakken (
	id INT IDENTITY PRIMARY KEY,
	naam VARCHAR(255)
);

CREATE TABLE LeerkrachtVakken(
	vakID INT,
	leerkrachtID INT,
	CONSTRAINT PK_LeerkrachtVakken PRIMARY KEY(vakID, leerkrachtID),
	CONSTRAINT FK_Vak_lv FOREIGN KEY (vakID) REFERENCES Vakken (id),
	CONSTRAINT FK_Leerkracht_lv FOREIGN KEY (leerkrachtID) REFERENCES Leerkrachten (id)
);
 
CREATE TABLE Lokaalnamen(
	id INT IDENTITY PRIMARY KEY,
	naam VARCHAR(255)
);

CREATE TABLE Campussen(
	id INT IDENTITY PRIMARY KEY,
	naam VARCHAR(255)
);

CREATE TABLE Lokalen(
	id INT IDENTITY PRIMARY KEY,
	naam VARCHAR(255),
	campusID INT,
	CONSTRAINT FK_campus_lokalen FOREIGN KEY (campusID) REFERENCES Campussen (id),
);
--
CREATE TABLE Studierichtingen(
	id INT IDENTITY PRIMARY KEY,
	naam VARCHAR(255)
);
CREATE TABLE Klassen(
	id INT IDENTITY PRIMARY KEY,
	studierichtingID INT,
	campusID INT,
	naam VARCHAR(255),
	leerjaar INT,
	CONSTRAINT FK_klas_sr FOREIGN KEY (studierichtingID) REFERENCES Studierichtingen (id),
	CONSTRAINT FK_klas_campus FOREIGN KEY (campusID) REFERENCES Campussen (id)
);
--
CREATE TABLE Dagen(
	id INT IDENTITY PRIMARY KEY,
	naam VARCHAR(20)
);
CREATE TABLE Lesblokken(
	id INT IDENTITY PRIMARY KEY,
	starttijd TIME,
	eindtijd TIME
);
CREATE TABLE Lessen(
	id INT IDENTITY PRIMARY KEY,
	jaar SMALLINT,
	lesblokID INT,
	dagID INT,
	leerkrachtID INT,
	lokaalID INT,
	klasID INT,
	vakID INT,
	CONSTRAINT FK_Les_Lesblok FOREIGN KEY (lesblokID) REFERENCES Lesblokken (id),
	CONSTRAINT FK_Les_Leerkracht FOREIGN KEY (leerkrachtID) REFERENCES Leerkrachten (id),
	CONSTRAINT FK_Les_Lokaal FOREIGN KEY (lokaalID) REFERENCES Lokalen (id),
	CONSTRAINT FK_Les_Klas FOREIGN KEY (klasID) REFERENCES Klassen (id),
	CONSTRAINT FK_Lesblok_dag FOREIGN KEY (dagID) REFERENCES Dagen (id),
	CONSTRAINT FK_Les_Vak FOREIGN KEY (vakID) REFERENCES Vakken (id)
);

--Inserts
-- Dagen
INSERT INTO Dagen (naam) VALUES ('Maandag'), ('Dinsdag'), ('Woensdag'), ('Donderdag'), ('Vrijdag');
-- Lesblokken
INSERT INTO Lesblokken (starttijd, eindtijd) VALUES
	('08:20:00', '09:10:00'),
	('09:10:00', '10:00:00'),
	('10:20:00', '11:10:00'),
	('11:10:00', '12:00:00'),
	('12:50:00', '13:40:00'),
	('13:40:00', '14:30:00'),
	('14:40:00', '15:30:00'),
	('15:30:00', '16:20:00');

-- Iterative function:
-- Zet string van ints om naar een table
-- Nodig wegens geen DataTables
-- Zie: http://www.sommarskog.se/arrays-in-sql-2005.html#iterative
CREATE FUNCTION iter_intlist_to_tbl (@list nvarchar(MAX))
   RETURNS @tbl TABLE (listpos int IDENTITY(1, 1) NOT NULL,
                       number  int NOT NULL) AS
BEGIN
   DECLARE @startpos int,
           @endpos   int,
           @textpos  int,
           @chunklen smallint,
           @str      nvarchar(4000),
           @tmpstr   nvarchar(4000),
           @leftover nvarchar(4000)

   SET @textpos = 1
   SET @leftover = ''
   WHILE @textpos <= datalength(@list) / 2
   BEGIN
      SET @chunklen = 4000 - datalength(@leftover) / 2
      SET @tmpstr = ltrim(@leftover +
                    substring(@list, @textpos, @chunklen))
      SET @textpos = @textpos + @chunklen

      SET @startpos = 0
      SET @endpos = charindex(' ' COLLATE Slovenian_BIN2, @tmpstr)

      WHILE @endpos > 0
      BEGIN
         SET @str = substring(@tmpstr, @startpos + 1,
                              @endpos - @startpos - 1)
         IF @str <> ''
            INSERT @tbl (number) VALUES(convert(int, @str))
         SET @startpos = @endpos
         SET @endpos = charindex(' ' COLLATE Slovenian_BIN2,
                                 @tmpstr, @startpos + 1)
      END

      SET @leftover = right(@tmpstr, datalength(@tmpstr) / 2 - @startpos)
   END

   IF ltrim(rtrim(@leftover)) <> ''
      INSERT @tbl (number) VALUES(convert(int, @leftover))

   RETURN
END

-- SP om een leerkracht te updaten
-- Momenteel enkel nog met vakken
CREATE PROCEDURE spUpdateLeerkracht(
	@leerkrachtID INT,
	@naam VARCHAR(255),
	@voornaam VARCHAR(255),
	@vakken VARCHAR(255)
) AS
BEGIN
	BEGIN TRANSACTION UpdateLeerkracht;

	UPDATE Leerkrachten SET naam = @naam, voornaam = @voornaam WHERE id = @leerkrachtID;

	IF OBJECT_ID('tempdb.dbo.#LeerkrachtVakken', 'U') IS NOT NULL DROP TABLE #LeerkrachtVakken;
	
	CREATE TABLE #LeerkrachtVakken(
		leerkrachtID INT,
		vakID INT
	);

	INSERT INTO #LeerkrachtVakken (leerkrachtID, vakID)
		(SELECT @leerkrachtID, i.number FROM iter_intlist_to_tbl(@vakken) i);

	MERGE INTO LeerkrachtVakken AS TARGET
		USING #LeerkrachtVakken AS SOURCE
			ON SOURCE.leerkrachtID = TARGET.leerkrachtID
			AND SOURCE.vakID = TARGET.vakID
		WHEN NOT MATCHED BY TARGET AND SOURCE.leerkrachtID = @leerkrachtID THEN
			INSERT (leerkrachtID, vakID)
				VALUES (leerkrachtID, vakID)
		WHEN NOT MATCHED BY SOURCE AND TARGET.leerkrachtID = @leerkrachtID THEN
			DELETE;

	COMMIT TRANSACTION UpdateLeerkacht;
END

	@jaar SMALLINT,
	@lesblokID INT,
	@dagID INT,
	@leerkrachtID INT,
	@lokaalID INT,
	@klasID INT,
	@vakID INT
) AS
BEGIN
	BEGIN TRANSACTION UpsertLes;

	MERGE INTO dbo.Lessen AS TARGET
		USING (SELECT @jaar, @lesblokID, @dagID, @leerkrachtID, @lokaalID, @klasID, @vakID)
			AS SOURCE(jaar, lesblokID, dagID, leerkrachtID, lokaalID, klasID, vakID)
		ON SOURCE.klasID = TARGET.klasID
		AND SOURCE.lesblokID = TARGET.lesblokID
		AND SOURCE.dagID = TARGET.dagID
		AND SOURCE.jaar = TARGET.jaar
	WHEN MATCHED THEN 
		UPDATE SET leerkrachtID=@leerkrachtID, lokaalID=@lokaalID, vakID=@vakID
	WHEN NOT MATCHED THEN
		INSERT(jaar, lesblokID, dagID, leerkrachtID, lokaalID, klasID, vakID)
		VALUES(@jaar, @lesblokID, @dagID, @leerkrachtID, @lokaalID, @klasID, @vakID)
	;

	COMMIT TRANSACTION UpsertLes;
END