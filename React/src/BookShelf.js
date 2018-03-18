import React from "react";
import Book from "./Book";
class BookShelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          books: this.props.books
        };
      }

  removeBook(book) {
    var index = this.props.books.indexOf(book);
    if (index > -1) {
      this.props.books.splice(index, 1);
    }

    this.setState({books: this.props.books})
  }

  moveBook(book, targetShelf) {
    this.removeBook(book);
    this.props.moveBook(book, targetShelf)
  }

  render() {
    const { title, shelfId, moveBook } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onMoveBook={(b, s) => this.moveBook(b, s)}
                  shelfId={shelfId}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
