"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var toastr = require('toastr');
var AuthorStore = require('../../stores/authorStore');
var ManageCoursePage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function (transition, component) {
			if (component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		}
	},

	getInitialState: function () {
		var state = {
			course: {},
			authors: AuthorStore.getAllAuthors(),
			errors: {},
			dirty: false
		};
		return state;
	},

	componentWillMount: function () {
		var courseId = this.props.params.id; //from the path '/course:id'
		if (courseId) {
			this.setState({ course: CourseStore.getCoursesById(courseId) });
		}
	},

	setCourseState: function (event) {
		this.setState({ dirty: true });
		var field = event.target.name;
		var value = event.target.value;
		this.state.course[field] = value;
		return this.setState({ course: this.state.course });
	},
	changeAuthor: function (authorId) {
		this.setState(prevState => Object.assign({}, prevState, {
			course: Object.assign({}, prevState.course, {
				author: Object.assign({}, prevState.course.author, {
					id: authorId
				})
			})
		}));

	},
	courseFormIsValid: function () {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.course.firstName.length < 3) {
			this.state.errors.firstName = 'First name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.course.lastName.length < 3) {
			this.state.errors.lastName = 'Last name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({ errors: this.state.errors });
		return formIsValid;
	},

	saveCourse: function (event) {
		event.preventDefault();

	
		console.log(this.state.course);
		
		if (this.state.course.id) {
			CourseActions.updateCourse(this.state.course);
		} else {
			CourseActions.createCourse(this.state.course);
		}

		this.setState({ dirty: false });
		toastr.success('Course saved.');
		this.transitionTo('courses');
	},

	render: function () {

		return (
			<CourseForm
				authors={this.state.authors}
				course={this.state.course}
				onChange={this.setCourseState}
				changeAuthor={this.changeAuthor}
				onSave={this.saveCourse}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageCoursePage;