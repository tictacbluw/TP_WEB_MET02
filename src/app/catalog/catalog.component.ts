import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import {AddArticle} from './action/add-article';
import {RemoveArticle} from './action/remove-article';
import {Product} from './product';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public products: Product[];
  public filtered_products: Product[];
  public shoppingCart: Observable<Product>;

  private _product_filter = "";
  constructor( private catalogService: CatalogService, private store: Store) 
  {
    this._product_filter = "";
    this.filtered_products = this.products;
    this.shoppingCart = this.store.select(state => state.users.users);
  }

  doFilter(filterBy: string): Product[] 
  {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product[]) => product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
  get product_filter(): string 
  {
    return this._product_filter;
  }
  
  set product_filter(value: string) 
  {
    this._product_filter = value;
    this.filtered_products = this.product_filter ? this.doFilter(this.product_filter) : this.products;
    console.log(this.product_filter);

  }
  public ngOnInit(): void {
    this.catalogService.getData()
      .subscribe((data: Product[]): void => {
        console.info(data);
        this.products = data;
        this.filtered_products = this.products;
      });
  }

}