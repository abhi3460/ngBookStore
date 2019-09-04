import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

	route;
	book;
	bookId;
	bookService;
  globalService;

	static get parameters() {
		return [ActivatedRoute, BookService, GlobalService];
	}

  constructor(route, bookService, globalService) {
  	this.route = route;
  	this.bookService = bookService;
    this.globalService = globalService;
  }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.bookId = params["id"];
  		this.bookService.getBookById(this.bookId).subscribe(book => {
  			this.book = book;
  		});
  	});
  }

  addToCart() {
		this.globalService.addToCart(this.book);
    alert("Successfully added");
  }
}
