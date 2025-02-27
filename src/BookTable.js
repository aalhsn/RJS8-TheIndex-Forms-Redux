import React, { Component } from "react";

import BookRow from "./BookRow";

class BookTable extends Component {
  render() {
    console.log("THIS", this.props.books);
    const bookRows = this.props.books.map(book => (
      <BookRow key={book.id} book={book} />
    ));
    return (
      <table className="mt-3 table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Authors</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>{bookRows}</tbody>
      </table>
    );
  }
}

export default BookTable;
