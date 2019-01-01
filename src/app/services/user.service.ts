import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const USER_STORAGE_KEY = 'USER';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: Storage) {
  }

  saveUser = (user: object) => {
    return this.storage.set(USER_STORAGE_KEY, user);
  }

  getUser = () => {
    return this.storage.get(USER_STORAGE_KEY);
  }

}
