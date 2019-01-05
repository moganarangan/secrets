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
          this.loadBaseFields(result.rows.item(i)['SECRET_TYPE_ID']);
        }
      }
    }
  }

  loadBaseFields = (typeId: string) => {
    this.stService.getBaseFieldsByType(typeId, this.baseFieldsLoaded, null);
  }

  baseFieldsLoaded = (result: any) => {
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
    this.form = this.createGroup();
  }

  createGroup = () => {
    const group = this.fb.group({});

    this.fields.forEach(control =>
      group.addControl(control.fieldName,
        new FormControl('', [control.isRequired === 1 ? Validators.required : null])));
    return group;
  }

  saveAndClose = () => {
   if (this.form.valid) {
    const now = moment.utc().format();
 }
 this.navCtrl.navigateRoot(['/home']);
}
}
