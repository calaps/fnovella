create table app_user
(
	id int identity
		primary key,
	first_name varchar(20),
	second_name varchar(20),
	first_lastname varchar(20),
	second_lastname varchar(20),
	privilege int,
	document_type varchar(20),
	document_value varchar(40),
	nationality varchar(30),
	department varchar(20),
	profession varchar(20),
	address varchar(50),
	email varchar(50),
	password varchar(50),
	municipality varchar(20),
	comunity varchar(20),
	phone int,
	cellphone int,
	cempro_code varchar(40),
	app_code varchar(60),
	gender varchar(10),
	born_date datetime
)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'User of application', N'SCHEMA', @sn, N'TABLE', N'app_user'
go

create table user_privileges
(
	id int identity
		primary key,
	privilege_name varchar(20),
	p_program_activation bit,
	p_students_entry bit,
	p_student_inscription bit,
	p_student_approval bit,
	p_notes_entry bit,
	p_notes_visualization bit,
	p_assistance_entry bit,
	p_assistance_visualization bit,
	p_evaluation_entry bit,
	p_evaluation_visualization bit,
	p_monitoring_entry bit,
	p_monitoring_visualization bit,
	p_indicators_visualization bit,
	p_indicators_p_visualization bit,
	p_information_visualization bit,
	p_information_entry bit,
	p_programs_visualization bit,
	p_indicators_r_visualization bit,
	p_indicators_d_visualization bit,
	p_indicators_g_visualization bit,
	p_structure_entry bit,
	p_catalogs_entry bit,
	p_personal_entry bit,
	p_personal_evaluation_entry bit,
	p_personal_pass_entry bit,
	p_personal_data_entry bit
)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'User privileges list', N'SCHEMA', @sn, N'TABLE', N'user_privileges'
go

alter table app_user
	add constraint user_privileges_fk
		foreign key (privilege) references user_privileges
go

create table instructor
(
	id int identity
		primary key,
	first_name varchar(50),
	second_name varchar(50),
	first_lastname varchar(50),
	second_lastname varchar(50),
	born_date datetime,
	document_type varchar(50),
	document_value varchar(50),
	nacionality varchar(50),
	department varchar(50),
	municipality varchar(50),
	community varchar(50),
	profession varchar(50),
	address varchar(50),
	phone int,
	cellphone int,
	email varchar(50),
	app_code varchar(50),
	gender varchar(10)
)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Educadores del programa', N'SCHEMA', @sn, N'TABLE', N'instructor'
go

create table participant_contacts
(
	id int identity
		primary key,
	first_name varchar(20),
	second_name varchar(20),
	first_lastname varchar(20),
	second_lastname varchar(20),
	document_type varchar(15),
	document_value varchar(50),
	tellphone int,
	cellphone int,
	email varchar(50),
	address varchar(100),
	participant_id int
)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Contactos de emergencia para l', N'SCHEMA', @sn, N'TABLE', N'participant_contacts'
go

create table location
(
	id int identity
		primary key,
	name varchar(50),
	address varchar(50),
	alias varchar(50)
)
go

create unique index location_id_uindex
	on location (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Sedes', N'SCHEMA', @sn, N'TABLE', N'location'
go

create table catalog
(
	id int identity
		primary key,
	name varchar(50),
	type varchar(50),
	category int
)
go

create unique index catalog_id_uindex
	on catalog (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Catalogo Camps', N'SCHEMA', @sn, N'TABLE', N'catalog'
go

create table program
(
	id int identity
		primary key,
	name varchar(50),
	type bit,
	audience varchar(50),
	description varchar(50),
	provider bit,
	clasification varchar(50),
	free_courses bit,
	activation_status bit default 0,
	gender_audience varchar(50),
	category int,
	gender varchar(10)
)
go

create unique index program_id_uindex
	on program (id)
go

create table grade
(
	id int identity
		primary key,
	name varchar(50),
	level varchar(50),
	location int
		constraint grade_location_id_fk
			references location,
	description varchar(140),
	program_id int
		constraint grade_program_id_fk
			references program,
	instructor_id int
		constraint grade_instructor_id_fk
			references instructor
)
go

create unique index general_data_id_uindex
	on grade (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Grado/Categoria', N'SCHEMA', @sn, N'TABLE', N'grade'
go

create table course
(
	id int identity
		primary key,
	name varchar(50),
	program varchar(50),
	location int
		constraint course_location_id_fk
			references location,
	description varchar(140),
	open_course bit,
	grade int
		constraint course_grade_id_fk
			references grade,
	program_id int
		constraint course_program_id_fk
			references program,
	instructor_id int
		constraint course_instructor_id_fk
			references instructor
)
go

create unique index course_id_uindex
	on course (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'curso', N'SCHEMA', @sn, N'TABLE', N'course'
go

create table workshop
(
	id int identity
		primary key,
	name varchar(50),
	location int
		constraint workshop_location_id_fk
			references location,
	description varchar(140),
	program_id int
		constraint workshop_program_id_fk
			references program,
	instructor_id int
		constraint workshop_instructor_id_fk
			references instructor
)
go

create unique index workshop_id_uindex
	on workshop (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'taller', N'SCHEMA', @sn, N'TABLE', N'workshop'
go

create table participant
(
	id int identity
		primary key,
	first_name varchar(50),
	second_name varchar(50),
	first_lastname varchar(50),
	second_lastname varchar(50),
	born_date datetime,
	document_type varchar(50),
	document_value varchar(50),
	nacionality varchar(50),
	department varchar(50),
	municipality varchar(50),
	community varchar(50),
	profession varchar(50),
	address varchar(50),
	phone int,
	cell_phone int,
	email varchar(50),
	app_code varchar(60),
	gender varchar(10)
)
go

create unique index participant_id_uindex
	on participant (id)
go

alter table participant_contacts
	add constraint participant_contacts_participant_id_fk
		foreign key (participant_id) references participant
go

create table evaluation_satisfaction
(
	id int identity
		primary key
)
go

create unique index satisfaction_id_uindex
	on evaluation_satisfaction (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'satisfaccion', N'SCHEMA', @sn, N'TABLE', N'evaluation_satisfaction'
go

create table inscriptions_inst_course
(
	id int identity
		primary key,
	instructor_id int
		constraint instructor_inscriptions_instructor_id_fk
			references instructor,
	status varchar(10),
	period int,
	year int,
	course_id int
		constraint inscriptions_inst_course_course_id_fk
			references course
)
go

create unique index instructor_inscriptions_id_uindex
	on inscriptions_inst_course (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Inscripiciones y asignaciones', N'SCHEMA', @sn, N'TABLE', N'inscriptions_inst_course'
go

create table inscriptions_inst_workshop
(
	id int identity
		primary key,
	instructor_id int
		constraint inscriptions_inst_workshop_instructor_id_fk
			references instructor,
	status varchar(10),
	period int,
	year int,
	workshop_id int
		constraint inscriptions_inst_workshop_workshop_id_fk
			references workshop
)
go

create unique index inscriptions_inst_workshop_id_uindex
	on inscriptions_inst_workshop (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Asignacion de instructor a Tal', N'SCHEMA', @sn, N'TABLE', N'inscriptions_inst_workshop'
go

create table inscriptions_inst_grade
(
	id int identity
		primary key,
	instructor_id int
		constraint inscriptions_inst_grade_instructor_id_fk
			references instructor,
	status varchar(50),
	period int,
	year int,
	grade_id int
		constraint inscriptions_inst_grade_grade_id_fk
			references grade
)
go

create unique index inscriptions_inst_grade_id_uindex
	on inscriptions_inst_grade (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Inscripciones de maestro a gra', N'SCHEMA', @sn, N'TABLE', N'inscriptions_inst_grade'
go

create table inscriptions_part_course
(
	id int identity
		primary key,
	participant_id int
		constraint inscriptions_part_course_participant_id_fk
			references participant,
	status int,
	period int,
	year int,
	course_id int
		constraint inscriptions_part_course_course_id_fk
			references course,
	group_id varchar(20)
)
go

create unique index inscriptions_part_course_id_uindex
	on inscriptions_part_course (id)
go

create table program_activation
(
	id int identity
		primary key,
	program_id int
		constraint program_activation_program_id_fk
			references program,
	cal_periods_grade varchar(20),
	cal_periods_course varchar(20),
	cal_periods_workshop varchar(20),
	responsable int
		constraint program_activation_instructor_id_fk
			references instructor,
	evaluation_structure varchar(20),
	satisfaction_structure varchar(20),
	monitoring_structure varchar(20),
	location int
		constraint program_activation_location_id_fk
			references location,
	free_courses bit,
	temporality int,
	year int,
	activation_status bit,
	number_sessions int,
	ns_jan int,
	ns_feb int,
	ns_mar int,
	ns_apr int,
	ns_may int,
	ns_jun int,
	ns_jul int,
	ns_aug int,
	ns_sep int,
	ns_oct int,
	ns_nov int,
	ns_dec int
)
go

create unique index program_activation_id_uindex
	on program_activation (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Setup de el programa con fecha', N'SCHEMA', @sn, N'TABLE', N'program_activation'
go

create table inscriptions_part_grade
(
	id int not null
		primary key,
	participant_id int
		constraint inscriptions_part_grade_participant_id_fk
			references participant,
	status int,
	period int,
	year int,
	grade_id int
		constraint inscriptions_part_grade_grade_id_fk
			references grade,
	group_id varchar(20)
)
go

create unique index inscriptions_part_grade_id_uindex
	on inscriptions_part_grade (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Inscripcion de estudiantes a g', N'SCHEMA', @sn, N'TABLE', N'inscriptions_part_grade'
go

create table inscriptions_part_workshop
(
	id int identity
		primary key,
	participant_id int
		constraint inscriptions_part_workshop_participant_id_fk
			references participant,
	status varchar(10),
	period int,
	year int,
	workshop_id int
		constraint inscriptions_part_workshop_workshop_id_fk
			references workshop,
	group_id varchar(20)
)
go

create unique index inscriptions_part_workshop_id_uindex
	on inscriptions_part_workshop (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Inspcripcion de alumno a Talle', N'SCHEMA', @sn, N'TABLE', N'inscriptions_part_workshop'
go

create table catalog_relation
(
	id int identity
		primary key,
	id_program int
		constraint catalog_relation_program_id_fk
			references program,
	id_catalog int
		constraint catalog_relation_catalog_id_fk
			references catalog
)
go

create unique index catalog_relation_id_uindex
	on catalog_relation (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Asignacion de parametros unico', N'SCHEMA', @sn, N'TABLE', N'catalog_relation'
go

create table catalog_relation_student
(
	id int identity
		primary key,
	id_participant int
		constraint catalog_relation_student_participant_id_fk
			references participant,
	id_catalog int
		constraint catalog_relation_student_catalog_id_fk
			references catalog,
	value varchar(100)
)
go

create unique index catalog_relation_student_id_uindex
	on catalog_relation_student (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Relacion de parametros especif', N'SCHEMA', @sn, N'TABLE', N'catalog_relation_student'
go

create table app_user_session
(
	id int identity
		primary key,
	id_app_user int not null
		references app_user,
	token varchar(50) not null
)
go

create table evaluation_monitoring
(
	id int identity
		primary key
)
go

create unique index monitoring_id_uindex
	on evaluation_monitoring (id)
go

create table evaluation_assistance
(
	id int identity
		primary key
)
go

create unique index assistance_id_uindex
	on evaluation_assistance (id)
go

create table evaluation_notes
(
	id int identity
		primary key
)
go

create unique index evaluation_notes_id_uindex
	on evaluation_notes (id)
go

create table category
(
	id int identity
		primary key,
	name varchar(50),
	description varchar(180)
)
go

create unique index category_id_uindex
	on category (id)
go

alter table catalog
	add constraint catalog_category_id_fk
		foreign key (category) references category
go

alter table program
	add constraint program_category_id_fk
		foreign key (category) references category
go

