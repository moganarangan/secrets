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
    const now = moment.utc().format();
    // this.navCtrl.navigateRoot(['/home']);

    console.log(this.form.value);
  }

  }
}
