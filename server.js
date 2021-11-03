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
