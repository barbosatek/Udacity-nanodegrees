import React from 'react'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css'

class BookList extends React.Component{
  state = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
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

  render() {
    return (
      <div className="list-books">
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
          </div>
    )
  }
}

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={BookList} />
          <Route exact path="/search" component={BookSearch} />
      </div>
      </Router>
    )
  }
}

export default BooksApp
