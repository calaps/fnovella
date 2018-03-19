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
    colony VARCHAR(50),
    zone VARCHAR(50),
    CONSTRAINT user_privileges_fk FOREIGN KEY (privilege) REFERENCES user_privileges (id)
);
CREATE TABLE app_user_session
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    token VARCHAR(50) NOT NULL,
    is_app_user BIT DEFAULT 1,
    id_app_user INT
);
CREATE TABLE assistance
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    inscription INT,
    session INT,
    date DATE,
    status BIT,
    month INT,
    CONSTRAINT assistance_inscriptions_id_fk FOREIGN KEY (inscription) REFERENCES inscriptions (id)
);
CREATE UNIQUE INDEX assistance_id_uindex ON assistance (id);
CREATE TABLE assistance_participant
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    assistance INT,
    participant INT,
    value INT,
    CONSTRAINT assistance_participant_assistance_id_fk FOREIGN KEY (assistance) REFERENCES assistance (id),
    CONSTRAINT assistance_participant_participant_id_fk FOREIGN KEY (participant) REFERENCES participant (id)
);
CREATE UNIQUE INDEX assistance_participant_id_uindex ON assistance_participant (id);
CREATE TABLE catalog
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    type VARCHAR(50),
    category INT,
    CONSTRAINT catalog_category_id_fk FOREIGN KEY (category) REFERENCES category (id)
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
CREATE TABLE category
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    description VARCHAR(180),
    aditional_field BIT DEFAULT 0
);
CREATE UNIQUE INDEX category_id_uindex ON category (id);
CREATE TABLE course
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    program VARCHAR(50),
    location INT,
    description VARCHAR(140),
    open_course BIT,
    grade INT,
    program_id INT,
    instructor_id INT,
    created_group BIT DEFAULT 0,
    section INT,
    CONSTRAINT course_location_id_fk FOREIGN KEY (location) REFERENCES location (id),
    CONSTRAINT course_grade_id_fk FOREIGN KEY (grade) REFERENCES grade (id),
    CONSTRAINT course_program_id_fk FOREIGN KEY (program_id) REFERENCES program (id),
    CONSTRAINT course_instructor_id_fk FOREIGN KEY (instructor_id) REFERENCES instructor (id),
    CONSTRAINT course_section_id_fk FOREIGN KEY (section) REFERENCES section (id)
);
CREATE UNIQUE INDEX course_id_uindex ON course (id);
CREATE TABLE division
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    programa INT,
    location INT,
    created_group BIT DEFAULT 0,
    CONSTRAINT division_program_id_fk FOREIGN KEY (programa) REFERENCES program (id),
    CONSTRAINT division_location_id_fk FOREIGN KEY (location) REFERENCES location (id)
);
CREATE UNIQUE INDEX division_id_uindex ON division (id);
CREATE TABLE evaluation
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    [group] INT,
    session INT,
    evaluation_type INT,
    evaluation_subType INT,
    date_start DATE,
    date_end DATE,
    range INT,
    CONSTRAINT evaluation_group_id_fk FOREIGN KEY ([group]) REFERENCES [group] (id),
    CONSTRAINT evaluation_evaluation_type_id_fk FOREIGN KEY (evaluation_type) REFERENCES evaluation_type (id),
    CONSTRAINT evaluation_evaluation_subType_id_fk FOREIGN KEY (evaluation_subType) REFERENCES evaluation_subType (id),
    CONSTRAINT evaluation_evaluation_range_id_fk FOREIGN KEY (range) REFERENCES evaluation_range (id)
);
CREATE UNIQUE INDEX evaluation_id_uindex ON evaluation (id);
CREATE TABLE evaluation_activity
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    evaluation INT,
    name VARCHAR(50),
    range INT,
    parent_id INT,
    percentage INT,
    CONSTRAINT evaluation_activity_evaluation_id_fk FOREIGN KEY (evaluation) REFERENCES evaluation (id),
    CONSTRAINT evaluation_activity_evaluation_range_id_fk FOREIGN KEY (range) REFERENCES evaluation_range (id)
);
CREATE UNIQUE INDEX evaluation_activity_id_uindex ON evaluation_activity (id);
CREATE TABLE evaluation_activity_instructor
(
    id INT,
    instructor INT,
    activity INT,
    grade_inital INT,
    grade_final INT,
    CONSTRAINT evaluation_activity_instructor_instructor_id_fk FOREIGN KEY (instructor) REFERENCES instructor (id),
    CONSTRAINT evaluation_activity_instructor_evaluation_activity_id_fk FOREIGN KEY (activity) REFERENCES evaluation_activity (id)
);
CREATE TABLE evaluation_activity_participant
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    participant INT,
    activity INT,
    grade_inital INT,
    grade_final INT,
    CONSTRAINT evaluation_activity_participant_participant_id_fk FOREIGN KEY (participant) REFERENCES participant (id),
    CONSTRAINT evaluation_activity_participant_evaluation_activity_id_fk FOREIGN KEY (activity) REFERENCES evaluation_activity (id)
);
CREATE UNIQUE INDEX evaluation_activity_participant_id_uindex ON evaluation_activity_participant (id);
CREATE TABLE [evaluation_activity_participant-intructor]
(
    id INT,
    participant INT,
    intructor INT,
    activity INT,
    grade_initial INT,
    grade_final INT,
    CONSTRAINT [evaluation_activity_participant-intructor_participant_id_fk] FOREIGN KEY (participant) REFERENCES participant (id),
    CONSTRAINT [evaluation_activity_participant-intructor_instructor_id_fk] FOREIGN KEY (intructor) REFERENCES instructor (id),
    CONSTRAINT [evaluation_activity_participant-intructor_evaluation_activity_id_fk] FOREIGN KEY (activity) REFERENCES evaluation_activity (id)
);
CREATE TABLE evaluation_range
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    min INT,
    max INT
);
CREATE UNIQUE INDEX evaluation_range_id_uindex ON evaluation_range (id);
CREATE TABLE evaluation_subType
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50)
);
CREATE UNIQUE INDEX evaluation_subType_id_uindex ON evaluation_subType (id);
CREATE TABLE evaluation_type
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50)
);
CREATE UNIQUE INDEX evaluation_type_id_uindex ON evaluation_type (id);
CREATE TABLE grade
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    level VARCHAR(50),
    location INT,
    description VARCHAR(140),
    program_id INT,
    instructor_id INT,
    CONSTRAINT grade_location_id_fk FOREIGN KEY (location) REFERENCES location (id),
    CONSTRAINT grade_program_id_fk FOREIGN KEY (program_id) REFERENCES program (id),
    CONSTRAINT grade_instructor_id_fk FOREIGN KEY (instructor_id) REFERENCES instructor (id)
);
CREATE UNIQUE INDEX general_data_id_uindex ON grade (id);
CREATE TABLE [group]
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    type_category VARCHAR(50),
    type INT,
    correlativo VARCHAR(60),
    course_id INT,
    workshop_id INT,
    division_id INT,
    instructor INT,
    free_course BIT DEFAULT 0,
    section INT,
    inscriptions_start DATE,
    inscriptions_end DATE,
    ns_jan INT,
    ns_feb INT,
    ns_mar INT,
    ns_apr INT,
    ns_may INT,
    ns_jun INT,
    ns_jul INT,
    ns_aug INT,
    ns_sep INT,
    ns_oct INT,
    ns_nov INT,
    ns_dec INT,
    CONSTRAINT group_course_id_fk FOREIGN KEY (course_id) REFERENCES course (id),
    CONSTRAINT group_workshop_id_fk FOREIGN KEY (workshop_id) REFERENCES workshop (id),
    CONSTRAINT group_division_id_fk FOREIGN KEY (division_id) REFERENCES division (id),
    CONSTRAINT group_instructor_id_fk FOREIGN KEY (instructor) REFERENCES instructor (id),
    CONSTRAINT group_section_id_fk FOREIGN KEY (section) REFERENCES section (id)
);
CREATE UNIQUE INDEX group_id_uindex ON [group] (id);
CREATE TABLE inscriptions
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    period INT,
    year INT,
    status INT DEFAULT 0,
    [group] INT,
    CONSTRAINT inscriptions_group_id_fk FOREIGN KEY ([group]) REFERENCES [group] (id)
);
CREATE UNIQUE INDEX inscriptions_id_uindex ON inscriptions (id);
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
CREATE TABLE inscriptions_participants
(
    inscription INT,
    participant INT,
    id INT PRIMARY KEY NOT NULL IDENTITY,
    CONSTRAINT inscription_participant_inscriptions_id_fk FOREIGN KEY (inscription) REFERENCES inscriptions (id),
    CONSTRAINT inscription_participant_participant_id_fk FOREIGN KEY (participant) REFERENCES participant (id)
);
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
    gender VARCHAR(10),
    password VARCHAR(70),
    colony VARCHAR(50),
    zone VARCHAR(50),
    privilege INT DEFAULT 4,
    CONSTRAINT instructor_user_privileges_id_fk FOREIGN KEY (privilege) REFERENCES user_privileges (id)
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
    gender VARCHAR(10),
    zone VARCHAR(50),
    colony VARCHAR(50)
);
CREATE UNIQUE INDEX participant_id_uindex ON participant (id);
CREATE TABLE participant_aditional_fields
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    [group] INT,
    participant INT,
    catalog INT,
    period INT,
    year INT,
    CONSTRAINT participant_aditional_fields_group_id_fk FOREIGN KEY ([group]) REFERENCES [group] (id),
    CONSTRAINT participant_aditional_fields_participant_id_fk FOREIGN KEY (participant) REFERENCES participant (id),
    CONSTRAINT participant_aditional_fields_catalog_id_fk FOREIGN KEY (catalog) REFERENCES catalog (id)
);
CREATE UNIQUE INDEX participant_aditional_fields_id_uindex ON participant_aditional_fields (id);
CREATE TABLE participant_aditional_fields_values
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    aditional_field_id INT,
    intial_value VARCHAR(50),
    final_value VARCHAR(50),
    CONSTRAINT participant_aditional_fields_values_participant_aditional_fields_id_fk FOREIGN KEY (aditional_field_id) REFERENCES participant_aditional_fields (id)
);
CREATE UNIQUE INDEX participant_aditional_fields_values_id_uindex ON participant_aditional_fields_values (id);
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
    photo BIT,
    CONSTRAINT participant_contacts_participant_id_fk FOREIGN KEY (participant_id) REFERENCES participant (id)
);
CREATE TABLE program
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(50),
    type VARCHAR(50),
    audience VARCHAR(50),
    description VARCHAR(50),
    provider BIT,
    clasification VARCHAR(50),
    free_courses BIT,
    activation_status BIT DEFAULT 0,
    gender_audience VARCHAR(50),
    category INT,
    gender VARCHAR(10),
    audience_min INT,
    audience_max INT,
    implementation_location VARCHAR(50),
    responsable INT,
    evaluation_type VARCHAR(50),
    months_total INT,
    evaluation_period INT,
    evaluation_performmance BIT DEFAULT 0,
    indicators_evaluation BIT DEFAULT 0,
    indicators_performmance BIT DEFAULT 0,
    indicators_satisfaction BIT DEFAULT 0,
    CONSTRAINT program_category_id_fk FOREIGN KEY (category) REFERENCES category (id),
    CONSTRAINT program_app_user_id_fk FOREIGN KEY (responsable) REFERENCES app_user (id)
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
    ns_jan INT,
    ns_feb INT,
    ns_mar INT,
    ns_apr INT,
    ns_may INT,
    ns_jun INT,
    ns_jul INT,
    ns_aug INT,
    ns_sep INT,
    ns_oct INT,
    ns_nov INT,
    ns_dec INT,
    CONSTRAINT program_activation_program_id_fk FOREIGN KEY (program_id) REFERENCES program (id),
    CONSTRAINT program_activation_instructor_id_fk FOREIGN KEY (responsable) REFERENCES instructor (id),
    CONSTRAINT program_activation_location_id_fk FOREIGN KEY (location) REFERENCES location (id)
);
CREATE UNIQUE INDEX program_activation_id_uindex ON program_activation (id);
CREATE TABLE program_aditional_fields
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    program INT,
    category INT,
    CONSTRAINT program_aditional_fields_program_id_fk FOREIGN KEY (program) REFERENCES program (id),
    CONSTRAINT program_aditional_fields_category_id_fk FOREIGN KEY (category) REFERENCES category (id)
);
CREATE UNIQUE INDEX program_aditional_fields_id_uindex ON program_aditional_fields (id);
CREATE TABLE program_app_user
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    program INT,
    app_user INT,
    CONSTRAINT program_app_user_program_id_fk FOREIGN KEY (program) REFERENCES program (id),
    CONSTRAINT program_app_user_app_user_id_fk FOREIGN KEY (app_user) REFERENCES app_user (id)
);
CREATE UNIQUE INDEX program_app_user_id_uindex ON program_app_user (id);
CREATE TABLE program_instructor
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    program INT,
    instructor INT,
    CONSTRAINT program_instructor_program_id_fk FOREIGN KEY (program) REFERENCES program (id),
    CONSTRAINT program_instructor_instructor_id_fk FOREIGN KEY (instructor) REFERENCES instructor (id)
);
CREATE UNIQUE INDEX program_instructor_id_uindex ON program_instructor (id);
CREATE TABLE program_location
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    program INT,
    location INT,
    CONSTRAINT program_location_program_id_fk FOREIGN KEY (program) REFERENCES program (id),
    CONSTRAINT program_location_location_id_fk FOREIGN KEY (location) REFERENCES location (id)
);
CREATE UNIQUE INDEX program_location_id_uindex ON program_location (id);
CREATE TABLE section
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    grade INT,
    code VARCHAR(50),
    jornada VARCHAR(50),
    location INT,
    created_group BIT DEFAULT 0,
    name VARCHAR(25),
    CONSTRAINT section_grade_id_fk FOREIGN KEY (grade) REFERENCES grade (id),
    CONSTRAINT section_location_id_fk FOREIGN KEY (location) REFERENCES location (id)
);
CREATE UNIQUE INDEX section_id_uindex ON section (id);
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
    location INT,
    description VARCHAR(140),
    program_id INT,
    instructor_id INT,
    created_group BIT DEFAULT 0,
    CONSTRAINT workshop_location_id_fk FOREIGN KEY (location) REFERENCES location (id),
    CONSTRAINT workshop_program_id_fk FOREIGN KEY (program_id) REFERENCES program (id),
    CONSTRAINT workshop_instructor_id_fk FOREIGN KEY (instructor_id) REFERENCES instructor (id)
);
CREATE UNIQUE INDEX workshop_id_uindex ON workshop (id);