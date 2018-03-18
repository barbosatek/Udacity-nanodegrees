import React from 'react'
import BookShelf from './BookShelf'
import { Route, Link } from "react-router-dom";
import './App.css'
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class BooksApp extends React.Component {
  state = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    books: [],
  }

  mapBook(book) {
    let mappedBook = {
      imageUrl: book.imageLinks.thumbnail,
      title: book.title,
      authors: '',
      id: book.id,
      shelf: book.shelf
    };

    if(book.authors){
      mappedBook.authors = book.authors.join(", ")
    }

    return mappedBook;
  }

  updateQuery = query => {
    BooksAPI.search(query.trim()).then(books => {
      if (!Array.isArray(books)) {
        return;
      }

      books = books.map(book => {
        return this.mapBook(book);
      });

      this.setState({ books });
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let mappedBooks = books.map(book => {
        return this.mapBook(book);
      });

      mappedBooks.forEach(book => {
        this.moveBook(book, book.shelf)
      });
    });
  }

  moveBook(book, targetShelf){
    if(targetShelf === 'currentlyReading'){
      this.setState(state => ({
        currentlyReadingBooks : state.currentlyReadingBooks.concat([book])
      }))
    }
    else if(targetShelf === 'wantToRead'){
      this.setState(state => ({
        wantToReadBooks : state.wantToReadBooks.concat([book])
      }))
    }
    else if(targetShelf === 'read'){
      this.setState(state => ({
        readBooks : state.readBooks.concat([book])
      }))
    }
  }

  closeSearchPage(e, history) {
    e.preventDefault();
    history.push("/");
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={({ history }) => <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" books={this.state.currentlyReadingBooks} shelfId="currentlyReading" moveBook={(b, s) => this.moveBook(b, s)}/>
                <BookShelf title="Want to Read" books={this.state.wantToReadBooks} shelfId="wantToRead" moveBook={(b, s) => this.moveBook(b, s)}/>
                <BookShelf title="Read" books={this.state.readBooks} shelfId="read" moveBook={(b, s) => this.moveBook(b, s)}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>} />
          <Route exact path="/search" render={({ history }) => <div className="search-books">
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
                  onMoveBook={(b, s) => this.moveBook(b, s)}
                  shelfId="search"
                />
              </li>
            ))}
          </ol>
        </div>
      </div>} />
      </div>
    )
  }
}

export default BooksApp
