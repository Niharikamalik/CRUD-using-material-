import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { CoreService } from '../core/core.service';
import { EmpDetails } from '../interface/empdetails';

@Component({
  selector: 'app-emp-table',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.css'],
})
export class EmpTableComponent implements OnInit {
  displayedColumns: string[] = [
    'S.No.',
    'firstName',
    'lastName',
    'email',
    'joiningDate',
    'gender',
    'education',
    'technology',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<EmpDetails>;
  isLoading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    console.log(this.dataSource)
    this.getEmployeeList();
  }

  // open add employee form dialog
  openForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  // get employee list
  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (data: EmpDetails[]) => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  //  table filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // delete employee details

  deleteEmploye(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Details deleted successfully', 'Ok');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  //  edit employee details
  openEditForm(data: any) {
    console.log(data);
    this._dialog
      .open(EmpAddEditComponent, {
        data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getEmployeeList();
      });
  }
}
