"use strict";

var React = require('react');

var SelectAuthorDrop = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    authors: React.PropTypes.array.isRequired,
    authorSelected: React.PropTypes.object.isRequired
    // onChange: React.PropTypes.func.isRequired,
    // value: React.PropTypes.string,
    // error: React.PropTypes.string
  },
   onChangeFunc : function (event) {
    this.props.changeAuthor(event.target.value);
  },
  render: function () {
    var createOptionUser = function (author) {
      if (this.props.authorSelected.id == author.id)
        return (
          <option selected>{author.firstName} {author.lastName}</option>
        );
      else
        return (
          <option>{author.firstName} {author.lastName}</option>
        );
    }

    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <select type="text"
            onChange={this.onChangeFunc}
            name={this.props.name}
            className="form-control"
            ref={this.props.name}
          /* onChange={this.props.onChange} */
          >
            {this.props.authors.map(createOptionUser, this)}
          </select >
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = SelectAuthorDrop;