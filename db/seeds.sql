INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Sales Person', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Malia', 'Brown', 2, 1),
  ('Sarah', 'Lourd', 2, 1),
  ('Tom', 'Allen', 3, null),
  ('Sam', 'Kash', 4, 3),
  ('John', 'Doe', 5, null),
  ('Mike', 'Chan', 6, null),
  ('Ashley', 'Rodriguez', 7, 6),
  ('Leopold', 'Stotch', 4, 3),
  ('Gregory', 'Swanson', 7, 6),
  ('Brian', 'Baxter', 1, null);