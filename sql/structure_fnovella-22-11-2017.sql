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
	born_date datetime,
	colony varchar(50),
	zone varchar(50)
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
	gender varchar(10),
	password varchar(70),
	colony varchar(50),
	zone varchar(50),
	privilege int default 4
		constraint instructor_user_privileges_id_fk
			references user_privileges
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
	participant_id int,
	photo bit
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
	type varchar(50),
	audience varchar(50),
	description varchar(50),
	provider bit,
	clasification varchar(50),
	free_courses bit,
	activation_status bit default 0,
	gender_audience varchar(50),
	category int,
	gender varchar(10),
	audience_min int,
	audience_max int,
	implementation_location varchar(50),
	responsable int
		constraint program_app_user_id_fk
			references app_user,
	evaluation_type varchar(50),
	months_total int,
	evaluation_period int,
	evaluation_performmance bit default 0,
	indicators_evaluation bit default 0,
	indicators_performmance bit default 0,
	indicators_satisfaction bit default 0
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
			references instructor,
	created_group bit default 0,
	section int
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
			references instructor,
	created_group bit default 0
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
	gender varchar(10),
	zone varchar(50),
	colony varchar(50)
)
go

create unique index participant_id_uindex
	on participant (id)
go

alter table participant_contacts
	add constraint participant_contacts_participant_id_fk
		foreign key (participant_id) references participant
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
	token varchar(50) not null,
	is_app_user bit default 1,
	id_app_user int
)
go

create table category
(
	id int identity
		primary key,
	name varchar(50),
	description varchar(180),
	aditional_field bit default 0
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

create table program_app_user
(
	id int identity
		primary key,
	program int
		constraint program_app_user_program_id_fk
			references program,
	app_user int
		constraint program_app_user_app_user_id_fk
			references app_user
)
go

create unique index program_app_user_id_uindex
	on program_app_user (id)
go

create table program_location
(
	id int identity
		primary key,
	program int
		constraint program_location_program_id_fk
			references program,
	location int
		constraint program_location_location_id_fk
			references location
)
go

create unique index program_location_id_uindex
	on program_location (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Junction relation between prog', N'SCHEMA', @sn, N'TABLE', N'program_location'
go

create table program_aditional_fields
(
	id int identity
		primary key,
	program int
		constraint program_aditional_fields_program_id_fk
			references program,
	category int
		constraint program_aditional_fields_category_id_fk
			references category
)
go

create unique index program_aditional_fields_id_uindex
	on program_aditional_fields (id)
go

create table division
(
	id int identity
		primary key,
	name varchar(50),
	programa int
		constraint division_program_id_fk
			references program,
	location int
		constraint division_location_id_fk
			references location,
	created_group bit default 0
)
go

create unique index division_id_uindex
	on division (id)
go

create table group
(
	id int identity
		primary key,
	type_category varchar(50),
	type int,
	correlativo varchar(60),
	course_id int
		constraint group_course_id_fk
			references course,
	workshop_id int
		constraint group_workshop_id_fk
			references workshop,
	division_id int
		constraint group_division_id_fk
			references division,
	instructor int
		constraint group_instructor_id_fk
			references instructor,
	free_course bit default 0,
	section int
)
go

create unique index group_id_uindex
	on group (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Type_category ("gradType_categ', N'SCHEMA', @sn, N'TABLE', N'group'
go

create table program_instructor
(
	id int identity
		primary key,
	program int
		constraint program_instructor_program_id_fk
			references program,
	instructor int
		constraint program_instructor_instructor_id_fk
			references instructor
)
go

create unique index program_instructor_id_uindex
	on program_instructor (id)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'Junction relation between prog', N'SCHEMA', @sn, N'TABLE', N'program_instructor'
go

create table section
(
	id int identity
		primary key,
	grade int
		constraint section_grade_id_fk
			references grade,
	code varchar(50),
	jornada varchar(50),
	location int
		constraint section_location_id_fk
			references location,
	created_group bit default 0,
	name varchar(25)
)
go

create unique index section_id_uindex
	on section (id)
go

alter table course
	add constraint course_section_id_fk
		foreign key (section) references section
go

alter table group
	add constraint group_section_id_fk
		foreign key (section) references section
go

create table paticipant_aditional_fields
(
	id int,
	group int
		constraint paticipant_aditional_fields_group_id_fk
			references group,
	participant int
		constraint paticipant_aditional_fields_participant_id_fk
			references participant,
	catalog int
		constraint paticipant_aditional_fields_catalog_id_fk
			references catalog,
	value varchar(50),
	period int,
	year int
)
go

declare @sn nvarchar(30)
set @sn = schema_name()
execute sp_addextendedproperty N'MS_Description', N'values of the participant adit', N'SCHEMA', @sn, N'TABLE', N'paticipant_aditional_fields'
go

create table inscriptions
(
	id int identity
		primary key,
	period int,
	year int,
	status int default 0,
	group int
		constraint inscriptions_group_id_fk
			references group
)
go

create unique index inscriptions_id_uindex
	on inscriptions (id)
go

create table inscriptions_participants
(
	id int,
	inscription int
		constraint inscription_participant_inscriptions_id_fk
			references inscriptions,
	participant int
		constraint inscription_participant_participant_id_fk
			references participant
)
go

create table assistance
(
	id int identity
		primary key,
	inscription int
		constraint assistance_inscriptions_id_fk
			references inscriptions,
	session int,
	date date,
	status bit,
	month int
)
go

create unique index assistance_id_uindex
	on assistance (id)
go

create table assistance_participant
(
	id int identity
		primary key,
	assistance int
		constraint assistance_participant_assistance_id_fk
			references assistance,
	participant int
		constraint assistance_participant_participant_id_fk
			references participant,
	value int
)
go

create unique index assistance_participant_id_uindex
	on assistance_participant (id)
go

create table evaluation
(
	id int identity
		primary key,
	group int
		constraint evaluation_group_id_fk
			references group,
	session int,
	evaluation_type int,
	evaluation_subType int,
	date_start date,
	date_end date,
	range int
)
go

create unique index evaluation_id_uindex
	on evaluation (id)
go

create table evaluation_type
(
	id int identity
		primary key,
	name varchar(50)
)
go

create unique index evaluation_type_id_uindex
	on evaluation_type (id)
go

alter table evaluation
	add constraint evaluation_evaluation_type_id_fk
		foreign key (evaluation_type) references evaluation_type
go

create table evaluation_subType
(
	id int identity
		primary key,
	name varchar(50)
)
go

create unique index evaluation_subType_id_uindex
	on evaluation_subType (id)
go

alter table evaluation
	add constraint evaluation_evaluation_subType_id_fk
		foreign key (evaluation_subType) references evaluation_subType
go

create table evaluation_range
(
	id int identity
		primary key,
	min int,
	max int
)
go

create unique index evaluation_range_id_uindex
	on evaluation_range (id)
go

alter table evaluation
	add constraint evaluation_evaluation_range_id_fk
		foreign key (range) references evaluation_range
go

create table evaluation_activity
(
	id int identity
		primary key,
	evaluation int
		constraint evaluation_activity_evaluation_id_fk
			references evaluation,
	[percentage ] int,
	name int,
	range int
		constraint evaluation_activity_evaluation_range_id_fk
			references evaluation_range,
	parent_id int
)
go

create unique index evaluation_activity_id_uindex
	on evaluation_activity (id)
go

create table evaluation_activity_participant
(
	id int identity
		primary key,
	participant int
		constraint evaluation_activity_participant_participant_id_fk
			references participant,
	activity int
		constraint evaluation_activity_participant_evaluation_activity_id_fk
			references evaluation_activity,
	grade_inital int,
	grade_final int
)
go

create unique index evaluation_activity_participant_id_uindex
	on evaluation_activity_participant (id)
go

create table evaluation_activity_instructor
(
	id int,
	instructor int
		constraint evaluation_activity_instructor_instructor_id_fk
			references instructor,
	activity int
		constraint evaluation_activity_instructor_evaluation_activity_id_fk
			references evaluation_activity,
	grade_inital int,
	grade_final int
)
go

create table [evaluation_activity_participant-intructor]
(
	id int,
	participant int
		constraint evaluation_activity_participant-intructor_participant_id_fk
			references participant,
	intructor int
		constraint evaluation_activity_participant-intructor_instructor_id_fk
			references instructor,
	activity int
		constraint evaluation_activity_participant-intructor_evaluation_activity_id_fk
			references evaluation_activity,
	grade_initial int,
	grade_final int
)
go

