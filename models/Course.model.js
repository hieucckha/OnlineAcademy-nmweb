export default{
    Courses(){
        const Cource = {
            Name: '', //tên khóa học
            Category: '', //lĩnh vực
            Teacher: '', //giảng viên
            isDiscount : false, //có giảm giá hay không
            Image: '', //ảnh đại diện
            Rating:'', //x.x/5.0
            NumberOfStudent: '', //số lượng học viên
            Link: '', //link khóa học
            Price: '',//giá gốc
            discountPrice: '',//giá sau khi giảm
            isBestSeller: false, //bán chạy hay không
        };
        return Cource;
    }
};