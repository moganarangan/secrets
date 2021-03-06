import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private _db: Promise<SQLiteObject>;

/* tslint:disable */ 
  private tables: Array<string> = ['CREATE TABLE IF NOT EXISTS USER (USER_ID TEXT PRIMARY KEY UNIQUE, NAME TEXT NOT NULL, PIN INTEGER NOT NULL, DATECREATED TEXT NOT NULL, DATELASTMODIFIED TEXT NOT NULL)',
  'CREATE TABLE IF NOT EXISTS PIN_HISTORY (PIN_HISTORY_ID TEXT PRIMARY KEY UNIQUE, USER_ID TEXT NOT NULL, PIN INTEGER NOT NULL, DATECREATED TEXT NOT NULL, FOREIGN KEY (USER_ID) REFERENCES USER (USER_ID) ON DELETE CASCADE ON UPDATE NO ACTION)',
  'CREATE TABLE IF NOT EXISTS SECRET_TYPE (SECRET_TYPE_ID TEXT PRIMARY KEY UNIQUE, NAME TEXT NOT NULL)',
  'CREATE TABLE IF NOT EXISTS BASE_FIELD (BASE_FIELD_ID TEXT PRIMARY KEY UNIQUE, SECRET_TYPE_ID TEXT NOT NULL, FIELDNAME TEXT NOT NULL, FIELDTYPE TEXT NOT NULL, MANDATORY INTEGER NOT NULL, FOREIGN KEY (SECRET_TYPE_ID) REFERENCES SECRET_TYPE (SECRET_TYPE_ID) ON DELETE CASCADE ON UPDATE NO ACTION)',
  'CREATE TABLE IF NOT EXISTS SECRET_ITEM (SECRET_ITEM_ID TEXT PRIMARY KEY UNIQUE, SECRET_TYPE_ID TEXT NOT NULL, SECRET_TYPE_NAME TEXT NOT NULL, NAME TEXT NOT NULL, DATECREATED TEXT NOT NULL, DATELASTMODIFIED TEXT NOT NULL, MAGICTEXT INTEGER NOT NULL, AWESOMETEXT INTEGER NOT NULL)',
  'CREATE TABLE IF NOT EXISTS SECRET_ITEM_FIELD (SECRET_ITEM_FIELD_ID TEXT PRIMARY KEY UNIQUE, SECRET_ITEM_ID TEXT NOT NULL, FIELDNAME TEXT NOT NULL, FIELDTYPE TEXT NOT NULL, MANDATORY INTEGER NOT NULL, FOREIGN KEY (SECRET_ITEM_ID) REFERENCES SECRET_ITEM (SECRET_ITEM_ID) ON DELETE CASCADE ON UPDATE NO ACTION)',
  'CREATE TABLE IF NOT EXISTS SECRET_ITEM_VALUE (SECRET_ITEM_VALUE_ID TEXT PRIMARY KEY UNIQUE, SECRET_ITEM_FIELD_ID TEXT NOT NULL, VALUE TEXT NOT NULL, FOREIGN KEY (SECRET_ITEM_FIELD_ID) REFERENCES SECRET_ITEM_FIELD (SECRET_ITEM_FIELD_ID) ON DELETE CASCADE ON UPDATE NO ACTION)',
  'CREATE TABLE IF NOT EXISTS SECRET_DB_INFO (DBNAME TEXT NOT NULL PRIMARY KEY, DATECREATED TEXT NOT NULL, ISRESTORED INTEGER NOT NULL, BACKUP_DATE TEXT, BACKUP_PATH TEXT)'];

  private typesAndFields: Array<string> = ['INSERT OR IGNORE INTO SECRET_TYPE (SECRET_TYPE_ID, NAME) VALUES (\'9274621917724252\', \'Mail\')',
'INSERT OR IGNORE INTO SECRET_TYPE (SECRET_TYPE_ID, NAME) VALUES (\'5805753303117526\', \'Card\')',
'INSERT OR IGNORE INTO SECRET_TYPE (SECRET_TYPE_ID, NAME) VALUES (\'7222123747154090\', \'Online Login\')',
'INSERT OR IGNORE INTO SECRET_TYPE (SECRET_TYPE_ID, NAME) VALUES (\'2359572960908854\', \'Other\')',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'6725050661348698\', \'9274621917724252\', \'User Name\', \'TEXT\', 1)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'8991069925089329\', \'9274621917724252\', \'Password\', \'SECRET\', 1)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'9627579883727336\', \'5805753303117526\', \'Card Number\', \'NUMBER\', 1)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'8384638577141332\', \'5805753303117526\', \'Name On Card\', \'TEXT\', 1)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'3962646931474612\', \'5805753303117526\', \'Expiry Month\', \'NUMBER\', 1)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'2737186604060764\', \'5805753303117526\', \'Expiry Year\', \'NUMBER\', 1)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'1882297552723341\', \'5805753303117526\', \'CVV\', \'NUMBER\', 0)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'2567407786291122\', \'5805753303117526\', \'Pin\', \'NUMBER\', 0)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'1367971449997588\', \'5805753303117526\', \'User Name\', \'TEXT\', 0)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'7745309995125159\', \'5805753303117526\', \'Password\', \'SECRET\', 0)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'7435074340381030\', \'5805753303117526\', \'Customer Id\', \'TEXT\', 0)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'2452024719875230\', \'5805753303117526\', \'Transaction Pin\', \'TEXT\', 0)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'7335002361861903\', \'5805753303117526\', \'Profile Pin\', \'TEXT\', 0)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'2856851096787667\', \'5805753303117526\', \'3D Pin\', \'NUMBER\', 0)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'9761651907443790\', \'7222123747154090\', \'User Name\', \'TEXT\', 1)',
'INSERT OR IGNORE INTO BASE_FIELD (BASE_FIELD_ID, SECRET_TYPE_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES (\'7349359727962826\', \'7222123747154090\', \'Password\', \'SECRET\', 1)'];
/* tslint:enable */

  constructor(private sqlite: SQLite) {
    this._db = this.sqlite.create({
      name: 'secrets.db',
      location: 'default'
    });
   }

  createInitialDatabaseSchema = (callback: Function) => {
    this._db.then((db: SQLiteObject) => {
        db.sqlBatch(this.tables)
        .then((res) => {
          db.sqlBatch(this.typesAndFields)
          .then(response => {
            callback(); }
            )
          .catch((er) => {
            console.log(er);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUser = (): Promise<any> => {
    const query = 'SELECT USER_ID, NAME, PIN FROM USER';
    return this.executeQuery(query, []);
  }

  insertUser = (user: any): Promise<any> => {
    const query = 'INSERT INTO USER VALUES(?, ?, ?, ?, ?)';

    return new Promise ((resolve, reject) => {
      this._db.then((db: SQLiteObject) => {
        db.executeSql(query, [user.id, user.name, user.pin, user.dateCreated, user.dateLastModified])
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
      });
    });
  }

  getAllSecretTypes = (): Promise<any> => {
    const query = 'SELECT * FROM SECRET_TYPE';
    return this.executeQuery(query, []);
  }

  getBaseFieldsByType = (typeId: string): Promise<any> => {
    const query = 'SELECT * FROM BASE_FIELD WHERE SECRET_TYPE_ID = ' + typeId;
    return this.executeQuery(query, []);
  }

  executeQuery = (query: string, params: Array<any>): Promise<any> => {
    return new Promise ((resolve, reject) => {
      this._db.then((db: SQLiteObject) => {
        db.executeSql(query, params)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
      });
    });
  }

  executeBatch = (staments: Array<string>): Promise<any> => {
    return new Promise ((resolve, reject) => {
      this._db.then((db: SQLiteObject) => {
        db.sqlBatch(staments)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      });
    });
  }

}
