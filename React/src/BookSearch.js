import React from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class BookSearch extends React.Component {
  state = {
    books: [],
    query: ""
  };

  mapBook(book) {
    let mappedBook = {
      imageUrl: book.imageLinks.thumbnail,
      title: book.title,
      authors: '',
      id: book.id
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
      this.setState({ books: mappedBooks });
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a
            className="close-search"
            onClick={() => this.setState({ showSearchPage: false })}
          >
            Close
          </a>
          <div className="search-books-input-wrapper">
            {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
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
      </div>
    );
  }
}

export default BookSearch;
