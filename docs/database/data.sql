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




