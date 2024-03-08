import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EmpDetails } from '../interface/empdetails';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  //  add employee
  addEmployee(data: EmpDetails) {
    return this._http.post('https://employee-67470-default-rtdb.firebaseio.com/details.json', data);
  }
  // get employee details
  getEmployeeList(){
    // return this._http.get('http://localhost:3000/employees');
    return this._http
      .get<{ [key: string]: EmpDetails }>(
        'https://employee-67470-default-rtdb.firebaseio.com/details.json'
      )
      .pipe(
        map((response) => {
          let task = [];
          // convert response object into array
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              task.push({ ...response[key], id: key });
            }
          }
          return task;
        })
      );
  }

  // delete employee
  deleteEmployee(id: number) {
    return this._http.delete(
      `https://employee-67470-default-rtdb.firebaseio.com/details/${id}.json`
    );
  }

  // update record
  UpdateEmpDetails(id : number,data : any): Observable<any> {
    return this._http.put(
      `https://employee-67470-default-rtdb.firebaseio.com/details/${id}.json`,
      data
    );
  }
}
