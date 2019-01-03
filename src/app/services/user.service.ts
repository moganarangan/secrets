import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dbService: DatabaseService) {
  }

  getUser = (): Observable<any> => {
    return this.dbService.getUser();
  }

  saveUser = (user: any): Observable<any> => {
    return this.dbService.insertUser(user);
  }

}
