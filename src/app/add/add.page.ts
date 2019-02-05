import { SecretTypesService } from './../services/secret-types.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  public form: FormGroup;
  public types: Array<any> = [];
  public fields: Array<any> = [];
  public canShowFields: Boolean = false;

  constructor(private navCtrl: NavController, private stService: SecretTypesService , private fb: FormBuilder) { }

  ngOnInit() {
    this.loadTypes();
  }

  loadTypes = () => {
    this.stService.getAllSecretTypes(this.typesLoaded, null);
  }

  typesLoaded = (result: any) => {
    if (result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        this.types.push({
          secretTypeId: result.rows.item(i)['SECRET_TYPE_ID'],
          typeName: result.rows.item(i)['NAME'] });
        if (i === 0 ) {
          this.loadBaseFields(result.rows.item(i)['SECRET_TYPE_ID'], this.baseFieldsLoaded);
        }
      }
    }
  }

  loadBaseFields = (typeId: string, next: Function) => {
    this.stService.getBaseFieldsByType(typeId, next, null);
  }

  baseFieldsLoaded = (result: any) => {
    if (result.rows.length > 0) {
      this.addFields(result);
    }

    this.createGroup();
    this.canShowFields = true;
  }

  createGroup = () => {
    const formGroup = this.fb.group({});

    formGroup.addControl('secretName', new FormControl('', [Validators.required]));
    formGroup.addControl('secretType', new FormControl('', [Validators.required]));

    this.form = formGroup;
    this.loadFieldsToFormGroup();
  }

  typeChanged = (typeId: string) => {
    this.canShowFields = false;
    this.loadBaseFields(typeId, this.typeChangedLoaded);
  }

  typeChangedLoaded = (result: any) => {
    this.fields.forEach(field => this.form.removeControl(field.fieldName));
    this.fields.length = 0;

    if (result.rows.length > 0) {
    this.addFields(result);
    this.loadFieldsToFormGroup();
    this.canShowFields = true;
    }
  }

  loadFieldsToFormGroup = () => {
        this.fields.forEach((control) => {
          if (control.mandatory) {
            this.form.addControl(control.fieldName, new FormControl('', [Validators.required]));
          } else {
            this.form.addControl(control.fieldName, new FormControl(''));
          }
        });
  }

  addFields = (result: any) => {
    if (result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        this.fields.push({
          fieldId: result.rows.item(i)['BASE_FIELD_ID'],
          fieldName: result.rows.item(i)['FIELDNAME'],
          fieldType: result.rows.item(i)['FIELDTYPE'] === 'SECRET' ? 'NUMBER' : result.rows.item(i)['FIELDTYPE'].toLowerCase(),
          isRequired: result.rows.item(i)['MANDATORY']
      });
      }
    }
  }

  isFormValid = () => {
    return this.form.valid;
  }

  saveAndClose = () => {
   if (this.form.valid) {
     this.stService.addSecret(this.CreatePostModel(), this.addSuccess, null);
    }
  }

  addSuccess = () => {
    this.navCtrl.navigateRoot(['/home']);
  }

  CreatePostModel = (): Object => {
    const saveModel = new Object;
    const secretItemId = this.getRandomId();
    const now = moment.utc().format();

    saveModel['SECRET_ITEM'] = this.CreateSecretItem(secretItemId, now);

    const secretFieldValue = this.CreateSecretItemFieldValue(secretItemId);

    saveModel['SECRET_ITEM_FIELD'] = secretFieldValue['SECRET_ITEM_FIELD'];
    saveModel['SECRET_ITEM_VALUE'] = secretFieldValue['SECRET_ITEM_VALUE'];

    return saveModel;
  }

  CreateSecretItem = (secretItemId: String, date: String) => {
    const SECRET_ITEM = {
      'SECRET_ITEM_ID': secretItemId,
      'SECRET_TYPE_ID': this.form.value.secretType,
      'SECRET_TYPE_NAME': this.types[this.form.value.secretType]['typeName'],
      'NAME': this.form.value.secretName,
      'DATECREATED': date,
      'DATELASTMODIFIED': date,
      'MAGICTEXT': 'some_MAGICTEXT',
      'AWESOMETEXT': 'some_AWESOMETEXT'
    };

    return SECRET_ITEM;
  }

  CreateSecretItemFieldValue = (secretItemId: String) => {
    const SECRET_ITEM_FIELD = new Array<any>();
    const SECRET_ITEM_VALUE = new Array<any>();

    this.fields.forEach(field => {
      const secretItemFieldId = this.getRandomId();

      const itemField = {
        'SECRET_ITEM_FIELD_ID': secretItemFieldId,
        'SECRET_ITEM_ID': secretItemId,
        'FIELDNAME': field.fieldName,
        'FIELDTYPE': field.fieldType,
        'MANDATORY': field.isRequired
      };

      SECRET_ITEM_FIELD.push(itemField);

      const itemValue = {
        'SECRET_ITEM_VALUE_ID': this.getRandomId(),
        'SECRET_ITEM_FIELD_ID': secretItemFieldId,
        'VALUE': this.form.value[field.fieldName]
      };

      SECRET_ITEM_VALUE.push(itemValue);
    });

    const result = new Object;
    result['SECRET_ITEM_FIELD'] = SECRET_ITEM_FIELD;
    result['SECRET_ITEM_VALUE'] = SECRET_ITEM_VALUE;

    return result;
  }

  getRandomId = () => {
    return Math.random().toString(36).replace('0.', '');
  }

}
