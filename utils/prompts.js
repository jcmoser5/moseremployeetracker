const inquirer = require('inquirer');
const { 
  viewAllEmployees,
  viewAllEmployeesByDepartment,
  viewAllEmployeesByManager,
  viewAllRoles,
  viewAllDepartments,
  viewBudgetByDepartment
} = require('./queries');

function startPrompts() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'topSelect',
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
  ]).then(({ topSelect }) => checkTopSelect(topSelect));
}

function checkTopSelect(topSelect) {
  switch(topSelect) {
    case 'View All Employees':
      viewAllEmployees();
      break;
    case 'View All Employees By Department':
      viewAllEmployeesByDepartment();
      break;
    case 'View All Employees By Manager':
      viewAllEmployeesByManager();
      break;
    case 'View All Roles':
      viewAllRoles();
      break;
    case 'View All Departments':
      viewAllDepartments();
      break;
    case 'View Total Utilized Budget By Department':
      viewBudgetByDepartment();
      break;
      default:
        console.log('Goodbye');
  }
}

module.exports = startPrompts; 