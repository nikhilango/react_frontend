--Groups
INSERT INTO groups (id, name, description, logo_url)
VALUES
  ('1d4fb576-eaa5-437a-9053-14fbbfe198f9', 'Nose Community', 'A community for noser employees', 'Test url')
ON CONFLICT DO NOTHING;

--USERS
insert into users (id, email,first_name,last_name, password, group_id)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'admin@example.com', 'James','Bond', '$2a$10$TM3PAYG3b.H98cbRrHqWa.BM7YyCqV92e/kUTBfj85AjayxGZU7d6', '1d4fb576-eaa5-437a-9053-14fbbfe198f9'), -- Password: 1234
('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'user@example.com', 'Tyler','Durden', '$2a$10$TM3PAYG3b.H98cbRrHqWa.BM7YyCqV92e/kUTBfj85AjayxGZU7d6', '1d4fb576-eaa5-437a-9053-14fbbfe198f9') -- Password: 1234
 ON CONFLICT DO NOTHING;

 --USERS
 insert into users (id, email,first_name,last_name, password)
 values ('28376925-deb6-4d69-b8c4-b83256843f45', 'nogroup@example.com', 'Ilija','nussbaumer', '$2a$10$TM3PAYG3b.H98cbRrHqWa.BM7YyCqV92e/kUTBfj85AjayxGZU7d6') -- Password: 1234
  ON CONFLICT DO NOTHING;

--ROLES
INSERT INTO role(id, name)
VALUES ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', 'DEFAULT'),
('ab505c92-7280-49fd-a7de-258e618df074', 'ADMIN'),
('c6aee32d-8c35-4481-8b3e-a876a39b0c02', 'GROUP_USER'),
('01dbec27-4977-4626-91c1-e5480dc0470b', 'NO_GROUP_USER')

ON CONFLICT DO NOTHING;

--AUTHORITIES
INSERT INTO authority(id, name)
VALUES ('2ebf301e-6c61-4076-98e3-2a38b31daf86', 'DEFAULT'),
('76d2cbf6-5845-470e-ad5f-2edb9e09a868', 'USER_MODIFY'),
('21c942db-a275-43f8-bdd6-d048c21bf5ab', 'USER_DELETE'),
('73f35e6f-c71f-4a03-bbbf-79e7d3fa925e', 'USER_READ_GROUPS'),
('a614bf43-55c3-4727-bd05-8ca256853da0', 'READ_OWN_GROUP'),
('ea6418f3-cdee-4044-ba7a-7b427ad4106e', 'GROUP_CREATE'),
('c1958972-f37f-406b-9b57-29dbd28105c0', 'GROUP_MODIFY'),
('c7fe470c-4b69-44ba-911e-74c17672f3fc', 'GROUP_DELETE')
ON CONFLICT DO NOTHING;

--assign roles to users
insert into users_role (users_id, role_id)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'd29e709c-0ff1-4f4c-a7ef-09f656c390f1'),
       ('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'd29e709c-0ff1-4f4c-a7ef-09f656c390f1'),
       ('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'c6aee32d-8c35-4481-8b3e-a876a39b0c02'),
       ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'ab505c92-7280-49fd-a7de-258e618df074'),
       ('28376925-deb6-4d69-b8c4-b83256843f45', '01dbec27-4977-4626-91c1-e5480dc0470b'),
       ('ba804cb9-fa14-42a5-afaf-be488742fc54','c6aee32d-8c35-4481-8b3e-a876a39b0c02')
 ON CONFLICT DO NOTHING;

--assign authorities to roles
INSERT INTO role_authority(role_id, authority_id)
VALUES ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', '2ebf301e-6c61-4076-98e3-2a38b31daf86'),
('ab505c92-7280-49fd-a7de-258e618df074', '76d2cbf6-5845-470e-ad5f-2edb9e09a868'),
('ab505c92-7280-49fd-a7de-258e618df074', '73f35e6f-c71f-4a03-bbbf-79e7d3fa925e'),
('c6aee32d-8c35-4481-8b3e-a876a39b0c02', '21c942db-a275-43f8-bdd6-d048c21bf5ab'),
('01dbec27-4977-4626-91c1-e5480dc0470b', '73f35e6f-c71f-4a03-bbbf-79e7d3fa925e'),
('ab505c92-7280-49fd-a7de-258e618df074', 'ea6418f3-cdee-4044-ba7a-7b427ad4106e'),
('ab505c92-7280-49fd-a7de-258e618df074', 'c1958972-f37f-406b-9b57-29dbd28105c0'),
('ab505c92-7280-49fd-a7de-258e618df074', 'c7fe470c-4b69-44ba-911e-74c17672f3fc'),
('c6aee32d-8c35-4481-8b3e-a876a39b0c02', 'a614bf43-55c3-4727-bd05-8ca256853da0')
 ON CONFLICT DO NOTHING;
