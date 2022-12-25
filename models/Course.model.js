export default{
    SectionDetail(){
        const detail = {
            id: '1',
            name: 'Yoga introduction',
            result: '',
        };
        return detail;
    },
    CourseDetail(){
        const SectionList =[
            this.SectionDetail(),
        ];
        const detail = {
            id: '1',
            list: SectionList, 
        };
        return detail;
    },

};