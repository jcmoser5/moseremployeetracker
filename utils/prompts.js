const inquirer = require('inquirer');
const { 
  connection,
  viewAllEmployees,
  viewAllEmployeesByDepartment,
  viewAllEmployeesByManager,
  viewAllRoles,
  viewAllDepartments,
  viewBudgetByDepartment
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
        'Update Employee Manager',
        'Update Employee Role',
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
  } else {
    await connection.end();
    return console.log('Goodbye');
  }
  return startPrompts();
}

module.exports = {
  startPrompts
}; 