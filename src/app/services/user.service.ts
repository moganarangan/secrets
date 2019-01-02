import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  saveUser = (user: object) => {
    // return this.storage.set(USER_STORAGE_KEY, user);
  }

  getUser = () => {
    // return this.storage.get(USER_STORAGE_KEY);
  }

}
