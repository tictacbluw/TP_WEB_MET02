import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CatalogService {

  constructor(private http: HttpClient) { }

    getData() {
    console.info("getting data...")
    return this.http
      .get('assets/product.json')
      // .pipe(map(x => x));
  }

}