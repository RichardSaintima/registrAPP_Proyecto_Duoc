import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(
    private http: HttpClient
  ) { }

  get(url: string) {
    return this.http.get(url);
  }
}
