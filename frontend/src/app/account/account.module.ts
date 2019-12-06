import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { AccountComponent } from './account.component';

const routes: Routes = [
  { path: '', component: AccountComponent }
  
];


@NgModule({
  declarations: [AccountComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AccountModule { }
