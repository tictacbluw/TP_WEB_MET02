import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
})
};

const httpOptionsToken = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': '[Bearer ' + localStorage.getItem('token') + ']'  })
};

@Injectable()
export class AccountService {

  private REST_API_TOKEN_URL = 'http://127.0.0.1/login';
  private REST_API_ACCOUNTINFO_URL = 'http://127.0.0.1/api/client/';



  constructor(private httpClient: HttpClient) { }

  public getToken(user): Observable<any> {
    return this.httpClient.post<any>(this.REST_API_TOKEN_URL, JSON.stringify(user), httpOptions);
  }

  public getAccountinfo(userid): Observable<any> {
    return this.httpClient.get<any>(this.REST_API_ACCOUNTINFO_URL + userid, httpOptionsToken);
  }
}
