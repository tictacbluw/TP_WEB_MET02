import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HeaderComponent } from './header/header.component';
import { CatalogService } from './catalog.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, CatalogComponent, HeaderComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ CatalogService ]
})
export class AppModule { }
