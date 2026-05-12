import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiurl = 'www.localhost:3000';
  
  constructor(private http: HttpClient) {}


  


}
