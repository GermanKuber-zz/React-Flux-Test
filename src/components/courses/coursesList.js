"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');

var CoursesList = React.createClass({
	propTypes: {
		courses: React.PropTypes.array.isRequired
	},

	deleteCourse: function (id, event) {
		event.preventDefault();
		CourseActions.deleteCourse(id);
		toastr.success('Course Deleted');
	},

	render: function () {
		console.log(this.props);
		var createAuthorRow = function (course) {
			return (
				<tr key={course.id}>
					<td><a href={course.watchHref} >Watch</a></td>
					<td><a href="#" onClick={this.deleteCourse.bind(this, course.id)}>Delete</a></td>
					<td><Link to="manageCourse" params={{id: course.id}}>{course.id}</Link></td>
					<td>{course.author.name}</td>
					<td>{course.category}</td>
					<td>{course.length}</td>
				</tr>
			);
		};

		return (
		
			<div>
				<table className="table">
					<thead>
						<th></th>
						<th></th>
						<th>Title</th>
						<th>Author</th>
						<th>Category</th>
						<th>Length</th>
					</thead>
					<tbody>
						{this.props.courses.map(createAuthorRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = CoursesList;