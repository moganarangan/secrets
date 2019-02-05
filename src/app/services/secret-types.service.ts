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

  addSecret = (saveModel: Object, sucessCallback: Function, failureCallback: Function) => {
    const secret = saveModel['SECRET_ITEM'];
    const secretFields = saveModel['SECRET_ITEM_FIELD'];
    const secretFieldValues = saveModel['SECRET_ITEM_VALUE'];

    const secretQuery = `INSERT INTO SECRET_ITEM VALUES('${secret['SECRET_ITEM_ID']}', '${secret['SECRET_TYPE_ID']}', '${secret['SECRET_TYPE_NAME']}', '${secret['NAME']}', '${secret['DATECREATED']}', '${secret['DATELASTMODIFIED']}', '${secret['MAGICTEXT']}', '${secret['AWESOMETEXT']}')`;
    const secretFiedlsQuery = 'INSERT INTO SECRET_ITEM_FIELD (SECRET_ITEM_FIELD_ID, SECRET_ITEM_ID, FIELDNAME, FIELDTYPE, MANDATORY) VALUES(?, ?, ?, ?, ?)';
    const secretFiedlValuesQuery = 'INSERT INTO SECRET_ITEM_VALUE (SECRET_ITEM_VALUE_ID, SECRET_ITEM_FIELD_ID, VALUE) VALUES(?, ?, ?)';

    this.dbService.executeQuery(secretQuery, []).then((response1) => {
      this.dbService.executeQuery(secretFiedlsQuery, secretFields).then((response2) => {
        this.dbService.executeQuery(secretFiedlValuesQuery, secretFieldValues).then((response3) => {
          if (sucessCallback) {
            sucessCallback(response3);
            }
        });
      });
    });
  }
}
