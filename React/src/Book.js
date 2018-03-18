import React from "react";
class Book extends React.Component {
  state = {
    value: ''
  };

  updateBook(event, book) {
    this.props.onMoveBook(book, event.target.value);
   }
 
  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageUrl})`
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={e => this.updateBook(e,book)} value={this.state.value}>
              <option value="none" disabled>
                Move to...
              </option>
              {this.props.shelfId !== 'currentlyReading' && <option value="currentlyReading">Currently Reading</option>}
              {this.props.shelfId !== 'wantToRead' && <option value="wantToRead">Want to Read</option>}
              {this.props.shelfId !== 'read' && <option value="read">Read</option>}
              {this.props.shelfId !== 'none' && <option value="none">None</option>}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

export default Book;
