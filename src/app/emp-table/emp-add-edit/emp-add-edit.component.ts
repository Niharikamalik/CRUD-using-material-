import { Education } from '../../interface/education';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { Technology } from '../../interface/technology';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { EmpDetails } from 'src/app/interface/empdetails';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  // select education options
  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      joiningDate: '',
      gender: '',
      education: '',
      technology: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.data);
    this.empForm.patchValue(this.data);
  }
  education: Education[] = [
    { value: 'matric', viewValue: 'Matric' },
    { value: 'diploma', viewValue: 'Diploma' },
    { value: 'under-graduate', viewValue: 'Under Graduate' },
    { value: 'post-graduate', viewValue: 'PostGraduate' },
    { value: 'other', viewValue: 'Other' },
  ];

  //  select techonolgy options

  technology: Technology[] = [
    { value: 'web-development', viewValue: 'Web Development' },
    { value: 'machine-learning', viewValue: 'Machine Learning' },
    { value: 'data-analysis', viewValue: 'Data Analysis' },
    { value: 'android', viewValue: 'Android' },
    { value: 'other', viewValue: 'Other' },
  ];

  onFromSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .UpdateEmpDetails(this.data.id, this.empForm.value)
          .subscribe({
            next: () => {
              this._coreService.openSnackBar(
                'Details edit successfully!',
                'Ok'
              );
              this._dialogRef.close(true);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: () => {
            this._coreService.openSnackBar(
              'form submitted successfully!',
              'Ok'
            );
            this._dialogRef.close(true);
          },
        });
      }
    }
  }

  onCancel() {
    this._dialogRef.close();
  }
}
