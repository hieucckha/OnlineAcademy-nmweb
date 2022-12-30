export default{
    SectionDetail(){
        const detail = {
            id: '1',
            name: 'Yoga introduction',
            result: '',
            file: '',
        };
        return detail;
    },
    CourseDetail(){
        const SectionList =[];

        for (let i = 0;i<5;i++) {
            const section = this.SectionDetail();
            section.id = Number(i+1).toString();
            SectionList.push(section);
        }

        const detail = {
            id: '1',
            name: 'Yoga class',
            destription: 'Abc',
            studentNum: 10,
            sectionNum: 15,
            complete: false,
            sectionList: SectionList, 
        };
        return detail;
    },
    getAllCourses(){
        const CoursesList = [];
        for (let i = 0;i<10;i++) {
            const course = this.CourseDetail();
            course.id = Number(i+1).toString();
            CoursesList.push(course);
        }
        return CoursesList;
    }
};