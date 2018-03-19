import React from "react";
class Book extends React.Component {
  state = {
    value: this.props.book.shelf
  };

  updateBook(event, book) {
    this.props.onMoveBook(book, event.target.value);
    this.setState({ value: event.target.value });
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
            <select
              onChange={e => this.updateBook(e, book)}
              value={this.state.value}
            >
              <option value="" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
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
