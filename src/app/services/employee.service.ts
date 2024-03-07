import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  //  add employee
  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }
  // get employee details
  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }

  // delete employee
  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }

  // update record
  UpdateEmpDetails(id : number,data : any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }
}
