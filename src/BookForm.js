import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      color: "red"
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitBook = this.submitBook.bind(this);
  }

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitBook = event => {
    event.preventDefault();
    console.log(this.props.author);
    this.props.postBook(this.state, this.props.author, this.props.closeModal);
  };

  render() {
    const errors = this.props.errors;

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select
              value={this.state.color}
              name="color"
              onChange={this.handleChange}
            >
              <option value="white" name="color">
                White
              </option>
              <option value="yellow" name="color">
                Yellow
              </option>
              <option value="blue" name="color">
                Blue
              </option>

              <option value="green" name="color">
                Green
              </option>

              <option value="purple" name="color">
                Purple
              </option>

              <option selected value="red" name="color">
                Red
              </option>
              <option value="black" name="color">
                Black
              </option>
            </select>
          </div>
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.rootErrors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (newBook, author, closeModal) =>
      dispatch(actionCreators.postBook(newBook, author, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);
