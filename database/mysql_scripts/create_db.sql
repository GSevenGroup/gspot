DROP DATABASE IF EXISTS gspotdb;
CREATE DATABASE IF NOT EXISTS gspotdb;
USE gspotdb;

-- Create User tables --

-- Create Users table --
CREATE TABLE users(
	id INT  AUTO_INCREMENT,
	name VARCHAR(250) NOT NULL,
	password VARCHAR(250) NOT NULL,
	email VARCHAR(250) NOT NULL,
	level INT NOT NULL,
	landing_page VARCHAR(250) NOT NULL,
	avatar BLOB ,
	user_group INT  ,
	country VARCHAR(250) NOT NULL,
	city VARCHAR(250) NOT NULL,
	address VARCHAR(250) NOT NULL,
	phone VARCHAR(100) NULL,
	PRIMARY KEY (id));

-- Create User roles  table--	
CREATE TABLE user_roles (
	id INT NOT NULL,
	role VARCHAR(50) NOT NULL,
	UNIQUE KEY `user_roles` (`id`,`role`),
  	FOREIGN KEY (id) REFERENCES users (id));



-- Create Groups table --
CREATE TABLE groups(
	id INT  AUTO_INCREMENT,
	name VARCHAR(250) NOT NULL,
	mentor INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (mentor) REFERENCES users (id));
	
-- Create Weeks table --
CREATE TABLE weeks(
	id INT  AUTO_INCREMENT,
	week_num INT NOT NULL,
	date_from DATE NOT NULL,
	date_to DATE NOT NULL,
	group_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (group_id) REFERENCES groups (id));

-- Create GOALS table --

-- Create Statuses table --
CREATE TABLE statuses(
	id INT NOT NULL,
	status VARCHAR(250) NOT NULL,
	PRIMARY KEY (id));

-- Create Review Statuses table --
CREATE TABLE review_statuses(
	id INT NOT NULL,
	status VARCHAR(250) NOT NULL,
	PRIMARY KEY (id));

-- Create Categories table --
CREATE TABLE categories(
	id INT NOT NULL,
	category VARCHAR(250) NOT NULL,
	PRIMARY KEY (id));

-- Create SHORT TERM GOALS --
CREATE TABLE shortterm_goals(
	id INT  AUTO_INCREMENT,
	goal VARCHAR(250) NOT NULL,
	sketch BOOL NOT NULL,
	suggest_id INT ,
	assigned_id INT ,
	week_id INT NOT NULL,
	review_status_id INT NOT NULL,
	status_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (suggest_id) REFERENCES users (id),
	FOREIGN KEY (assigned_id) REFERENCES users (id),
	FOREIGN KEY (week_id) REFERENCES weeks (id),
	FOREIGN KEY (review_status_id) REFERENCES review_statuses (id),
	FOREIGN KEY (status_id) REFERENCES statuses (id))
	;


-- Create SHORT TERM GOALS --
CREATE TABLE longterm_goals(
	id INT  AUTO_INCREMENT,
	goal VARCHAR(250) NOT NULL,
	sketch BOOL NOT NULL,
	suggest_id INT ,
	assigned_id INT ,
	goal_date DATE NOT NULL,
	review_status_id INT NOT NULL,
	status_id INT NOT NULL,
	category_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (suggest_id) REFERENCES users (id),
	FOREIGN KEY (assigned_id) REFERENCES users (id),
	FOREIGN KEY (category_id) REFERENCES categories (id),
	FOREIGN KEY (review_status_id) REFERENCES review_statuses(id),
	FOREIGN KEY (status_id) REFERENCES statuses(id))
	;
	
-- Create SHORT AND LONG TERM  GOALS  CONNTENTION--
CREATE TABLE short_long_goals(
	shortterm_goal_id INT NOT NULL,
	longterm_goal_id INT NOT NULL,
	FOREIGN KEY (shortterm_goal_id) REFERENCES shortterm_goals(id),
	FOREIGN KEY (longterm_goal_id) REFERENCES longterm_goals(id))
	;			

-- Create SHORT TERM GOALS --
CREATE TABLE shortterm_goal_comments(
	id INT  AUTO_INCREMENT,
	message VARCHAR(250) NOT NULL,
	comment_type BOOL NOT NULL,
	comment_date DATE NOT NULL,
	user_id INT NOT NULL,
	goal_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (goal_id) REFERENCES shortterm_goals(id))
	;	

-- Create SHORT TERM GOALS --
CREATE TABLE longterm_goal_comments(
	id INT  AUTO_INCREMENT,
	message VARCHAR(250) NOT NULL,
	comment_type BOOL NOT NULL,
	comment_date DATE NOT NULL,
	user_id INT NOT NULL,
	goal_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (goal_id) REFERENCES longterm_goals(id))
	;	
	

	
-- INSET STATUSES --	
INSERT INTO statuses (id ,status ) VALUES
(1,'recommended');
INSERT INTO statuses (id ,status ) VALUES
(2,'failed');
INSERT INTO statuses (id ,status ) VALUES
(3,'in_progress');
INSERT INTO statuses (id ,status ) VALUES
(4,'achieved');

-- INSET REVIEW STATUSES --	
INSERT INTO review_statuses (id ,status ) VALUES
(1,'accepted');
INSERT INTO review_statuses (id ,status ) VALUES
(2,'rejected');
INSERT INTO review_statuses (id ,status ) VALUES
(3,'waiting');


-- INSET CATEGORIES STATUSES --	
INSERT INTO categories (id ,category ) VALUES
(1,'Hivatás');
INSERT INTO categories (id ,category ) VALUES
(2,'Pénz');
INSERT INTO categories (id ,category ) VALUES
(3,'Egészség');
INSERT INTO categories (id ,category ) VALUES
(4,'Emberi kapcsolatok');
INSERT INTO categories (id ,category ) VALUES
(5,'Karakter');


-- INSERT USERS --	
INSERT INTO users (name ,password ,email ,level ,landing_page ,user_group   ,country ,city ,address ,phone ) VALUES
('g7tomi', '$2a$08$CTICqZ6FglDSOFP/VK8t7u0rXaCRClzZuu5hI17BaElFQxfdyDvh.', 'xxx@ccc.com', '0', 'home','1','Magyarország','Isaszeg','Május 1 u. 1','11111' );
INSERT INTO users (name ,password ,email ,level ,landing_page ,user_group   ,country ,city ,address ,phone ) VALUES
('g7henrik', '$2a$08$CTICqZ6FglDSOFP/VK8t7u0rXaCRClzZuu5hI17BaElFQxfdyDvh.', 'faa@ccc.com', '0', 'home','1','Magyarország','Budapest','Béla 1 u. 1','11311' );
INSERT INTO users (name ,password ,email ,level ,landing_page ,user_group   ,country ,city ,address ,phone ) VALUES
('member1', '$2a$08$CTICqZ6FglDSOFP/VK8t7u0rXaCRClzZuu5hI17BaElFQxfdyDvh.', 'baaa@ccc.com', '0', 'home','1','Magyarország','Göd','Király 1 u. 1','11122' );

-- INSERT user roles --
INSERT INTO user_roles (id ,role ) VALUES
(1,'ADMIN');
INSERT INTO user_roles (id ,role ) VALUES
(1,'MENTOR');
INSERT INTO user_roles (id ,role ) VALUES
(1,'USER');
INSERT INTO user_roles (id ,role ) VALUES
(2,'MENTOR');
INSERT INTO user_roles (id ,role ) VALUES
(3,'USER');


-- INSERT GROUPS --
INSERT INTO groups (name,mentor ) VALUES
('Socrates',1);
INSERT INTO groups (name,mentor ) VALUES
('MAX',2);


-- INSERT WEEKS _-
INSERT INTO weeks (week_num,date_from,date_to,group_id ) VALUES
(1,'2016-01-24','2016-01-31',1);
INSERT INTO weeks (week_num,date_from,date_to,group_id ) VALUES
(1,'2016-01-24','2016-01-31',2);

-- INSERT SHORT TERM GOALS
INSERT INTO shortterm_goals (sketch,goal,suggest_id,assigned_id,week_id,review_status_id,status_id) VALUES
(false,'ccccccccccccccccccccccccccccccccc',1,2,1,1,3);
INSERT INTO shortterm_goals (sketch,goal,suggest_id,assigned_id,week_id,review_status_id,status_id) VALUES
(true,'bbbbbbbbbbbbbbbbbbbbb',1,2,1,2,3);

-- INSERT LONG TERM GOALS
INSERT INTO longterm_goals (goal,sketch,suggest_id,assigned_id,goal_date,review_status_id,status_id,category_id) VALUES
('ccccccccccccccccccccccccccccccccc',false,1,2,'2016-01-24',1,1,3);
INSERT INTO longterm_goals (goal,sketch,suggest_id,assigned_id,goal_date,review_status_id,status_id,category_id) VALUES
('bbbbbbbbbbbbbbbbbbbbb',false,1,2,'2016-01-24',1,2,3);

-- Create SHORT AND LONG TERM  GOALS  CONNTENTION--
INSERT INTO short_long_goals (shortterm_goal_id,longterm_goal_id ) VALUES
(1,2);
INSERT INTO short_long_goals (shortterm_goal_id,longterm_goal_id ) VALUES
(2,1);

-- Create SHORT TERM  GOAL Comments  CONNTENTION--
INSERT INTO shortterm_goal_comments (message,comment_type,comment_date,user_id,goal_id ) VALUES
('aaaa',true,'2016-01-24',1,1);

-- Create LONG TERM  GOAL Comments  CONNTENTION--
INSERT INTO longterm_goal_comments (message,comment_type,comment_date,user_id,goal_id ) VALUES
('bbbb',true,'2016-01-24',2,1);