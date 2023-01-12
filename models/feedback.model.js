export default class Feedback {
    constructor(userId, courseId, firstName, lastName, rating, comment) {
        this.userId = userId;
        this.courseId = courseId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.rating = rating;
        this.comment = comment;
    }
}