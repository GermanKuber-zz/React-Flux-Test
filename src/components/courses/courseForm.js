"use strict";

var React = require('react');
var Input = require('../common/textInput');
var SelectAuthorDrop = require("../common/selectAuthorDrop");

var CourseForm = React.createClass({
	propTypes: {
		course: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object,
		authors: React.PropTypes.object.isRequired,
		changeAuthor: React.PropTypes.func.isRequired
	},

	render: function () {
		return (
			<form>
				<h1>Manage Course</h1>
				<Input
					name="title"
					label="First Name"
					value={this.props.course.title}
					onChange={this.props.onChange}
					error={this.props.errors.title} />

				<SelectAuthorDrop
					changeAuthor={this.props.changeAuthor}
					name="authors"
					label="Author"
					authorSelected={this.props.course.author}
					authors={this.props.authors}
				/>
				<Input
					name="length"
					label="Length"
					value={this.props.course.length}
					onChange={this.props.onChange}
					error={this.props.errors.length} />
				<Input
					name="category"
					label="Category"
					value={this.props.course.category}
					onChange={this.props.onChange}
					error={this.props.errors.category} />

				<Input
					name="watchHref"
					label="Watch Href"
					value={this.props.course.watchHref}
					onChange={this.props.onChange}
					error={this.props.errors.watchHref} />

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = CourseForm;