import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class SecretTypesService {

  constructor(private dbService: DatabaseService) {
  }

  getAllSecretTypes = (sucessCallback: Function, failureCallback: Function) => {
    this.dbService.getAllSecretTypes().then((response) => {
      if (sucessCallback) {
      sucessCallback(response);
      }
    }, (error) => {
      if (failureCallback) {
        failureCallback(error);
        }
    });
  }

  getBaseFieldsByType = (typeId: string, sucessCallback: Function, failureCallback: Function) => {
    this.dbService.getBaseFieldsByType(typeId).then((response) => {
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
