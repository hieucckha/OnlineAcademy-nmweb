SET check_function_bodies = false;

CREATE TABLE categories(
  category_id char(36) NOT NULL,
  category_parent char(36),
  category_title varchar(50),
  CONSTRAINT categories_pkey PRIMARY KEY(category_id)
);

CREATE TABLE sections(
  section_id char(36) NOT NULL,
  section_title varchar(50),
  course_id char(36) NOT NULL,
  CONSTRAINT sections_pkey PRIMARY KEY(section_id)
);

CREATE TABLE courses(
  course_id char(36) NOT NULL,
  course_title varchar(100) NOT NULL,
  category_id char(36) NOT NULL,
  image varchar(100),
  b_description varchar(50),
  description varchar(255),
  price integer,
  discount integer,
  status integer,
  rating float4,
  num_student_enroll integer,
  num_student_rating integer,
  create_by char(36) NOT NULL,
  create_at timestamp,
  update_at timestamp,
  CONSTRAINT courses_pkey PRIMARY KEY(course_id)
);

CREATE TABLE enrollments(
  user_id char(36) NOT NULL,
  course_id char(36) NOT NULL,
  enroll_date date,
  status integer,
  rating float4,
  "comment" varchar(255),
  CONSTRAINT enrollments_pkey PRIMARY KEY(user_id, course_id)
);

CREATE TABLE lectures(
  lecture_id char(36) NOT NULL,
  section_id char(36) NOT NULL,
  video_title varchar(100),
  video_description varchar(255),
  source varchar(100),
  is_preview boolean DEFAULT false,
  CONSTRAINT lectures_pkey PRIMARY KEY(lecture_id)
);

CREATE TABLE users(
  user_id char(36) NOT NULL,
  email varchar(50) NOT NULL,
  phone_number varchar(11) NOT NULL,
  "password" char(60) NOT NULL,
  "type" integer NOT NULL,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  avatar varchar(100),
  caption varchar(100),
  biography varchar(255),
  website varchar(100),
  "language" varchar(20),
  CONSTRAINT users_pkey PRIMARY KEY(user_id)
);

CREATE TABLE watch_list(
user_id char(36) NOT NULL, course_id char(36) NOT NULL,
  CONSTRAINT watch_list_pkey PRIMARY KEY(user_id, course_id)
);




CREATE TABLE watch_status(
  user_id char(36) NOT NULL,
  lecture_id char(36) NOT NULL,
  status integer,
  CONSTRAINT watch_status_pkey PRIMARY KEY(user_id, lecture_id)
);

COMMENT ON COLUMN watch_status.status IS 'from 0 to 100';

CREATE TABLE view_number(
  course_id char(36) NOT NULL,
  date date NOT NULL,
  num_view integer DEFAULT 0,
  CONSTRAINT view_number_pkey PRIMARY KEY(course_id, date)
);

ALTER TABLE categories
  ADD CONSTRAINT categories_fkey
    FOREIGN KEY (category_parent) REFERENCES categories (category_id);

ALTER TABLE sections
  ADD CONSTRAINT sections_course_id_fkey
    FOREIGN KEY (course_id) REFERENCES courses (course_id);

ALTER TABLE courses
  ADD CONSTRAINT courses_category_id_fkey
    FOREIGN KEY (category_id) REFERENCES categories (category_id);

ALTER TABLE enrollments
  ADD CONSTRAINT enrollments_course_id_fkey
    FOREIGN KEY (course_id) REFERENCES courses (course_id);

ALTER TABLE enrollments
  ADD CONSTRAINT enrollments_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE lectures
  ADD CONSTRAINT lectures_section_id_fkey
    FOREIGN KEY (section_id) REFERENCES sections (section_id);

ALTER TABLE watch_list
  ADD CONSTRAINT watch_list_course_id_fkey
    FOREIGN KEY (course_id) REFERENCES courses (course_id);

ALTER TABLE watch_list
  ADD CONSTRAINT watch_list_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users (user_id);


ALTER TABLE courses
  ADD CONSTRAINT courses_create_by_fkey
    FOREIGN KEY (create_by) REFERENCES users (user_id);

ALTER TABLE watch_status
  ADD CONSTRAINT watch_status_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE watch_status
  ADD CONSTRAINT watch_status_lecture_id_fkey
    FOREIGN KEY (lecture_id) REFERENCES lectures (lecture_id);

ALTER TABLE view_number
  ADD CONSTRAINT view_number_course_id_fkey
    FOREIGN KEY (course_id) REFERENCES courses (course_id);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
