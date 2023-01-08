import userService from '../../services/user.service.js';
import categoryService from '../../services/category.service.js';
import {faker} from '@faker-js/faker';
import db from '../../utils/db.js';
import sectionService from "../../services/section.service.js";
import lectureService from "../../services/lecture.service.js";
import coursesService from "../../services/courses.service.js";

(async () => {
    const listCourse = await db.many('select course_id from courses', []);
    for (let i = 0; i < listCourse.length; i++) {
        console.log(listCourse[i].course_id);
        if (i % 2 === 0) {
            // Section1
            const section1 = await sectionService.insert(1, 'JavaScript 2023/2024 Edition', listCourse[i].course_id);
            console.log(section1)
            const lectureOfSec11 = await lectureService.insert(
                section1,
                1,
                'Output with JavaScript',
                'Sets and Maps are data structures optimized for holding specific types of data. Mark will demonstrate how to use these fundamental data structures in this video.',
                '',
                0,
                false);
            const lectureOfSec12 = await lectureService.insert(
                section1,
                2,
                'Variables in JavaScript',
                'Simply put, variables are containers that hold values. In this video, you\'ll be introduced to variables and the types of values that they can hold or reference.',
                '',
                0,
                false);
            // Section2
            const section2 = await sectionService.insert(2, 'Chapter 1:  Hello Javascript!', listCourse[i].course_id);
            console.log(section2)
            const lectureOfSec2 = await lectureService.insert(
                section2,
                1,
                'Learning to use Variables',
                'In this video lecture, Mark discusses using variables in Javascript.  Mark will demonstrate how to use string variables and variables that carry numerical values.',
                '',
                0,
                false);
            // Section3
            const section3 = await sectionService.insert(3, 'Chapter 2: Storing Information in Variables', listCourse[i].course_id);
            const lectureOfSec3 = await lectureService.insert(
                section3,
                1,
                'Simple Conditionals ',
                'In this video lecture, Mark demonstrates the use of simple conditional statements. ',
                '',
                0,
                false)
            // Section4
            const section4 = await sectionService.insert(4, 'Chapter 3: Conditional Statements', listCourse[i].course_id);
            const lectureOfSec4 = await lectureService.insert(
                section4,
                1,
                'Three Types of Javascript Dialogs',
                'In this video lecture, Mark will demonstrate the three kinds of dialog boxes available in Javascript. ',
                '',
                0,
                false);
            // Section 5
            const section5 = await sectionService.insert(4, 'Chapter 3: Conditional Statements', listCourse[i].course_id);
            const lectureOfSec5 = await lectureService.insert(
                section5,
                1,
                'While Loops and Do...While Loops',
                'In this video lecture Mark covers two common types of loops:  While loops and Do...While Loops.  Loops allow you to execute a block of code a number of times.',
                '',
                0,
                false);
        } else {
            // Section 1
            const section1 = await sectionService.insert(1, 'Introduction', listCourse[i].course_id);
            const lectureOfSec11 = await lectureService.insert(
                section1,
                1,
                'Course Preview: One Sample t Test - Example 1',
                'The SPSS data files (for the entire course) are available under "downloadable materials" in this lecture.\n',
                '',
                0,
                false);
            // Section 2
            const section2 = await sectionService.insert(1, 'One Sample t Test', listCourse[i].course_id);
            const lectureOfSec2 = await lectureService.insert(
                section1,
                1,
                'One Sample t Test - Confidence Interval',
                'This lecture continues with the example from the previous lecture, with a focus on how to interpret the section of the output labeled, "95% confidence interval of the difference".\n',
                '',
                0,
                false);
            // Section 3
            const section3 = await sectionService.insert(1, 'Independent Samples t Test', listCourse[i].course_id);
            const lectureOfSec3 = await lectureService.insert(
                section1,
                1,
                'Independent Samples t Test - Example 1',
                'In this lecture, the first example on the independent samples t test is covered.\n',
                '',
                0,
                false);

        }
    }
})();
