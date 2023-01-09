export default class Course {
  constructor(
    courseId,
    title,
    categoryId,
    image,
    bDescription,
    description,
    price,
    discount,
    status,
    rating,
    numEnroll,
    numRating,
    createBy,
    createAt,
    updateAt,
  ) {
    this.courseId = courseId;
    this.title = title;
    this.categoryId = categoryId;
    this.image = image;
    this.bDescription = bDescription;
    this.description = description;
    this.price = price;
    this.discount = discount;
    this.status = status;
    this.rating = rating;
    this.numEnroll = numEnroll;
    this.numRating = numRating;
    this.createBy = createBy;
    this.createAt = createAt;
    this.updateAt = updateAt;

    this.sectionList = [];
    this.feedbackList = [];
  }
}

// SectionDetail() {
//   const detail = {
//     id: '1',
//     name: 'Yoga introduction',
//     result: '',
//     file: '',
//   };
//   return detail;
// },
// CourseDetail() {
//   const SectionList = [];

//   for (let i = 0; i < 5; i++) {
//     const section = this.SectionDetail();
//     section.id = Number(i + 1).toString();
//     SectionList.push(section);
//   }

//   const detail = {
//     id: '1',
//     name: 'Yoga class',
//     destription: 'Abc',
//     studentNum: 10,
//     sectionNum: 15,
//     complete: false,
//     sectionList: SectionList,
//   };
//   return detail;
// },
// getAllCourses() {
//   const CoursesList = [];
//   for (let i = 0; i < 10; i++) {
//     const course = this.CourseDetail();
//     course.id = Number(i + 1).toString();
//     CoursesList.push(course);
//   }
//   return CoursesList;
// },
