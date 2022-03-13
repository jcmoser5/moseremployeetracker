// show all
`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees managers ON managers.id = employees.manager_id;`

`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees managers ON managers.id = employees.manager_id
ORDER BY department;`

`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees managers ON managers.id = employees.manager_id
ORDER BY manager;`

`SELECT roles.id, roles.title, roles.salary, departments.name AS department
FROM roles
LEFT JOIN departments ON departments.id = roles.department_id;`

`SELECT departments.id, departments.name
FROM departments;`

`SELECT departments.name AS department, SUM(roles.salary) AS budget_utilized from employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
GROUP BY departments.name;`

`UPDATE employees SET manager_id = ? WHERE id = ?;`

`UPDATE employees SET employees.role_id = ? WHERE id = ?;`

`INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  (?,?,?,?);`

`INSERT INTO roles
  (title, salary, department_id)
VALUES
  (?,?,?);`

`INSERT INTO departments
  (name)
VALUES  
  (?);`

`DELETE FROM employees WHERE id = ?`

`DELETE FROM roles WHERE id = ?;`

`DELETE FROM departments WHERE id = ?;`
