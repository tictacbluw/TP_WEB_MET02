import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CatalogService {

  private REST_API_CATALOG = "http://127.0.0.1/backend/catalog";

  constructor(private httpClient: HttpClient) { }

  public getCatalog(){
    return this.httpClient.get(this.REST_API_CATALOG);
  }

}