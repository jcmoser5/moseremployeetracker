const inquirer = require('inquirer');
const {
  connection,
  viewAllEmployees,
  viewAllEmployeesByDepartment,
  viewAllEmployeesByManager,
  viewAllRoles,
  viewAllDepartments,
  viewBudgetByDepartment,
  getEmployeeNamesAndIds,
  updateEmployeeManager,
  getRoleTitlesAndIds,
  updateEmployeeRole,
  addEmployee,
  getDepartmentNamesAndIds,
  addRole,
  addDepartment,
  removeEmployee,
  removeRole,
  removeDepartment
} = require('./queries');

async function startPrompts() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees By Department',
        'View All Employees By Manager',
        'View All Roles',
        'View All Departments',
        'View Total Utilized Budget By Department',
        `Update An Employee's Manager`,
        `Update An Employee's Role`,
        'Add New Employee',
        'Add New Role',
        'Add New Department',
        'Remove Employee',
        'Remove Role',
        'Remove Department',
        'Exit Employee Tracker'
      ]
    }
  ])
  .then(async (data) => {
    await checkMainMenu(data.mainMenu);
  });
}

async function updateEmployeeManagerPrompts(employeesArr) {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: `Select the employee you'd like to update:`,
      choices: employeesArr
    },
    {
      type: 'list',
      name: 'managerId',
      message: `Select this employee's new manager:`,
      choices: [...employeesArr, { name: 'None', value: null }]
    }
  ]);
}

async function updateEmployeeRolePrompts(employeesArr, rolesArr) {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: `Select the employee you'd like to update:`,
      choices: employeesArr
    },
    {
      type: 'list',
      name: 'roleId',
      message: `Select this employee's new role:`,
      choices: rolesArr
    }
  ]);
}

async function addEmployeePrompts(employeesArr, rolesArr) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: `Enter the new employee's first name:`,
      validate: firstNameInput => {
        if (firstNameInput) {
          return true;
        } else {
          console.log(`
------------------------------------------
  Please enter a first name!
------------------------------------------
          `);
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: `Enter the new employee's last name:`,
      validate: lastNameInput => {
        if (lastNameInput) {
          return true;
        } else {
          console.log(`
------------------------------------------
  Please enter a last name!
------------------------------------------
          `);
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'roleId',
      message: `Select this new employee's role:`,
      choices: rolesArr
    },
    {
      type: 'list',
      name: 'managerId',
      message: `Select this new employee's manager:`,
      choices: [...employeesArr, { name: 'None', value: null }]
    },
  ]);
}

async function addRolePrompts(departmentsArr) {
  return inquirer.prompt([
    {
      type: 'input',
      message: `Enter the new role's title:`,
      name: 'title',
      validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log(`
------------------------------------------
  Please enter a title!
------------------------------------------
          `);
          return false;
        }
      }
    },
    {
      type: 'input',
      message: `Enter the new role's salary:`,
      name: 'salary',
      validate: nameInput => {
        if (!nameInput) {
          console.log(`
------------------------------------------
  Please enter a salary!
------------------------------------------
          `);
          return false;
        } else if (isNaN(Number(nameInput))) {
          console.log(`
------------------------------------------
  Salary must be a number!
------------------------------------------
          `);
          return false;
        } else {
          return true;
        }
      }
    },
    {
      type: 'list',
      message: `Select the new role's department:`,
      name: 'departmentId',
      choices: departmentsArr
    }
  ]);
}

async function addDepartmentPrompts() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `Enter the new department's name:`,
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log(`
------------------------------------------
  Please enter a name!
------------------------------------------
          `);
          return false;
        }
      }
    }
  ]);
}

async function removeEmployeePrompts(employeesArr) {
  return inquirer.prompt([
    {
      type: 'list',
      message: `Select the employee you'd like to delete:`,
      name: 'employeeId',
      choices: employeesArr
    }
  ]);
}

async function removeRolePrompts(rolesArr) {
  return inquirer.prompt([
    {
      type: 'list',
      message: `Select the role you'd like to delete:`,
      name: 'roleId',
      choices: rolesArr
    }
  ]);
}

async function removeDepartmentPrompts(departmentsArr) {
  return inquirer.prompt([
    {
      type: 'list',
      message: `Select the department you'd like to delete:`,
      name: 'departmentId',
      choices: departmentsArr
    }
  ]);
}

async function checkMainMenu(mainMenu) {
  if (mainMenu === 'View All Employees') {
    await viewAllEmployees();
  } else if (mainMenu === 'View All Employees By Department') {
    await viewAllEmployeesByDepartment();
  } else if (mainMenu === 'View All Employees By Manager') {
    await viewAllEmployeesByManager();
  } else if (mainMenu === 'View All Roles') {
    await viewAllRoles();
  } else if (mainMenu === 'View All Departments') {
    await viewAllDepartments();
  } else if (mainMenu === 'View Total Utilized Budget By Department') {
    await viewBudgetByDepartment();
  } else if (mainMenu === `Update An Employee's Manager`) {
    let employeeNamesAndIds = await getEmployeeNamesAndIds();
    let paramsObj = await updateEmployeeManagerPrompts(employeeNamesAndIds);
    await updateEmployeeManager(paramsObj);
  } else if (mainMenu === `Update An Employee's Role`) {
    let employeesNamesAndIds = await getEmployeeNamesAndIds();
    let roleTitlesAndIds = await getRoleTitlesAndIds();
    let paramsObj = await updateEmployeeRolePrompts(employeesNamesAndIds, roleTitlesAndIds);
    await updateEmployeeRole(paramsObj);
  } else if (mainMenu === 'Add New Employee') {
    let employeesNamesAndIds = await getEmployeeNamesAndIds();
    let roleTitlesAndIds = await getRoleTitlesAndIds();
    let paramsObj = await addEmployeePrompts(employeesNamesAndIds, roleTitlesAndIds);
    await addEmployee(paramsObj);
  } else if (mainMenu === 'Add New Role') {
    let departmentNamesAndIds = await getDepartmentNamesAndIds();
    let paramsObj = await addRolePrompts(departmentNamesAndIds);
    await addRole(paramsObj);
  } else if (mainMenu === 'Add New Department') {
    let paramsObj = await addDepartmentPrompts();
    await addDepartment(paramsObj);
  } else if (mainMenu === 'Remove Employee') {
    let employeeNamesAndIds = await getEmployeeNamesAndIds();
    let paramsObj = await removeEmployeePrompts(employeeNamesAndIds);
    await removeEmployee(paramsObj);
  } else if (mainMenu === 'Remove Role') {
    let roleTitlesAndIds = await getRoleTitlesAndIds();
    let paramsObj = await removeRolePrompts(roleTitlesAndIds);
    await removeRole(paramsObj);
  } else if (mainMenu === 'Remove Department') {
    let departmentNamesAndIds = await getDepartmentNamesAndIds();
    let paramsObj = await removeDepartmentPrompts(departmentNamesAndIds);
    await removeDepartment(paramsObj);
  } else {
    await connection.end();
    return console.log('Good bye.');
  }
  return startPrompts();
}

module.exports = {
  startPrompts
};