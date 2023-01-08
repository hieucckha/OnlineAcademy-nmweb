-- Users
INSERT INTO users (user_id, email, password, avatar, first_name, last_name, caption, biography, role, status)
VALUES -- Admin
       ('33bb527d-3b96-4a4c-a8e8-09ea9edb0c54', 'hieucckha@gmail.com',
        '$2a$10$KLdaA7FhYVfPxT5uG7b.Tu/pECdaH.jQt7.s4liIv/mDCWfp2zrl.', null, 'Hieu', 'Nguyen', null, null, 0, 0),
       -- Student
       ('1ed4ef15-1512-48d6-be79-3793867fcea4', 'conpasslaconheo@gmail.com',
        '$2a$10$KLdaA7FhYVfPxT5uG7b.Tu/pECdaH.jQt7.s4liIv/mDCWfp2zrl.', null, 'Hieu', 'Nguyen', null, null, 2, 0),
       ('a313dc63-f4b5-4e8e-8554-aafb3fa00d7a', 'vothanhsuong123@gmail.com',
        '$2a$10$BVRAMBz9k49zeC3SD4xY9up15lfTu2RlUiFdXc0YOU4YqRBEzUxFi', null, 'Suong', 'Vo', null, null, 2, 0),
       ('40e8e2a5-29b9-4be4-801d-8d0346036819', 'Otho_Sipes@gmail.com',
        '$2a$10$mIW9giJiYCy/eWRHvywLAu.0pZYO5vz1iw4gTaCjKu0w5OXH8iT6u', null, 'Gregg', 'Ziemann', null, null, 2, 0),
       ('d78063cf-f724-4958-b5be-52ba085a9521', 'Vicente.Wilderman@gmail.com',
        '$2a$10$1uOp.sBoq6t15yqZO9aiE.342oANHlVd23UyNweJ6z7I6aKNFTAhW', null, 'Diana', 'Beahan', null, null, 2, 0),
       ('5c47534d-75f4-4866-ba43-6aaee3a65aa5', 'Kale.Trantow@hotmail.com',
        '$2a$10$imDTuLQwAfL0vjUtk/oT5.Pue1N7Qku1lrFsb92wi85iz215yC226', null, 'Dominick', 'Nolan', null, null, 2, 0),
       -- Teacher
       ('d172436b-5020-4b34-8827-6ebd041d5474', 'Manuela.Deckow@yahoo.com',
        '$2a$10$XeXZ5UXOzsJeZAezuWepLOURpNA8.sOsBhI1YXDRQrJMvWbQ2QVNa',
        'img/users/d172436b-5020-4b34-8827-6ebd041d5474.jpg', 'Lonnie', 'Heidenreich',
        'Best Selling Instructor, 9x AWS Certified, Kafka Guru',
        'Stephane is a solutions architect, consultant and software developer that has a particular interest in all things related to Big Data, Cloud & API',
        1, 0),
       ('4b78f00e-cde6-4bb5-8877-fffd6adaf046', 'Arvilla.Predovic@gmail.com',
        '$2a$10$I6i2hEQRYMG3yYq7CQ60wu7cXhHZpUkRZhiu5//x2Y7kjt3Io8ml.',
        'img/users/4b78f00e-cde6-4bb5-8877-fffd6adaf046.jpg', 'Hilda', 'Rowe', 'Developer and Lead Instructor',
        'I''m Angela, I''m a developer with a passion for teaching. I''m the lead instructor at the London App Brewery, London''s leading Programming Bootcamp',
        1, 0),
       ('75d689e1-aaef-4fc7-82b3-6fb29aa53128', 'Zena.Wintheiser@gmail.com',
        '$2a$10$zBl2nJQBETZ1gkq5GTg19u07inaJCEM0N3vJabEYg49tU3fcYbqNK',
        'img/users/75d689e1-aaef-4fc7-82b3-6fb29aa53128.jpg', 'Boyd', 'Walker', 'Web Developer, Designer, and Teacher',
        'Hi, I''m Jonas! I have been identified as one of Udemy''s Top Instructors and all my premium courses have earned the best-selling status for outstanding performance and student satisfaction.',
        1, 0);

-- Categories
INSERT INTO categories (category_id, category_title, category_parent)
VALUES -- Level 1
       ('9f3d296a-e139-4ba7-8c17-5cd34ae03c8d', 'Development', null),
       ('7b8faed9-ea6e-4fcf-82f7-2b5cf5e89332', 'Business', null),
       ('2d1ffcbe-b834-490d-be06-827c0711634e', 'Marketing', null),
       ('5e11eae9-14d4-4442-8272-e78c072850e8', 'Design', null),
       -- Level 2
       -- Development
       ('2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2', 'Web Development', '9f3d296a-e139-4ba7-8c17-5cd34ae03c8d'),
       ('c7a94c36-7f71-4443-955f-0f0f9397c5ca', 'Data science', '9f3d296a-e139-4ba7-8c17-5cd34ae03c8d'),
       ('d0336f15-32dd-4146-a814-0c035a769430', 'Mobile Development', '9f3d296a-e139-4ba7-8c17-5cd34ae03c8d'),
       -- Business
       ('34035f08-a7a5-4bc0-a377-14dc6cb11132', 'Communication', '7b8faed9-ea6e-4fcf-82f7-2b5cf5e89332'),
       ('7373ae3d-76de-43df-8f1a-8bcb1d55d7fa', 'Management', '7b8faed9-ea6e-4fcf-82f7-2b5cf5e89332'),
       ('368bb3a8-d00d-41a7-a865-dd4ff2cc3d0f', 'Sales', '7b8faed9-ea6e-4fcf-82f7-2b5cf5e89332'),
       -- Marketing
       ('e3c0fac4-ef74-4d93-a726-f3ca38a5f977', 'Digital Marketing', '2d1ffcbe-b834-490d-be06-827c0711634e'),
       ('4435fea4-583f-450f-be7a-39cf8818eef2', 'Product Marketing', '2d1ffcbe-b834-490d-be06-827c0711634e'),
       ('aaf89c2a-0966-4c15-a703-d301d336b7ba', 'Other Marketing', '2d1ffcbe-b834-490d-be06-827c0711634e'),
       -- Design
       ('8c7f2c72-57fa-4d63-aa4b-a66d5724e2f5', 'Web Design', '5e11eae9-14d4-4442-8272-e78c072850e8'),
       ('2a738822-e07a-492d-80aa-74b327a08600', 'Game Design', '5e11eae9-14d4-4442-8272-e78c072850e8'),
       ('7139f8b2-02c6-47cf-9028-19d3f6511e96', 'Architectural Design', '5e11eae9-14d4-4442-8272-e78c072850e8');

-- Courses
--
-- Web Development
--
SELECT *
FROM fn_insert_course('a20f47ba-62e3-44e8-89e9-43a5e95d56ec',
                      'Javascript for Beginners',
                      '2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2',
                      'img/courses/a20f47ba-62e3-44e8-89e9-43a5e95d56ec.jpg',
                      'Learn javascript online and supercharge your web design with this Javascript for beginners training course.',
                      '<p>Take this Javascript training course and start learning Javascript today.</p><p>&quot;As a business guy I have no place in programming.&quot; Ten years ago you could have gotten away with that statement. Today you say that to your colleagues and they scoff at you before they go back to their computers to fix real problems and do real work.</p>',
                      1799000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
SELECT *
FROM fn_insert_course('6f339341-3e6a-4a76-a1ec-17c05d8a0027',
                      'Become a Certified HTML, CSS, JavaScript Web Developer',
                      '2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2',
                      'img/courses/6f339341-3e6a-4a76-a1ec-17c05d8a0027.jpg',
                      'Complete coverage of HTML, CSS, Javascript while you Earn Four Respected Certifications',
                      '<p>Welcome to the Ultimate 2023 Web Development Bootcamp, <b>the only course you need</b> to learn to code and become a full-stack web developer and the <b>only course that will prepare you for a career in web development</b>.</p><p>Join over 20,000 fellow students already taking this course!</p><p>At 40+ hours, this web development course is extremely comprehensive and one of the most detailed courses available on Udemy! Even if you have zero programming experience, this course will take you from beginner to coding ninja.</p>',
                      1899000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
SELECT *
FROM fn_insert_course('7c04135f-1ac4-4536-a3a2-ee5d9739d2b8',
                      'AJAX Development',
                      '2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2',
                      'img/courses/7c04135f-1ac4-4536-a3a2-ee5d9739d2b8.jpg',
                      'Create Elegant, Powerful Web and Mobile Applications Using AJAX.',
                      '<p>You&rsquo;ve learned a little Javascript, but you still look at websites with slick, smooth and elegant user interfaces and want to know how web developers create that. The answer is simple: Ajax. You&rsquo;ve probably heard of it, but you&rsquo;ve always wondered &ldquo;What is Ajax&rdquo;? Ajax is simply Asynchronous Javascript and XML. By taking our Ajax course, you can make pages on your web application respond quickly, and with a minimum of screen refreshes.</p><p> With our Ajax course and a little Javascript knowledge you can use Ajax to take database information and store, alter, sort and conditionally format it all on the client side. This minimizes the load on your server and makes your applications respond quickly and without reloading the HTML page. Ajax communicates with the server behind the scenes while your user continues to use your web site, accessing the information they want. Our course will show you numerous Ajax examples and help you become proficient in using Ajax.</p>',
                      1799000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
SELECT *
FROM fn_insert_course('9a3fe19c-eec1-4a02-b19e-55115b3a3c67',
                      'The Complete 2020 Fullstack Web Developer Course',
                      '2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2',
                      'img/courses/9a3fe19c-eec1-4a02-b19e-55115b3a3c67.jpg',
                      'Learn HTML5, CSS3, JavaScript, Python, Wagtail CMS, PHP & MySQL from scratch!',
                      '<p>***</p><p>The Complete FULL STACK Web Developer Course</p><p>&mdash;</p><p>The first &quot;Complete Web Developer Course&quot; on Udemy!! See why other teachers used the same course name!</p><p>This course is for Windows, MacOS and Linux users!</p><p>Over 66 hours of video</p><p>Full lifetime access</p><p>Certificate of completion</p><p>Source code included</p><p>***</p>',
                      2199000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
SELECT *
FROM fn_insert_course('873da5eb-0e3d-4d17-ab72-4ba2634d0383',
                      'Servlets and JSPs Tutorial: Learn Web Applications With Java',
                      '2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2',
                      'img/courses/873da5eb-0e3d-4d17-ab72-4ba2634d0383.jpg',
                      'Learn how to create dynamic websites using the Java programming language with this java web application tutorial',
                      '<p>In this Java web application tutorial I&apos;ll show you how to create dynamic websites using the core technologies of Java web programming. If you want to create your own interactive websites, if you know some Java and you want to take your skills to the next level, or if you want hot skills for the job marketplace, this Java web application tutorial course is for you.</p><p>In this Java web application tutorial course you&apos;ll learn how to:</p><ul><li>Leverage the power of Java to create dynamic websites</li><li>Deploy your applications for free on the Internet</li><li>Use and understand core server-side Java web technologies</li></ul><p>Leverage the power of Java to create dynamic websites Deploy your applications for free on the Internet Use and understand core server-side Java web technologies</p>',
                      1999000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
--
-- Data Science
--
SELECT *
FROM fn_insert_course('6c9e76e3-d99d-4275-90b0-b2e193bd49f9',
                      'Statistics / Data Analysis in SPSS: Inferential Statistics',
                      'c7a94c36-7f71-4443-955f-0f0f9397c5ca',
                      'img/courses/6c9e76e3-d99d-4275-90b0-b2e193bd49f9.jpg',
                      'Increase Your Data Analytic Skills – Highly Valued And Sought After By Employers',
                      '<p><b>Many tests covered, including three different t tests, two ANOVAs, post hoc tests, chi-square tests (great for A/B testing), correlation, and regression. Database management also covered!</b></p><p>Two in-depth examples provided of each test for additional practice.</p><p>This course is great for professionals, as it provides step by step instruction of tests with clear and accurate explanations. Get ahead of the competition and make these tests important parts of your data analytic toolkit!</p>',
                      2199000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
SELECT *
FROM fn_insert_course('49968d73-5d04-43c8-a4ef-ab93ced702b0',
                      'R Level 1 - Data Analytics with R',
                      'c7a94c36-7f71-4443-955f-0f0f9397c5ca',
                      'img/courses/49968d73-5d04-43c8-a4ef-ab93ced702b0.jpg',
                      'Use R for Data Analytics and Data Mining',
                      '<p>Are you new to R?</p><p><i>Do you want to learn more about statistical programming?</i></p><p><i>Are you in a quantitative field?</i></p><p>You just started learning R but you struggle with all the free but unorganized material available elsewhere?</p><p>Do you want to hack the learning curve and stay ahead of your competition?</p><p><b>If your answer is YES to some of those points - read on!</b></p><p>This Tutorial is the first step - your Level 1 - to R mastery.</p>',
                      1699000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
SELECT *
FROM fn_insert_course('a68f0d81-bf4c-4ff4-ba67-7ce1209bcfa4',
                      'Introduction to Natural Language Processing (NLP)',
                      'c7a94c36-7f71-4443-955f-0f0f9397c5ca',
                      'img/courses/a68f0d81-bf4c-4ff4-ba67-7ce1209bcfa4.jpg',
                      'Learn how to analyze text data.',
                      '<p>This course introduces Natural Language Processing through the use of python and the Natural Language Tool Kit. Through a practical approach, you''ll get hands on experience working with and analyzing text.</p><p>As a student of this course, you''ll get updates for free, which include lecture revisions, new code examples, and new data projects.</p>',
                      1699000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
--
-- Mobile Development
--
SELECT *
FROM fn_insert_course('586e6db1-91d7-40b1-b2b3-bb0f3db14729',
                      'Build Android Apps with App Inventor 2 - No Coding Required',
                      'd0336f15-32dd-4146-a814-0c035a769430',
                      'img/courses/586e6db1-91d7-40b1-b2b3-bb0f3db14729.jpg',
                      'Android application,App Inventor 2,Google Play Store,Basic Programming',
                      '<p><b>Build Android Apps with App Inventor 2</b></p><p>Everybody has a great idea for an app. The problem is, not many of those people have the skills or knowledge required to make that idea a reality. Building an app, regardless of its simplicity or platform, requires certain technical know-how like coding, UX/UI design, and more. App Inventor 2, however, cuts through all of the smoke and allows anyone &ndash; even those with no coding experience &ndash; to build Android apps from the ground up. This course will teach you how.</p>',
                      1899000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
SELECT *
FROM fn_insert_course('eb751f9b-1c8f-41f3-a93b-0c284005dde1',
                      'Objective-C Crash Course for Swift Developers',
                      'd0336f15-32dd-4146-a814-0c035a769430',
                      'img/courses/eb751f9b-1c8f-41f3-a93b-0c284005dde1.jpg',
                      'Everything you need to know about modern Objective-C to use it professionally',
                      '<p>This course is designed for iOS developers who only know Swift. In order to get a job as an iOS developer you need to know the basics of Objective-C. Also there are still a ton of libraries and tutorials all written in Objective-C.</p><p><b>This is the BEST Objective-C course out there!</b></p>',
                      1999000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
SELECT *
FROM fn_insert_course('5113e870-bd34-4b92-a546-beea1e50b65c',
                      'The Complete Android S + Java Developer Course',
                      'd0336f15-32dd-4146-a814-0c035a769430',
                      'img/courses/5113e870-bd34-4b92-a546-beea1e50b65c.jpg',
                      'In this course, you''ll learn Android Development and get to build your own Android S apps by using Java.',
                      '<p><b></i>[NOTE: This course includes two courses: a brand new Android S + Java course, as well as my legacy course that contains dozens of hours of app creation.]</i></b></p><p>The main goal of this course is to teach you Android Development and how to build amazing Android S apps (latest version) using its most popular programming language, Java.</p>',
                      1999000,
                      0,
                      1,
                      'd172436b-5020-4b34-8827-6ebd041d5474'
    );
--
-- Communication
--
SELECT *
FROM fn_insert_course('0e4f176e-47c8-462a-bbd5-bc47e11d8a53',
                      'Improve Communication: Speak Smoothly, Clearly & Confidently',
                      '34035f08-a7a5-4bc0-a377-14dc6cb11132',
                      'img/courses/0e4f176e-47c8-462a-bbd5-bc47e11d8a53.jpg',
                      'Learn How You Can Clear Interviews, Express Your Ideas, & Make Presentations Smoothly & Confidently!',
                      '<p>How to Improve Communication Skills (Major Updates Coming Soon!)</p><p>Do you struggle with getting your words out when explaining things in important situations, situations like interviews, presentations, meetings, phone or video conferences? Do you become anxious, nervous tense up, loose track of where you''re at, speak too fast, or even stutter? Do people sometimes have trouble understanding you because English is your second language?</p>',
                      1699000,
                      0,
                      1,
                      '4b78f00e-cde6-4bb5-8877-fffd6adaf046'
    );
SELECT *
FROM fn_insert_course('2c6112d8-d420-4050-ba4b-4db8e0a820b4',
                      'How to Write an Effective Research Paper',
                      '34035f08-a7a5-4bc0-a377-14dc6cb11132',
                      'img/courses/2c6112d8-d420-4050-ba4b-4db8e0a820b4.jpg',
                      'Learn how to write award-winning research papers with easy steps. Includes examples and a research paper template.',
                      '<p>Over the last decade, the expectation for publishing research papers has increased significantly in academia, in professional communities, and in science and technology disciplines worldwide.</p><p>In scientific fields (especially in academia), both graduate students and faculty are expected to publish the results of their research work in journals and conference proceedings</p>',
                      1799000,
                      0,
                      1,
                      '4b78f00e-cde6-4bb5-8877-fffd6adaf046'
    );
--
-- Management
--
SELECT *
FROM fn_insert_course('536345b2-36bb-4074-9dfa-1251c6c9c85b',
                      'Chief Financial Officer Leadership Program',
                      '7373ae3d-76de-43df-8f1a-8bcb1d55d7fa',
                      'img/courses/536345b2-36bb-4074-9dfa-1251c6c9c85b.jpg',
                      'Plan and Confidently Conduct Quality Management System Audits - Auditing Explained in Plain and Simple Language.',
                      '<p>Are you a financial professional working in industry looking to get more out of your career?</p><p>Do you have what it takes to sit at the boardroom table at your company and contribute?</p><p>Do you want to take what you know about the numbers side of the business and make a greater contribution at the highest levels?</p>',
                      1999000,
                      0,
                      1,
                      '4b78f00e-cde6-4bb5-8877-fffd6adaf046'
    );
SELECT *
FROM fn_insert_course('8574a109-0cd0-40a0-856f-a9d0f00a248e',
                      'QMS Auditor / Lead Auditor Course',
                      '7373ae3d-76de-43df-8f1a-8bcb1d55d7fa',
                      'img/courses/8574a109-0cd0-40a0-856f-a9d0f00a248e.jpg',
                      'Plan and Confidently Conduct Quality Management System Audits - Auditing Explained in Plain and Simple Language.',
                      '<p>In this QMS Auditor/Lead Auditor Course, you will learn auditing skills through short and easy-to-understand video lessons and quizzes.</p>',
                      2199000,
                      0,
                      1,
                      '4b78f00e-cde6-4bb5-8877-fffd6adaf046'
    );
--
-- Sales
--
SELECT *
FROM fn_insert_course('5928419e-5dac-4bec-b4b5-9ae6c9397ce5',
                      'How to Budget and Forecast for Your Business',
                      '368bb3a8-d00d-41a7-a865-dd4ff2cc3d0f',
                      'img/courses/5928419e-5dac-4bec-b4b5-9ae6c9397ce5.jpg',
                      'by Tim Berry, Business Planning Expert',
                      '<p>In this QMS Auditor/Lead Auditor Course, you will learn auditing skills through short and easy-to-understand video lessons and quizzes.</p>',
                      1699000,
                      0,
                      1,
                      '4b78f00e-cde6-4bb5-8877-fffd6adaf046'
    );
SELECT *
FROM fn_insert_course('09e0b3af-098c-49d5-9c41-0b48e64c8686',
                      'Sales and Persuasion Skills for Startups',
                      '368bb3a8-d00d-41a7-a865-dd4ff2cc3d0f',
                      'img/courses/09e0b3af-098c-49d5-9c41-0b48e64c8686.jpg',
                      'The entrepreneur''s sure guide to getting a Yes',
                      '<p>Start-ups and entrepreneurs are a mixed bunch. But one thing the winners all have in common Is &ndash; the ability to influence others. The ability to sell their ideas, sell their products, sell their service.</p><p>And the graveyard of business startups is littered with companies that failed to grasp that most important, essential skill - the art of persuasion.</p><p>That''s what this course delivers in spades. The ability to get people to say ''YES''.</p>',
                      1899000,
                      0,
                      1,
                      '4b78f00e-cde6-4bb5-8877-fffd6adaf046'
    );
--
-- Digital Marketing | e3c0fac4-ef74-4d93-a726-f3ca38a5f977
--
SELECT *
FROM fn_insert_course('dbc490ff-9031-4d32-9737-95eac69bce06',
                      'Digital Marketing: How to Generate Sales Leads',
                      'e3c0fac4-ef74-4d93-a726-f3ca38a5f977',
                      'img/courses/dbc490ff-9031-4d32-9737-95eac69bce06.jpg',
                      'Learn How To Generate Leads With A Step-By-Step Workbook & Action Plan To Boost Your Sales in 2019',
                      '<p>Want To Generate More Sales For You Business?</p><p>Who doesn''t, right? With a proven step-by-step guide that''s turned my own business from a bedroom start up to a &pound;480,000+ agency (see the proof lesson below), YOU CAN TOO! If you''re ready for hard work that delivers proven results, then read on...</p>',
                      1699000,
                      0,
                      1,
                      '75d689e1-aaef-4fc7-82b3-6fb29aa53128'
    );
SELECT *
FROM fn_insert_course('0c2a2203-ca14-4a9e-9136-ead83e09fb9d',
                      'Digital Advertising and Marketing 101: The Complete Guide',
                      'e3c0fac4-ef74-4d93-a726-f3ca38a5f977',
                      'img/courses/0c2a2203-ca14-4a9e-9136-ead83e09fb9d.jpg',
                      'Top Digital Marketing Course | Facebook Ads, Google/YouTube, Display/Video & more|Grow your career (German/Portuguese)',
                      '<p>Are you ready to learn about the world of Digital Marketing &amp; Digital Advertising? Are you ready to learn about the hundreds of companies outside of Google and Facebook which control ads you see on your computer, phones, and tablets? Are you ready to understand the terms, pricing models, ad units, and everything else you need to succeed in the digital advertising space? Then you&rsquo;re at the right place!</p><p>I have 10+ years experience in the digital marketing industry, ranging from small businesses in upstate NY, to major advertisers, out of NYC based ad agencies, and on the mobile and tech side of the business, splitting my time between New York and Silicon Valley. The advertisers I work with are both national and international brands ranging from entertainment, fashion, liquor, government agencies and more.</p>',
                      1999000,
                      0,
                      1,
                      '75d689e1-aaef-4fc7-82b3-6fb29aa53128'
    );
--
-- Product Marketing | 4435fea4-583f-450f-be7a-39cf8818eef2
--
SELECT *
FROM fn_insert_course('62eeef5f-616d-4486-b2d8-12cbd2ee89a5',
                      'Bestseller Book Marketing: Amazon Kindle KDP Self-Publishing',
                      '4435fea4-583f-450f-be7a-39cf8818eef2',
                      'img/courses/62eeef5f-616d-4486-b2d8-12cbd2ee89a5.jpg',
                      '2023 Amazon book marketing & Kindle KDP self-publishing! Paperback books & Kindle (KDP) ebooks. Amazon Kindle KDP sales!',
                      '<p>Brand yourself like a million bucks for the rest of your career by making yourself an Amazon and Kindle bestselling author using 100% legitimate book marketing techniques.</p>',
                      1999000,
                      0,
                      1,
                      '75d689e1-aaef-4fc7-82b3-6fb29aa53128'
    );
SELECT *
FROM fn_insert_course('f2040760-dbb0-4cb0-9354-a4b6ea3ada28',
                      'B2B Sales, LinkedIn Lead Generation & Cold Email Sales',
                      '4435fea4-583f-450f-be7a-39cf8818eef2',
                      'img/courses/f2040760-dbb0-4cb0-9354-a4b6ea3ada28.jpg',
                      'Business to business high ticket sales and marketing. Generate leads, sell to big companies, and win large deals',
                      '<p>Learn to make high ticket sales to businesses, organizations, universities, and non-profits.</p><p>You will learn how to build out a sales team, how to do outside sales and inside sales, how to structure your pitch, how to get sales from cold calling and cold email, and how to carry on the sales conversation to close the sale.</p><p>This course has two instructors. The first instructor is Jeremiah Boehner. He is the #1 salesperson at his company and has over 5 years of sales experience.</p><p>Alex Genadinik is the second instructor, and he will teach you how to sell using social media and SEO.</p>',
                      1699000,
                      0,
                      1,
                      '75d689e1-aaef-4fc7-82b3-6fb29aa53128'
    );

