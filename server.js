//Require all NPM dependencies needed for application
//const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
//const PORT = process.env.PORT || 3020;
//const app = express();

// Express middleware
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

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
    "Users have the option to view all of the company's departments, roles and employees,\n",
    "as well as add new department(s), role(s), and employee(s).\n",
    "Finally, users can update a company's list of current employee(s) or quit the application");

const Prompt = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments?',
                    'View All Roles?',
                    'View All Employees?',
                    'Add a Department?',
                    'Add a Role?',
                    'Add an Employee?',
                    'Update an Employee Role?',
                    'Quit',
                ],
            },
        ]).then(data => {
            let option = data.option;
            //console.log(option);
            if (option == 'View All Departments?') {
                console.log("view depts");
                viewDepartments();
            } else if (option == 'View All Roles?') {
                console.log("view roles");
                viewRoles();
            } else if (option == 'View All Employees?') {
                console.log("view emp");
                viewEmployees();
            } else if (option == 'Add a Department?') {
                console.log("add dept");
                addDept();
            } else if (option == 'Add a Role?') {
                console.log("add role")
                //addRole()
            } else if (option == 'Add an Employee?') {
                console.log("add emp")
                //addEmp()
            } else if (option == 'Update an Employee Role?') {
                console.log("update emp role")
                //updateRole()
            } else if (option == 'Quit') {
                console.log("quit")
                Quit();
            } else {
                console.log("Something has gone wrong")
            }
        });
}

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw error;
        console.log(results);
        Prompt();
    });
}

function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) throw error;
        console.log(results);
        Prompt();
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) throw error;
        console.log(results);
        Prompt();
    });
}

function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newdept',
            message: 'What is the name of the department?'
        }
    ]).then(function (data) {
        db.query("INSERT INTO department SET ?", {
            name: data.newdept
        },
            function (err) {
                if (err) throw err
                console.table(data);
                Prompt();
            }
        )

    })
}
function Quit() { process.exit }

Prompt();

/*app.listen(PORT, () => {
 //console.log(`Server running on port ${PORT}`);
 //});*/