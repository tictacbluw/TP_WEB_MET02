import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';

const routes: Routes = [
  { path: '', component: CatalogComponent }
  
];

@NgModule({
  declarations: [CatalogComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]

})
export class CatalogModule { }
