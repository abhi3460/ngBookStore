var app = require('express')();
var Book = require('../models/bookModel');
var Admin = require('../models/adminModel');

/* Add New Admin */
app.post('/addnewadmin', function (request, response) {
  if (request.body.password !== request.body.passwordConf) {
    response.send({
      success: false,
      message: "Passwords do not match."
    });
  }

  if (request.body.email && request.body.username && request.body.password && request.body.passwordConf) {
    var adminData = {
      email: request.body.email,
      username: request.body.username,
      password: request.body.password,
      passwordConf: request.body.passwordConf,
    }

    console.log(adminData);

    //use schema.create to insert data into the db
    Admin.create(adminData, function (err, admin) {
      if (error) {
        response.send({
          success: false,
          message: "Opps, got error while adding new admin, please check your data and try again."
        });
      } else {
        response.send({
          success: true,
          message: "Admin successfully added",
          id: admin._id
        });
      }
    });
  } else {
    response.send({
      success: false,
      message: "Opps, got error while adding new admin, please check your data and try again."
    });
  }
});

/* Admin Login Authentication */
app.post('/adminlogin', function (request, response) {
  if (request.body.loginemail && request.body.loginpassword) {
    Admin.authenticate(request.body.loginemail, request.body.loginpassword, function (error, admin) {
      if (error || !admin) {
        response.send({
          success: false,
          message: "Wrong email or password."
        });
      } else {
        request.session.adminId = admin._id;
        response.send({
          success: true,
          message: "Login successfull.",
          id: admin._id
        });
      }
    });
  } else {
    response.send({
      success: false,
      message: "All fields required."
    });
  }
});

app.get('/adminlogout', function (request, response, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

/* Code for getting all books */
app.get('/books', function (request, response) {
  Book.find({}, function (error, books) {
    console.log(books);
    if (error) throw error;
    response.send(books);
  });
});


/* Code for getting books by book-id */
app.get('/book', function (request, response) {
  var id = request.query.bookId;

  Book.find({
    _id: id
  }, function (error, book) {
    if (error) throw error;
    response.send(book[0]);
  });
});


/* Code for deleting books by book-id */
app.delete('/book', function (request, response) {
  var bookId = request.query.bookId;

  Book.findByIdAndRemove(bookId, function (error, book) {
    if (error) {
      console.log(error);
      response.send({
        success: false,
        message: "Book with id " + book._id + " is not deleted successfully..."
      });
    } else {
      response.send({
        success: true,
        message: "Book successfully deleted",
        id: book._id
      });
    }
  });
});


/* Code for adding new book */
app.post('/book', function (request, response) {
  var bookData = request.body.bookData;
  var book = new Book(bookData);

  book.save(function (error, createdBookObject) {
    if (error) {
      response.send({
        success: false,
        message: "Book not added successfully..."
      });
    } else {
      response.send({
        success: true,
        message: "Book successfully added...",
        book: createdBookObject
      });
    }
  });
});


/* Code for updating book */
app.put('/book', function (request, response) {
  var bookData = request.body.bookData;

  Book.findById(bookData.id, function (error, book) {
    if (error) {
      response.send(error);
    } else {
      book.title = bookData.title;
      book.author = bookData.author;
      book.publisher = bookData.publisher;
      book.price = bookData.price;
      book.description = bookData.description;
      book.category = bookData.category;
      book.cover = bookData.cover;

      book.save(function (error, book) {
        if (error) {
          response.send({
            success: false,
            message: "Book not updated successfully..."
          });
        } else {
          response.send({
            success: true,
            message: "Book updated successfully..."
          });
        }
      });
    }
  });
});

module.exports = app;
