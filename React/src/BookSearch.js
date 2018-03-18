import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import Book from "./Book";

class BookSearch extends React.Component{
  state = {
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    BooksAPI.search(query.trim()).then((books) => {
      books = books.map(book => {
        return {
          imageUrl: book.imageLinks.thumbnail,
          title: book.title,
          authors: book.authors.join(', '),
          id: book.id
        }
      });

      this.setState({ books })
    })
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books = books.map(book => {
        return {
          imageUrl: book.imageLinks.thumbnail,
          title: book.title,
          authors: book.authors.join(', '),
          id: book.id
        }
      });
      this.setState({ books })
    })
  }

    render() {
      return (
        <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}/>
  
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
            </div>
      )
    }
  }

  export default BookSearch