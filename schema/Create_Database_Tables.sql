-- 001: USER TABLE
CREATE TABLE [IF NOT EXISTS] USER (USER_ID INTEGER PRIMARY KEY UNIQUE, NAME TEXT NOT NULL, PIN INTEGER NOT NULL, DATECREATED TEXT NOT NULL, DATELASTMODIFIED TEXT NOT NULL);

-- 002: PASSCODE HISTORY TABLE
CREATE TABLE [IF NOT EXISTS] PIN_HISTORY (PIN_HISTORY_ID INTEGER PRIMARY KEY UNIQUE, USER_ID TEXT NOT NULL, PIN INTEGER NOT NULL, DATECREATED TEXT NOT NULL, FOREIGN KEY (USER_ID) REFERENCES USER (USER_ID) ON DELETE CASCADE ON UPDATE NO ACTION);

-- 003: SECRET TYPES
CREATE TABLE [IF NOT EXISTS] SECRET_TYPE (SECRET_TYPE_ID INTEGER PRIMARY KEY UNIQUE, NAME TEXT NOT NULL);

-- 004: SECRET TYPES BASIC FIELDS
CREATE TABLE [IF NOT EXISTS] BASE_FIELD (BASE_FIELD_ID INTEGER PRIMARY KEY UNIQUE, SECRET_TYPE_ID INTEGER NOT NULL, FIELDNAME TEXT NOT NULL, FIELDTYPE TEXT NOT NULL, FOREIGN KEY (SECRET_TYPE_ID) REFERENCES SECRET_TYPE (SECRET_TYPE_ID) ON DELETE CASCADE ON UPDATE NO ACTION);

-- 005: SECRET ITEMS
CREATE TABLE [IF NOT EXISTS] SECRET_ITEM (SECRET_ITEM_ID INTEGER PRIMARY KEY UNIQUE, SECRET_TYPE_ID INTEGER NOT NULL, SECRET_TYPE_NAME TEXT NOT NULL, NAME TEXT NOT NULL, DATECREATED TEXT NOT NULL, DATELASTMODIFIED TEXT NOT NULL);
											
-- 006: SECRET ITEM FIELDS
CREATE TABLE [IF NOT EXISTS] SECRET_ITEM_FIELD (SECRET_ITEM_FIELD_ID INTEGER PRIMARY KEY UNIQUE, SECRET_ITEM_ID INTEGER NOT NULL, FIELDNAME TEXT NOT NULL, FIELDTYPE TEXT NOT NULL, FOREIGN KEY (SECRET_ITEM_ID) REFERENCES SECRET_ITEM (SECRET_ITEM_ID) ON DELETE CASCADE ON UPDATE NO ACTION);
													
-- 007: SECRET ITEM VALUES
CREATE TABLE [IF NOT EXISTS] SECRET_ITEM_VALUE (SECRET_ITEM_VALUE_ID INTEGER PRIMARY KEY UNIQUE, SECRET_ITEM_FIELD_ID INTEGER NOT NULL, VALUE TEXT NOT NULL, FOREIGN KEY (SECRET_ITEM_FIELD_ID) REFERENCES SECRET_ITEM_FIELD (SECRET_ITEM_FIELD_ID) ON DELETE CASCADE ON UPDATE NO ACTION);

-- 008: SECRET DATABASE INFORMATION
CREATE TABLE [IF NOT EXISTS] SECRET_DB_INFO (DBNAME TEXT NOT NULL DEFAULT 'secrets.db' PRIMARY KEY UNIQUE, DATECREATED TEXT NOT NULL, ISRESTORED INTEGER NOT NULL, BACKUP_DATE TEXT, BACKUP_PATH TEXT);