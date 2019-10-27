import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public products: any;
  public filtered_products: any;

  private _product_filter = "";
  constructor( private catalogService: CatalogService) 
  {
    this._product_filter = "";
    this.filtered_products = this.products;

  }

  doFilter(filterBy: string): any[] 
  {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: any) => product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
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
      .subscribe((data: any): void => {
        console.info(data);
        this.products = data;
        this.filtered_products = this.products;
      });
  }

}