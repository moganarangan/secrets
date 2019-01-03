import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dbService: DatabaseService) {
  }

  IsUserExist = (): boolean => {
    const data = this.dbService.getUser();
    if (data.rows.length > 0) {
      return true;
    }

     return false;
  }

  checkPin = (pin: number): boolean => {
    const data = this.dbService.getUser();

    if (data.rows.item(0).PIN === pin) {
      return true;
    }

    return false;
  }

}
