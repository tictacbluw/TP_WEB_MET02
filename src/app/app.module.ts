import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HeaderComponent } from './header/header.component';
import { CatalogService } from './catalog.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import  {ShoppingCart} from './catalog/state/shopping-cart';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgxsModule.forRoot([ShoppingCart]) ],
  declarations: [ AppComponent, HelloComponent, CatalogComponent, HeaderComponent, RegisterComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ CatalogService ]
})
export class AppModule { }
