import { Component, OnInit } from '@angular/core';
import {Product} from './product';
import { Observable } from 'rxjs';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {
  public products: Product[];
  public filtered_products: Product[];
  public shoppingCart: Observable<Product>;

  constructor(private catalogService: CatalogService) 
  {
    this.filtered_products = this.products;
  }


  public ngOnInit(): void {
    this.catalogService.getCatalog().subscribe((data: Product[])=>{
      console.log(data);
      this.products = data;
  })

}

}
