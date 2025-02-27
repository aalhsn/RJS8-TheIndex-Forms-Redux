import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class AuthorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      imageUrl: "",
      books: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitAuthor = this.submitAuthor.bind(this);
  }

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitAuthor = event => {
    event.preventDefault();
    this.props.postAuthor(this.state, this.props.closeModal);
  };

  render() {
    const errors = this.props.errors;

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitAuthor}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL</span>
            </div>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange}
              name="imageUrl"
            />
          </div>
          <input type="submit" />
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
    postAuthor: (newAuthor, closeModal) =>
      dispatch(actionCreators.postAuthor(newAuthor, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorForm);
