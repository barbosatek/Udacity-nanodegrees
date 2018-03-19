import React from "react";
import BookShelf from "./BookShelf";
import { Route, Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class BooksApp extends React.Component {
  state = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    books: [],
    query: ""
  };

  mapBook(book) {
    let mappedBook = {
      imageUrl: "",
      title: book.title,
      authors: "",
      id: book.id,
      shelf: null
    };

    if (typeof book.shelf !== "string") {
      mappedBook.shelf = "none";
    } else {
      mappedBook.shelf = book.shelf;
    }

    if (book.authors) {
      mappedBook.authors = book.authors.join(", ");
    }

    if (book.imageLinks && book.imageLinks.thumbnail) {
      mappedBook.imageUrl = book.imageLinks.thumbnail;
    }

    return mappedBook;
  }

  updateQuery = query => {
    query = query.trim();
    this.setState({ query });

    if (query === "") {
      this.setState({ books: [] });
    } else {
      BooksAPI.search(query).then(books => {
        if (!Array.isArray(books)) {
          return;
        }

        books = books.map(book => {
          return this.mapBook(book);
        });

        var allBooks = [];
        allBooks = allBooks.concat(
          this.state.currentlyReadingBooks,
          this.state.wantToReadBooks,
          this.state.readBooks
        );
        books.forEach(b => {
          var existingBook = allBooks.find(x => x.id === b.id);
          if (existingBook !== undefined) {
            b.shelf = existingBook.shelf;
          }
        });

        this.setState({ books });
      });
    }
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let mappedBooks = books.map(book => {
        return this.mapBook(book);
      });

      mappedBooks.forEach(book => {
        this.moveBook(book, book.shelf);
      });

      this.setState(x => x);
    });
  }

  removeBook(book) {
    let shelf = [];
    if (book.shelf === "currentlyReading") {
      shelf = this.state.currentlyReadingBooks;
    } else if (book.shelf === "wantToRead") {
      shelf = this.state.wantToReadBooks;
    } else if (book.shelf === "read") {
      shelf = this.state.readBooks;
    } else {
      return;
    }

    var index = shelf.indexOf(book);
    if (index > -1) {
      shelf.splice(index, 1);
    }
  }

  updateBook(book, targetShelf) {
    this.removeBook(book);

    BooksAPI.update(book, targetShelf).then((bookShelf, e) => {
      this.moveBook(book, targetShelf);
      this.setState(x => x);
    });
  }

  moveBook(book, targetShelf) {
    if (targetShelf === "currentlyReading") {
      book.shelf = "currentlyReading";
      this.state.currentlyReadingBooks.push(book);
    } else if (targetShelf === "wantToRead") {
      book.shelf = "wantToRead";
      this.state.wantToReadBooks.push(book);
    } else if (targetShelf === "read") {
      book.shelf = "read";
      this.state.readBooks.push(book);
    }
  }

  closeSearchPage(e, history) {
    e.preventDefault();
    history.push("/");
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    title="Currently Reading"
                    books={this.state.currentlyReadingBooks}
                    moveBook={(b, s) => this.updateBook(b, s)}
                  />
                  <BookShelf
                    title="Want to Read"
                    books={this.state.wantToReadBooks}
                    moveBook={(b, s) => this.updateBook(b, s)}
                  />
                  <BookShelf
                    title="Read"
                    books={this.state.readBooks}
                    moveBook={(b, s) => this.updateBook(b, s)}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <div className="search-books">
              <div className="search-books-bar">
                <a
                  className="close-search"
                  onClick={e => this.closeSearchPage(e, history)}
                >
                  Close
                </a>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={event => this.updateQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.books.map(book => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        onMoveBook={(b, s) => this.updateBook(b, s)}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
