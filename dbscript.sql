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
CREATE TABLE Events(
	id INT IDENTITY PRIMARY KEY,
	naam VARCHAR(255),
	omschrijving VARCHAR(MAX),
	startTijdstip DATETIME,
	eindTijdstip DATETIME,
);
CREATE TABLE EventsKlassen(
	eventID INT,
	klasID INT,
	CONSTRAINT PK_EventsKlassen PRIMARY KEY(eventID, klasID),
	CONSTRAINT FK_EK_event FOREIGN KEY (eventID) REFERENCES Events (id),
	CONSTRAINT FK_EK_klas FOREIGN KEY (klasID) REFERENCES Klassen (id)
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

CREATE PROCEDURE spInsertLeerkracht(
	@naam VARCHAR(255),
	@voornaam VARCHAR(255),
	@vakken VARCHAR(255),
	@leerkrachtID INT OUTPUT
) AS
BEGIN
	BEGIN TRANSACTION InsertLeerkracht;
	
	--Insert van de leerkracht met output van identity
	INSERT INTO Leerkrachten  (naam, voornaam)
	VALUES (@naam, @voornaam)
	SET @leerkrachtID = SCOPE_IDENTITY();

	-- Insert van de vakken
	INSERT INTO LeerkrachtVakken (leerkrachtID, vakID)
		(SELECT @leerkrachtID, i.number FROM iter_intlist_to_tbl(@vakken) i);

	COMMIT TRANSACTION InsertLeerkacht;
END

CREATE PROCEDURE spUpsertLes(
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
	OUTPUT Inserted.id
	;

	COMMIT TRANSACTION UpsertLes;
END


CREATE PROCEDURE spGetDuplicates(	
	@jaar SMALLINT,
	@lesblokID INT,
	@dagID INT,
	@leerkrachtID INT,
	@lokaalID INT,
	@klasID INT,
	@id INT = NULL
) AS
BEGIN	
	DECLARE @starttijd TIME;
	DECLARE @eindtijd TIME;

	SELECT @starttijd = starttijd, @eindtijd = eindtijd 
	FROM Lesblokken 
	WHERE id = @lesblokID;
	
	IF(@id IS NULL)
	BEGIN
		SELECT l.id, l.jaar,
               lb.id, lb.starttijd, lb.eindtijd,
               dag.id, dag.naam,
               lrk.id, lrk.naam, lrk.voornaam,
			   kl.id, kl.naam,
               v.id, v.naam,
               lok.id, lok.naam,
               c.id, c.naam
		FROM 
			Lessen l 
			JOIN Lesblokken lb ON l.lesblokID = lb.id
			JOIN Dagen dag ON l.dagID = dag.id
            JOIN Leerkrachten lrk ON l.leerkrachtID = lrk.id
			JOIN Klassen kl ON l.klasID = kl.id
            JOIN Vakken v ON l.vakID = v.id
            JOIN Lokalen lok ON l.lokaalID = lok.id
            JOIN Campussen c ON lok.campusID = c.id
		WHERE 
			l.jaar=@jaar AND l.dagID=@dagID -- Zelfde dag
			AND ((lb.starttijd >= @starttijd AND lb.starttijd <= @eindtijd) -- In dezelfde tijdspanne
				OR (lb.eindtijd >= @starttijd AND lb.eindtijd <= @eindtijd))
			AND (l.lokaalID=@lokaalID OR l.leerkrachtID=@leerkrachtID) -- Met dezelfde leerkracht OF lokaal
			;
	END
	ELSE
	BEGIN
		SELECT l.id, l.jaar,
               lb.id, lb.starttijd, lb.eindtijd,
               dag.id, dag.naam,
               lrk.id, lrk.naam, lrk.voornaam,
			   kl.id, kl.naam,
               v.id, v.naam,
               lok.id, lok.naam,
               c.id, c.naam
		FROM 
			Lessen l 
			JOIN Lesblokken lb ON l.lesblokID = lb.id
			JOIN Dagen dag ON l.dagID = dag.id
            JOIN Leerkrachten lrk ON l.leerkrachtID = lrk.id
			JOIN Klassen kl ON l.klasID = kl.id
            JOIN Vakken v ON l.vakID = v.id
            JOIN Lokalen lok ON l.lokaalID = lok.id
            JOIN Campussen c ON lok.campusID = c.id
		WHERE 
			l.jaar=@jaar AND l.dagID=@dagID -- Zelfde dag
			AND ((lb.starttijd >= @starttijd AND lb.starttijd < @eindtijd) -- In dezelfde tijdspanne
				OR (lb.eindtijd > @starttijd AND lb.eindtijd <= @eindtijd))
			AND (l.lokaalID=@lokaalID OR l.leerkrachtID=@leerkrachtID) -- Met dezelfde leerkracht OF lokaal
			AND l.id<>@id
	END
END


CREATE PROCEDURE spInsertEvent(
	@naam VARCHAR(255),
	@omschrijving VARCHAR(MAX),
	@startTijdstip DATETIME,
	@eindTijdstip DATETIME,
	@klasIDs VARCHAR(MAX),
	@eventID INT OUTPUT
) AS
BEGIN
	BEGIN TRANSACTION InsertEvent;
	
	--Insert van het event met output van identity
	INSERT INTO Events  (naam, omschrijving, startTijdstip, eindTijdstip)
	VALUES (@naam, @omschrijving, @startTijdstip, @eindTijdstip)
	SET @eventID = SCOPE_IDENTITY();

	-- Insert van de vakken
	INSERT INTO EventsKlassen(eventID, klasID)
		(SELECT @eventID, i.number FROM iter_intlist_to_tbl(@klasIDs) i);

	COMMIT TRANSACTION InsertEvent;
END

ALTER PROCEDURE spUpdateEvent(
	@naam VARCHAR(255),
	@omschrijving VARCHAR(MAX),
	@startTijdstip DATETIME,
	@eindTijdstip DATETIME,
	@klasIDs VARCHAR(MAX),
	@eventID INT
) AS
BEGIN
	BEGIN TRANSACTION UpdateEvent

	UPDATE Events SET naam = @naam, omschrijving = @omschrijving WHERE id = @eventID;

	IF OBJECT_ID('tempdb.dbo.#EventsKlassen', 'U') IS NOT NULL DROP TABLE #EventsKlassen;
	
	CREATE TABLE #EventsKlassen(
		klasID INT,
		eventID INT
	);

	INSERT INTO #EventsKlassen (eventID, klasID)
		(SELECT @eventID, i.number FROM iter_intlist_to_tbl(@klasIDs) i);

	MERGE INTO EventsKlassen AS TARGET
		USING #EventsKlassen AS SOURCE
			ON SOURCE.eventID = TARGET.eventID
			AND SOURCE.klasID = TARGET.klasID
		WHEN NOT MATCHED BY TARGET AND SOURCE.eventID = @eventID THEN
			INSERT (eventID, klasID)
				VALUES (eventID, klasID)
		WHEN NOT MATCHED BY SOURCE AND TARGET.eventID = @eventID THEN
			DELETE;

	COMMIT TRANSACTION UpdateEvent
END