import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BookService {
  http: any;

  static get parameters() {
		return [Http];
  }

  constructor(http) {
  	this.http = http;
  }

  getAllBooks(){
  	let searchUrl = "http://localhost:3000/books";
  	return this.http.get(searchUrl).map(response => response.json());
  }

  getBookById(id){
  	let searchUrl = "http://localhost:3000/book?bookId=" + id;
  	return this.http.get(searchUrl).map(response => response.json());
  }

  deleteBookById(id){
  	let searchUrl = "http://localhost:3000/book?bookId=" + id;
  	console.log(id);
  	return this.http.delete(searchUrl).map(response => response.json());
  }

  addBook(bookData){
  	let searchUrl = "http://localhost:3000/book";
  	let headers = new Headers();
  	headers.append("Content-Type", "application/json");
  	let options = new RequestOptions({
  		headers: headers
  	});

  	return this.http.post(searchUrl, JSON.stringify({ bookData: bookData }), options).map(response => response.json());
  }

  updateBook(bookData){
  	let searchUrl = "http://localhost:3000/book";
  	let headers = new Headers();
  	headers.append("Content-Type", "application/json");
  	let options = new RequestOptions({
  		headers: headers
  	});

  	return this.http.put(searchUrl, JSON.stringify({ bookData: bookData }), options).map(response => response.json());
  }

}
