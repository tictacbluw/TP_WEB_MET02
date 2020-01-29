import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { AccountComponent } from './account.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AccountComponent },
  { path: ':id', component: AccountComponent }

];


@NgModule({
  declarations: [AccountComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule, ReactiveFormsModule 
  ],
  exports: [RouterModule]
})
export class AccountModule { }
