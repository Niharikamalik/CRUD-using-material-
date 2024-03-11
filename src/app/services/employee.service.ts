import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, enableProdMode } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { EmpDetails } from '../interface/empdetails';
import { identifierName } from '@angular/compiler';

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
  // filter BY Name
  getfilter(dataInput: string) {
    // const firstName = new HttpParams().set('user ', data);
    return this._http
      .get('https://employee-67470-default-rtdb.firebaseio.com/details.json')
      .pipe(
        map((response) => {
          let task = [];
          // convert response object into array
          for (let key in response) {
            if (response.hasOwnProperty(key)&& response[key].experience == dataInput) {
              task.push({ ...response[key], id: key });
            }
          }
          return task;
        }),
      );
  }
}
