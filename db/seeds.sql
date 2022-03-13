INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Sales Person', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Jack', 'Nicholson', 1, null),
  ('Denzel', 'Washington', 2, 1),
  ('Meryl', 'Streep', 3, null),
  ('Tom', 'Hanks', 4, 3),
  ('Cate', 'Blanchett', 5, null),
  ('Audrey', 'Hepburn', 6, null),
  ('Tim', 'Allen', 7, 6),
  ('Bruce', 'Lee', 4, 3),
  ('Morgan', 'Freeman', 7, 6),
  ('Keanu', 'Reeves', 2, 1);