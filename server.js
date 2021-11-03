//Require all NPM dependencies needed for application
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const PORT = process.env.PORT || 3020;

//Connect to MySQL Database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'newlove',
        database: 'employee_db'
    },
    console.log('Connected to employee_db database.')
);

console.log("Welcome to the Employee Tracker Application.",
"This application utilizes Node.js, Inquirer and MySQL to allow users to manage a company's employee database\n",
"Users have the option to view all of the company's departments, roles and employees, as well as add new department(s), role(s), and employee(s).\n",
"Finally, users can update a company's list of current employee(s) or quit the application");

function Prompt() {
    inquirer.prompt([
        {
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: [
                    "View All Departments?",
                    "View All Roles?",
                    "View All Employees?",
                    "Add a Department?",
                    "Add a Role?",
                    "Add an Employee?",
                    "Update an Employee Role?",
                    "Quit"
        ]}]).then((data) => {
            choice = data.type;
            if (choice === 'View All Departments?') {
                viewDepartments()
            }if (choice === 'View All Roles?') {
                viewRoles()
            }if (choice === 'View All Employees?') {
                viewEmployees()
            }if (choice === 'Add a Department?') {
                    addDept()
            }if (choice === 'Add a Role?') {
                    addRole()
            }if (choice === 'Add an Employee?') {
                    addEmp()
            }if (choice === 'Update an Employee Role?') {
                    updateRole()
            }if (choice === 'Quit') {
                Quit()
            } else { internInput() }
        })
    };

    Prompt();
