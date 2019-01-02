import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  createInitialDatabaseSchema = () => {
    this.sqlite.create({
      name: 'secrets.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
        db.sqlBatch(['adsa'])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

}
