import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

	title: string;
	author: string;
	publisher: string;
	price: string;
	category: string;
	description: string;
	cover: string;
  id: string;

	bookService: any;
	router;
  route;

  editMode: boolean = false;

	static get parameters() {
		return [BookService, ActivatedRoute, Router];
	}

	constructor(bookService, route, router) {
		this.bookService = bookService;
    this.route = route;
	  this.router = router;
	}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params["bookId"]) {
        let bookId = params["bookId"];
        this.editMode = true;
        this.bookService.getBookById(bookId).subscribe(book => {
          this.id = book._id;
          this.title = book.title;
          this.author = book.author;
          this.publisher = book.publisher;
          this.price = book.price;
          this.category = book.category;
          this.description = book.description;
          this.cover = book.cover;
        });
      }
    });
  }

  addBook() {
    if(this.editMode) {
      let bookData = {
        id: this.id,
        title: this.title,
        author: this.author,
        publisher: this.publisher,
        price: this.price,
        category: this.category,
        description: this.description,
        cover:this.cover
      }

      this.bookService.updateBook(bookData).subscribe(result => {
        if(result.success) {
          alert(result.message);
          this.router.navigate(["/manage"]);
        }
      });
    } else {
      let bookData = {
        title: this.title,
        author: this.author,
        publisher: this.publisher,
        price: this.price,
        category: this.category,
        description: this.description,
        cover:this.cover
      }

      this.bookService.addBook(bookData).subscribe(res => {
        if(res.success) {
          alert(res.message);
          this.router.navigate(["/manage"]);
        } else {
          alert(res.message);
        }
      });
    }
  }

}
