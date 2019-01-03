import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dbService: DatabaseService) {
  }

  getUser = (sucessCallback: Function, failureCallback: Function) => {
    this.dbService.getUser().then((response) => {
      if (sucessCallback) {
      sucessCallback(response);
      }
    }, (error) => {
      if (failureCallback) {
        failureCallback(error);
        }
    });
  }

  saveUser = (user: any, sucessCallback: Function, failureCallback: Function) => {
    this.dbService.insertUser(user).then((response) => {
      if (sucessCallback) {
      sucessCallback(response);
      }
    }, (error) => {
      if (failureCallback) {
        failureCallback(error);
        }
    });
  }

}
