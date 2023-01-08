-- Categories
-- Level 1
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('9f3d296a-e139-4ba7-8c17-5cd34ae03c8d', null, 'Development');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('7b8faed9-ea6e-4fcf-82f7-2b5cf5e89332', null, 'Business');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('2d1ffcbe-b834-490d-be06-827c0711634e', null, 'Marketing');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('5e11eae9-14d4-4442-8272-e78c072850e8', null, 'Design');
--
-- Level 2
--
-- Development '9f3d296a-e139-4ba7-8c17-5cd34ae03c8d'
--
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2', '9f3d296a-e139-4ba7-8c17-5cd34ae03c8d', 'Web Development');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('c7a94c36-7f71-4443-955f-0f0f9397c5ca', '9f3d296a-e139-4ba7-8c17-5cd34ae03c8d', 'Data science');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('d0336f15-32dd-4146-a814-0c035a769430', '9f3d296a-e139-4ba7-8c17-5cd34ae03c8d', 'Mobile Development');
-- Business '7b8faed9-ea6e-4fcf-82f7-2b5cf5e89332'
--
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('34035f08-a7a5-4bc0-a377-14dc6cb11132', '7b8faed9-ea6e-4fcf-82f7-2b5cf5e89332', 'Communication');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('7373ae3d-76de-43df-8f1a-8bcb1d55d7fa', '7b8faed9-ea6e-4fcf-82f7-2b5cf5e89332', 'Management');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('368bb3a8-d00d-41a7-a865-dd4ff2cc3d0f', '7b8faed9-ea6e-4fcf-82f7-2b5cf5e89332', 'Sales');
-- Marketing '2d1ffcbe-b834-490d-be06-827c0711634e'
--
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('e3c0fac4-ef74-4d93-a726-f3ca38a5f977', '2d1ffcbe-b834-490d-be06-827c0711634e', 'Digital Marketing');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('4435fea4-583f-450f-be7a-39cf8818eef2', '2d1ffcbe-b834-490d-be06-827c0711634e', 'Product Marketing');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('aaf89c2a-0966-4c15-a703-d301d336b7ba', '2d1ffcbe-b834-490d-be06-827c0711634e', 'Other Marketing');
-- Design '5e11eae9-14d4-4442-8272-e78c072850e8'
--
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('8c7f2c72-57fa-4d63-aa4b-a66d5724e2f5', '5e11eae9-14d4-4442-8272-e78c072850e8', 'Web Design');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('2a738822-e07a-492d-80aa-74b327a08600', '5e11eae9-14d4-4442-8272-e78c072850e8', 'Game Design');
INSERT INTO categories (category_id, category_parent, category_title)
VALUES ('7139f8b2-02c6-47cf-9028-19d3f6511e96', '5e11eae9-14d4-4442-8272-e78c072850e8', 'Architectural Design');