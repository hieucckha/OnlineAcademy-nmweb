export default class Lecture {
  constructor(
    lectureId,
    sectionId,
    lectureTitle,
    lectureOrder,
    description,
    source,
    length,
    is_preview
  ) {
    this.lectureId = lectureId;
    this.sectionId = sectionId;
    this.lectureTitle = lectureTitle;
    this.lectureOrder = lectureOrder;
    this.description = description;
    this.source = source;
    this.length = length;
    this.isPreview = is_preview;
  }
}
