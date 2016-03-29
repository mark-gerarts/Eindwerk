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
	lokaalnaamID INT,
	campusID INT,
	CONSTRAINT FK_naam_lokalen FOREIGN KEY (lokaalnaamID) REFERENCES Lokaalnamen (id),
	CONSTRAINT FK_campus_lokalen FOREIGN KEY (campusID) REFERENCES Campussen (id),
);
--// DB create

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

-- SP om een leerkracht te update
-- Momenteel enkel nog met vakken
Create PROCEDURE spUpdateLeerkracht(
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
		WHEN NOT MATCHED BY TARGET AND SOURCE.leerkrachtID = 1 THEN
			INSERT (leerkrachtID, vakID)
				VALUES (leerkrachtID, vakID)
		WHEN NOT MATCHED BY SOURCE AND TARGET.leerkrachtID = 1 THEN
			DELETE;

	COMMIT TRANSACTION UpdateLeerkacht;
END