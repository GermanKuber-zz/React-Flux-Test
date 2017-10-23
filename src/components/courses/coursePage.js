"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var CourseStore = require('../../stores/courseStore');
var CourseActions = require('../../actions/courseActions');
var CoursesList = require('./coursesList');

var CoursePage = React.createClass({
	getInitialState: function() {
		return {
			courses: CourseStore.getAllCourses()
		};
	},

	componentWillMount: function() {
		CourseStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		CourseStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ courses: CourseStore.getAllCourses() });
	},

	render: function() {
		return (
			<div>
				<h1>Authors</h1>
				{/* <Link to="addAuthor" className="btn btn-default">Add Author</Link> */}
				<CoursesList courses={this.state.courses} />
			</div>
		);
	}
});

module.exports = CoursePage;