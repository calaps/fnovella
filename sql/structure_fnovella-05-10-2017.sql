CREATE TABLE app_user
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    first_name VARCHAR(20),
    second_name VARCHAR(20),
    first_lastname VARCHAR(20),
    second_lastname VARCHAR(20),
    privilege INT,
    document_type VARCHAR(20),
    document_value VARCHAR(40),
    nationality VARCHAR(30),
    department VARCHAR(20),
    profession VARCHAR(20),
    address VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    municipality VARCHAR(20),
    comunity VARCHAR(20),
    phone INT,
    cellphone INT,
    cempro_code VARCHAR(40),
    app_code VARCHAR(60),
    gender VARCHAR(10),
    born_date DATETIME,
    CONSTRAINT user_privileges_fk FOREIGN KEY (privilege) REFERENCES user_privileges (id)
);
CREATE TABLE app_user_session
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    id_app_user INT NOT NULL,
    token VARCHAR(50) NOT NULL,
    CONSTRAINT FK__app_user___id_ap__3C34F16F FOREIGN KEY (id_app_user) REFERENCES app_user (id)
);
CREATE TABLE catalog
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    type VARCHAR(50),
    category VARCHAR(50)
);
CREATE UNIQUE INDEX catalog_id_uindex ON catalog (id);
CREATE TABLE catalog_relation
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    id_program INT,
    id_catalog INT,
    CONSTRAINT catalog_relation_program_id_fk FOREIGN KEY (id_program) REFERENCES program (id),
    CONSTRAINT catalog_relation_catalog_id_fk FOREIGN KEY (id_catalog) REFERENCES catalog (id)
);
CREATE UNIQUE INDEX catalog_relation_id_uindex ON catalog_relation (id);
CREATE TABLE catalog_relation_student
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    id_participant INT,
    id_catalog INT,
    value VARCHAR(100),
    CONSTRAINT catalog_relation_student_participant_id_fk FOREIGN KEY (id_participant) REFERENCES participant (id),
    CONSTRAINT catalog_relation_student_catalog_id_fk FOREIGN KEY (id_catalog) REFERENCES catalog (id)
);
CREATE UNIQUE INDEX catalog_relation_student_id_uindex ON catalog_relation_student (id);
CREATE TABLE course
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    program VARCHAR(50),
    location INT,
    description VARCHAR(140),
    open_course BIT,
    grade INT,
    CONSTRAINT course_grade_id_fk FOREIGN KEY (grade) REFERENCES grade (id)
);
CREATE UNIQUE INDEX course_id_uindex ON course (id);
CREATE TABLE evaluation
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    item CHAR(50),
    subject CHAR(50),
    practice CHAR(50),
    column_5 INT
);
CREATE UNIQUE INDEX evaluation_id_uindex ON evaluation (id);
CREATE TABLE grade
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    level VARCHAR(50),
    location INT,
    description VARCHAR(140)
);
CREATE UNIQUE INDEX general_data_id_uindex ON grade (id);
CREATE TABLE inscriptions_inst_course
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    instructor_id INT,
    status VARCHAR(10),
    period INT,
    year INT,
    course_id INT,
    CONSTRAINT instructor_inscriptions_instructor_id_fk FOREIGN KEY (instructor_id) REFERENCES instructor (id),
    CONSTRAINT inscriptions_inst_course_course_id_fk FOREIGN KEY (course_id) REFERENCES course (id)
);
CREATE UNIQUE INDEX instructor_inscriptions_id_uindex ON inscriptions_inst_course (id);
CREATE TABLE inscriptions_inst_grade
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    instructor_id INT,
    status VARCHAR(50),
    period INT,
    year INT,
    grade_id INT,
    CONSTRAINT inscriptions_inst_grade_instructor_id_fk FOREIGN KEY (instructor_id) REFERENCES instructor (id),
    CONSTRAINT inscriptions_inst_grade_grade_id_fk FOREIGN KEY (grade_id) REFERENCES grade (id)
);
CREATE UNIQUE INDEX inscriptions_inst_grade_id_uindex ON inscriptions_inst_grade (id);
CREATE TABLE inscriptions_inst_workshop
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    instructor_id INT,
    status VARCHAR(10),
    period INT,
    year INT,
    workshop_id INT,
    CONSTRAINT inscriptions_inst_workshop_instructor_id_fk FOREIGN KEY (instructor_id) REFERENCES instructor (id),
    CONSTRAINT inscriptions_inst_workshop_workshop_id_fk FOREIGN KEY (workshop_id) REFERENCES workshop (id)
);
CREATE UNIQUE INDEX inscriptions_inst_workshop_id_uindex ON inscriptions_inst_workshop (id);
CREATE TABLE inscriptions_part_course
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    participant_id INT,
    status INT,
    period INT,
    year INT,
    course_id INT,
    group_id VARCHAR(20),
    CONSTRAINT inscriptions_part_course_participant_id_fk FOREIGN KEY (participant_id) REFERENCES participant (id),
    CONSTRAINT inscriptions_part_course_course_id_fk FOREIGN KEY (course_id) REFERENCES course (id)
);
CREATE UNIQUE INDEX inscriptions_part_course_id_uindex ON inscriptions_part_course (id);
CREATE TABLE inscriptions_part_grade
(
    id INT PRIMARY KEY NOT NULL,
    participant_id INT,
    status INT,
    period INT,
    year INT,
    grade_id INT,
    group_id VARCHAR(20),
    CONSTRAINT inscriptions_part_grade_participant_id_fk FOREIGN KEY (participant_id) REFERENCES participant (id),
    CONSTRAINT inscriptions_part_grade_grade_id_fk FOREIGN KEY (grade_id) REFERENCES grade (id)
);
CREATE UNIQUE INDEX inscriptions_part_grade_id_uindex ON inscriptions_part_grade (id);
CREATE TABLE inscriptions_part_workshop
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    participant_id INT,
    status VARCHAR(10),
    period INT,
    year INT,
    workshop_id INT,
    group_id VARCHAR(20),
    CONSTRAINT inscriptions_part_workshop_participant_id_fk FOREIGN KEY (participant_id) REFERENCES participant (id),
    CONSTRAINT inscriptions_part_workshop_workshop_id_fk FOREIGN KEY (workshop_id) REFERENCES workshop (id)
);
CREATE UNIQUE INDEX inscriptions_part_workshop_id_uindex ON inscriptions_part_workshop (id);
CREATE TABLE instructor
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    first_name VARCHAR(50),
    second_name VARCHAR(50),
    first_lastname VARCHAR(50),
    second_lastname VARCHAR(50),
    born_date DATETIME,
    document_type VARCHAR(50),
    document_value VARCHAR(50),
    nacionality VARCHAR(50),
    department VARCHAR(50),
    municipality VARCHAR(50),
    community VARCHAR(50),
    profession VARCHAR(50),
    address VARCHAR(50),
    phone INT,
    cellphone INT,
    email VARCHAR(50),
    app_code VARCHAR(50),
    gender VARCHAR(10)
);
CREATE TABLE location
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    address VARCHAR(50),
    alias VARCHAR(50)
);
CREATE UNIQUE INDEX location_id_uindex ON location (id);
CREATE TABLE participant
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    first_name VARCHAR(50),
    second_name VARCHAR(50),
    first_lastname VARCHAR(50),
    second_lastname VARCHAR(50),
    born_date DATETIME,
    document_type VARCHAR(50),
    document_value VARCHAR(50),
    nacionality VARCHAR(50),
    department VARCHAR(50),
    municipality VARCHAR(50),
    community VARCHAR(50),
    profession VARCHAR(50),
    address VARCHAR(50),
    phone INT,
    cell_phone INT,
    email VARCHAR(50),
    app_code VARCHAR(60),
    gender VARCHAR(10)
);
CREATE UNIQUE INDEX participant_id_uindex ON participant (id);
CREATE TABLE participant_contacts
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    first_name VARCHAR(20),
    second_name VARCHAR(20),
    first_lastname VARCHAR(20),
    second_lastname VARCHAR(20),
    document_type VARCHAR(15),
    document_value VARCHAR(50),
    tellphone INT,
    cellphone INT,
    email VARCHAR(50),
    address VARCHAR(100),
    participant_id INT,
    CONSTRAINT participant_contacts_participant_id_fk FOREIGN KEY (participant_id) REFERENCES participant (id)
);
CREATE TABLE program
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    type BIT,
    audience VARCHAR(50),
    description VARCHAR(50),
    provider BIT,
    clasification VARCHAR(50),
    free_courses BIT
);
CREATE UNIQUE INDEX program_id_uindex ON program (id);
CREATE TABLE program_activation
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    program_id INT,
    cal_periods_grade VARCHAR(20),
    cal_periods_course VARCHAR(20),
    cal_periods_workshop VARCHAR(20),
    responsable INT,
    evaluation_structure VARCHAR(20),
    satisfaction_structure VARCHAR(20),
    monitoring_structure VARCHAR(20),
    location INT,
    free_courses BIT,
    temporality INT,
    year INT,
    activation_status BIT,
    number_sessions INT,
    CONSTRAINT program_activation_program_id_fk FOREIGN KEY (program_id) REFERENCES program (id),
    CONSTRAINT program_activation_instructor_id_fk FOREIGN KEY (responsable) REFERENCES instructor (id),
    CONSTRAINT program_activation_location_id_fk FOREIGN KEY (location) REFERENCES location (id)
);
CREATE UNIQUE INDEX program_activation_id_uindex ON program_activation (id);
CREATE TABLE satisfaction
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    description CHAR(50),
    column_3 INT
);
CREATE UNIQUE INDEX satisfaction_id_uindex ON satisfaction (id);
CREATE TABLE test
(
    test1 INT
);
CREATE TABLE user_privileges
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    privilege_name VARCHAR(20),
    p_program_activation BIT,
    p_students_entry BIT,
    p_student_inscription BIT,
    p_student_approval BIT,
    p_notes_entry BIT,
    p_notes_visualization BIT,
    p_assistance_entry BIT,
    p_assistance_visualization BIT,
    p_evaluation_entry BIT,
    p_evaluation_visualization BIT,
    p_monitoring_entry BIT,
    p_monitoring_visualization BIT,
    p_indicators_visualization BIT,
    p_indicators_p_visualization BIT,
    p_information_visualization BIT,
    p_information_entry BIT,
    p_programs_visualization BIT,
    p_indicators_r_visualization BIT,
    p_indicators_d_visualization BIT,
    p_indicators_g_visualization BIT,
    p_structure_entry BIT,
    p_catalogs_entry BIT,
    p_personal_entry BIT,
    p_personal_evaluation_entry BIT,
    p_personal_pass_entry BIT,
    p_personal_data_entry BIT
);
CREATE TABLE workshop
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    program VARCHAR(50),
    location INT,
    description VARCHAR(140)
);
CREATE UNIQUE INDEX workshop_id_uindex ON workshop (id);