USE gspotdb;

INSERT INTO oauth_clients (id, secret, name, created_at, updated_at) VALUES
('f3d259ddd3ed8ff3843839b', '4c7f6f8fa93d59c45502c0ae8c4a95b', 'Main website', '2015–05–12 21:00:00', '0000–00–00 00:00:00');


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
INSERT INTO users (name ,password ,email ,level ,landing_page ,user_group   ,country ,city ,address ,phone, created_at, updated_at ) VALUES
('g7tomi', '$2a$08$CTICqZ6FglDSOFP/VK8t7u0rXaCRClzZuu5hI17BaElFQxfdyDvh.', 'test1@test.com', '0', 'home','1','Magyarország','Isaszeg','Május 1 u. 1','11111', '2015–05–12 21:00:00', '0000–00–00 00:00:00' );
INSERT INTO users (name ,password ,email ,level ,landing_page ,user_group   ,country ,city ,address ,phone, created_at, updated_at ) VALUES
('g7henrik', '$2a$08$CTICqZ6FglDSOFP/VK8t7u0rXaCRClzZuu5hI17BaElFQxfdyDvh.', 'test2@test.com', '0', 'home','1','Magyarország','Budapest','Béla 1 u. 1','11311', '2015–05–12 21:00:00', '0000–00–00 00:00:00' );
INSERT INTO users (name ,password ,email ,level ,landing_page ,user_group   ,country ,city ,address ,phone, created_at, updated_at ) VALUES
('member1', '$2a$08$CTICqZ6FglDSOFP/VK8t7u0rXaCRClzZuu5hI17BaElFQxfdyDvh.', 'test3@test.com', '0', 'home','1','Magyarország','Göd','Király 1 u. 1','11122', '2015–05–12 21:00:00', '0000–00–00 00:00:00' );

-- INSERT user roles --
INSERT INTO user_roles (id,user_id ,role, created_at, updated_at ) VALUES
(1,1,'ADMIN', '2015–05–12 21:00:00', '0000–00–00 00:00:00');
INSERT INTO user_roles (id,user_id ,role, created_at, updated_at ) VALUES
(2,1,'MENTOR', '2015–05–12 21:00:00', '0000–00–00 00:00:00');
INSERT INTO user_roles (id,user_id ,role, created_at, updated_at ) VALUES
(3,1,'USER', '2015–05–12 21:00:00', '0000–00–00 00:00:00');
INSERT INTO user_roles (id,user_id ,role, created_at, updated_at ) VALUES
(4,2,'MENTOR', '2015–05–12 21:00:00', '0000–00–00 00:00:00');
INSERT INTO user_roles (id,user_id ,role, created_at, updated_at ) VALUES
(5,3,'USER', '2015–05–12 21:00:00', '0000–00–00 00:00:00');


-- INSERT GROUPS --
INSERT INTO groups (name,mentor, created_at, updated_at ) VALUES
('Socrates',1, '2015–05–12 21:00:00', '0000–00–00 00:00:00');
INSERT INTO groups (name,mentor, created_at, updated_at ) VALUES
('MAX',2, '2015–05–12 21:00:00', '0000–00–00 00:00:00');


-- INSERT WEEKS _-
INSERT INTO weeks (week_num,date_from,date_to,group_id, created_at, updated_at ) VALUES
(1,'2016-01-24','2016-01-31',1, '2015–05–12 21:00:00', '0000–00–00 00:00:00');
INSERT INTO weeks (week_num,date_from,date_to,group_id, created_at, updated_at ) VALUES
(1,'2016-01-24','2016-01-31',2, '2015–05–12 21:00:00', '0000–00–00 00:00:00');


-- INSERT LONG TERM GOALS
INSERT INTO longterm_goals (goal,sketch,suggest_id,assigned_id,goal_date,review_status_id,status_id,category_id, created_at, updated_at) VALUES
('ccccccccccccccccccccccccccccccccc',false,0,2,'2016-01-24',1,1,3, '2015–05–12 21:00:00', '0000–00–00 00:00:00');
INSERT INTO longterm_goals (goal,sketch,suggest_id,assigned_id,goal_date,review_status_id,status_id,category_id, created_at, updated_at) VALUES
('bbbbbbbbbbbbbbbbbbbbb',false,0,2,'2016-01-24',1,2,3, '2015–05–12 21:00:00', '0000–00–00 00:00:00');

-- INSERT SHORT TERM GOALS
INSERT INTO shortterm_goals (sketch,goal,suggest_id,assigned_id,week_id,review_status_id,status_id,goal_id, created_at, updated_at) VALUES
(false,'ccccccccccccccccccccccccccccccccc',0,2,1,1,3,1, '2015–05–12 21:00:00', '0000–00–00 00:00:00');
INSERT INTO shortterm_goals (sketch,goal,suggest_id,assigned_id,week_id,review_status_id,status_id,goal_id, created_at, updated_at) VALUES
(true,'bbbbbbbbbbbbbbbbbbbbb',0,2,1,2,3,1, '2015–05–12 21:00:00', '0000–00–00 00:00:00');

-- Create SHORT TERM  GOAL Comments  CONNTENTION--
INSERT INTO shortterm_goal_comments (message,comment_type,user_id,goal_id, created_at, updated_at ) VALUES
('aaaa',true,1,1, '2015–05–12 21:00:00', '0000–00–00 00:00:00');

-- Create LONG TERM  GOAL Comments  CONNTENTION--
INSERT INTO longterm_goal_comments (message,comment_type,user_id,goal_id, created_at, updated_at ) VALUES
('bbbb',true,2,1, '2015–05–12 21:00:00', '0000–00–00 00:00:00');
