import { Component, OnInit } from '@angular/core';
import {Product} from './product';
import {Category} from './category';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { CatalogService } from '../catalog.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {
  products: Observable<Product[]>;
  categories: Observable<Category[]>;
  search_form;

  isLoading: boolean = false;
  constructor(private catalogService: CatalogService, private route: ActivatedRoute, private formBuilder: FormBuilder)
  {

  }
  searchProduct(data?: string) {
    console.log(data);
    this.isLoading = true;
    this.products = this.catalogService.getCatalog();
    this.products.pipe(
      map(
        (products: Product[]) => products.filter(
          (product: Product) => product.name == data
        )
      )
    ).subscribe(() => {this.isLoading = false});
    console.log(this.products);
  }

  public ngOnInit(): void {
    this.categories = this.catalogService.getCategories();

    this.search_form = this.formBuilder.group({
      search_input: ['', []]
    });

    this.searchProduct();

}


}
