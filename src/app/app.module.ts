/* Modules and Routes */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import 'rxjs/add/operator/map';

/* App Component */
import { AppComponent } from './app.component';

/* User Components */
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { BookComponent } from './components/book/book.component';
import { CartComponent } from './components/cart/cart.component';

/* Admin Components */
import { AdminComponent } from './components/admin/admin.component';
import { BooksComponent } from './components/books/books.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { ManageComponent } from './components/manage/manage.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';

/* Services */
import { BookService } from './services/book.service';
import { GlobalService } from './services/global.service';
import { AdminService } from './services/admin.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    BooklistComponent,
    BookComponent,
    CartComponent,
    AdminComponent,
    BooksComponent,
    AddbookComponent,
    ManageComponent,
    FooterAdminComponent,
    NavbarAdminComponent    
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpModule,
    routing
  ],
  providers: [ BookService, GlobalService, AdminService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
