"use strict";

const Course = use("App/Models/Course");

class CourseController {
  /**
   * Show a list of all courses.
   * GET courses
   */
  async index({ auth }) {
    const courses = await Course.all();
    
    return courses;
  }

  /**
   * Create/save a new course.
   * POST courses
   */
  async store({ auth, request }) {
    const { users, ...data } = request.only(["title", "url", "author", "description", "users"]);
    const course = await Course.create(data);
    
    if(users && users.length > 0) {
      await course.users().attach(users);
      course.users = await course.users().fetch();
    }

    return course;
  }

  /**
   * Display a single course.
   * GET courses/:id
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing course.
   * GET courses/:id/edit
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update course details.
   * PUT or PATCH courses/:id
   */
  async update({ params, request, response }) {}

  /**
   * Delete a course with id.
   * DELETE courses/:id
   */
  async destroy({ params }) {
    const course = await Course.find(params.id);
    await course.delete();
    return course;
  }
}

module.exports = CourseController;
