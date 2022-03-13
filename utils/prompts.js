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
  updateEmployeeRole
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
      message: `Select the employee you'd like to update.`,
      choices: employeesArr
    },
    {
      type: 'list',
      name: 'managerId',
      message: `Select this employee's new manager.`,
      choices: [...employeesArr, { name: 'None', value: null }]
    }
  ]);
}

async function updateEmployeeRolePrompts(employeesArr, rolesArr) {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: `Select the employee you'd like to update.`,
      choices: employeesArr
    },
    {
      type: 'list',
      name: 'roleId',
      message: `Select this employee's new role.`,
      choices: rolesArr
    }
  ]);
}


async function checkMainMenu(mainMenu) {
  if (mainMenu === 'View All Employees') {
    await viewAllEmployees()
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
  } else {
    await connection.end();
    return console.log('Goodbye');
  }
  return startPrompts();
}

module.exports = {
  startPrompts
}; 