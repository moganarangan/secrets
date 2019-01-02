import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dbService: DatabaseService) {
  }

  IsUserExist = (): boolean => {
    return this.dbService.CheckUserExist();
  }

}
