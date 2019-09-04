import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	shoppingCart: any = [];
	globalService;
	total: number = 0;
	subtotal: number = 0;
	tax: number = 0;

	static get parameters() {
		return [GlobalService];
	}

	constructor(globalService) {
		this.globalService = globalService;
	}

	ngOnInit() {
		this.shoppingCart = this.globalService.getCart();
		for (var a = 0; a < this.shoppingCart.length; a++) {
			this.total += this.shoppingCart[a].price;
		}
		this.tax = (5 * 100) / this.total;
		this.subtotal = this.total + this.tax + 5;
	}

	deleteItem(item) {
		if (confirm("Do you really want to delete this book from your cart?")) {
			this.globalService.removeItemFromCart(item);
			this.total = 0;
			for (var a = 0; a < this.shoppingCart.length; a++) {
				this.total += this.shoppingCart[a].price;
			}
			this.tax = (5 * 100) / this.total;
			this.subtotal = this.total + this.tax + 5;
		} else {
			return false;
		}		
	}

	IncreseQuantity(item) {
		item.quantity = item.quantity + 1;
		if(item.quantity < 100) {
			for (var a = 0; a < this.shoppingCart.length; a++) {
				this.total += this.shoppingCart[a].price;
			}
			this.tax = (5 * 100) / this.total;
			this.subtotal = this.total + this.tax + 5;
		} else {
			return;
		}
	}

	DescreseQuantity(item) {
		item.quantity = item.quantity - 1;
		if(item.quantity != 0) {
			for (var a = 0; a < this.shoppingCart.length; a++) {
				this.total -= this.shoppingCart[a].price;
			}
			this.tax = (5 * 100) / this.total;
			this.subtotal = this.total + this.tax + 5;
		} else {
			let result = this.deleteItem(item);
			if (result === false) {
				item.quantity = 1;
			}
		}
	}

	emptyCart() {
		this.globalService.emptyCart();
		if (this.shoppingCart.length > 0) {
			if (confirm("Do you really want to remove all books from your cart?")) {
				this.shoppingCart = [];
			} else {
				return false;
			}
		}
	}
}
