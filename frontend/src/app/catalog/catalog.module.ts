import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: ':id', component: CatalogComponent }

];

@NgModule({
  declarations: [CatalogComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule, ReactiveFormsModule
  ],
  exports: [RouterModule]

})
export class CatalogModule { }
