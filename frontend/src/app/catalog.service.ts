import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './catalog/product';
import { Category } from './catalog/category';


@Injectable()
export class CatalogService {

  private REST_API_CATALOG = "http://127.0.0.1/catalog";
  private REST_API_CATEGORY = "http://127.0.0.1/allcategories";

  constructor(private httpClient: HttpClient) { }

  public getCatalog(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.REST_API_CATALOG);
  }

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.REST_API_CATEGORY);
  }

}
