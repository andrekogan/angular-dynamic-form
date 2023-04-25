import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  filterForm: FormGroup;
  filterFields: any[];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterFields = getRealFakeData();
    this.filterForm = this.generateFilterForm();
  }

  generateFilterForm(): FormGroup {
    const baseForm = this.fb.group({});
    this.filterFields.forEach((field) => {
      baseForm.addControl(field.key, this.generateFormGroup(baseForm, field));
    });
    return baseForm;
  }

  generateFormGroup(
    baseForm: FormGroup,
    field: { group: any[] }
  ): FormGroup | FormControl {
    if (field.group) {
      const formGroup = this.fb.group({});
      field.group.forEach((item) => {
        formGroup.addControl(item.key, this.generateFormGroup(formGroup, item));
      });
      return formGroup;
    }

    return new FormControl('');
  }
}
