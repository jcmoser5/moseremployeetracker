// show all
`select employee.id, employee.first_name, employee.last_name, department.name as department, role.title as title, role.salary as salary, concat(employee.first_name, ' ', employee.last_name) as manager from employee
left join role on employee.role_id = role.id
left join department on role.department_id = department.id;` 