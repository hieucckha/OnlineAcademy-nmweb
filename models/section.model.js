export default class Section {
  constructor(sectionId, sectionOrder, sectionTitle, courseId) {
    this.sectionId = sectionId;
    this.sectionOrder = sectionOrder;
    this.sectionTitle = sectionTitle;
    this.course_id = courseId;

    this.listLecture = [];
  }
}
