import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DistancesService {

  constructor(private _http: HttpClient) { }

  getDistances() {
    return this._http.get("http://localhost:3000/api/distances")
      .map(result => result);
  }
}
