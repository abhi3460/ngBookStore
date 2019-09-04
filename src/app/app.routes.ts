import { RouterModule, Routes } from '@angular/router';

/* User */
import { HomeComponent } from './components/home/home.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { BookComponent } from './components/book/book.component';
import { CartComponent } from './components/cart/cart.component';

/* Admin */
import { ManageComponent } from './components/manage/manage.component';
import { BooksComponent } from './components/books/books.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: "full",
		redirectTo: "home"
	},
	{
		path: "home",
		component: HomeComponent,
		children: [
			{
				path: '',
				component: BooklistComponent
			},
			{
				path: 'book/:id',
				component: BookComponent
			},
			{
				path: 'cart',
				component: CartComponent
			}
		]
	},
	{
		path: 'adminLogin',
		component: AdminComponent
	},
	{
		path: "manage",
		component: ManageComponent,
		children: [
			{
				path: '',
				component: BooksComponent
			},
			{
				path: 'book/add',
				component: AddbookComponent
			},
			{
				path: 'book/add/:bookId',
				component: AddbookComponent
			}
		]
	},
]

export const routing = RouterModule.forRoot(routes);