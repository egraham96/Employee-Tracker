//Require all NPM dependencies needed for application
//const express = require('express');
require('dotenv').config()
const mysql = require('mysql2');
const inquirer = require('inquirer');
const PORT = 3020;
//const app = express();

//Express middleware
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

//Connect to MySQL Database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_db'
    },
    console.log(`Connected to employee_db database on port ${PORT}`)
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
            console.log(option);
            if (option == 'View All Departments?') {
                //console.log("view depts");
                viewDepartments();
            } else if (option == 'View All Roles?') {
                //console.log("view roles");
                viewRoles();
            } else if (option == 'View All Employees?') {
                //console.log("view emp");
                viewEmployees();
            } else if (option == 'Add a Department?') {
                //console.log("add dept");
                addDept();
            } else if (option == 'Add a Role?') {
                //console.log("add role")
                addRole()
            } else if (option == 'Add an Employee?') {
                //console.log("add emp")
                addEmp()
            } else if (option == 'Update an Employee Role?') {
                //console.log("update emp role")
                updateRole()
            } else if (option == 'Quit') {
                //console.log("quit")
                Quit();
            } else {
                console.log("Something has gone wrong")
            }
        });
}

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw error;
        console.table(results);
        Prompt();
    });
}

function viewRoles() {
    db.query(`SELECT roles.id, roles.title, roles.salary, department.dept_name AS 'department' FROM roles
    JOIN department ON department.id = roles.department_id
    ORDER BY roles.id`, function (err, results) {
        if (err) throw error;
        console.table(results);
        Prompt();
    });
}

function viewEmployees() {
    db.query(`SELECT employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.title, 
    roles.salary, 
    dept_name AS 'department',
    CONCAT(e.first_name, ' ',e.last_name) AS manager FROM employees
    INNER JOIN roles ON roles.id = employees.roles_id 
    INNER JOIN department ON department.id = roles.department_id
    LEFT JOIN employees e ON employees.manager_id = e.id
    ORDER BY employees.id`, function (err, results) {
        if (err) throw err;
        console.table(results);
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
            dept_name: data.newdept
        },
            function (err) {
                if (err) throw err
                console.table(data);
                Prompt();
            }
        )

    })
}

var roleOptions = [];
function chooseRole() {
    db.query(`SELECT roles.title FROM roles`,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            for (var i = 0; i < results.length; i++) {
                roleOptions.push(results[i].title);
            }
        })
    return roleOptions;
};







function addRole() {
    db.query(`SELECT department.id, department.dept_name FROM department`, (err, results) => {
        const deptlist = results.map((obj) => ({ name: obj.dept_name, value: obj.id }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: "input",
                message: "What is the salary of the new role?",
                name: "salary"
            },
            {
                type: "list",
                message: "Please choose the department for the role?",
                name: "dept",
                choices: deptlist
            }
        ]).then(function (data) {
            db.query("INSERT INTO roles SET ?", {
                title: data.title,
                salary: data.salary,
                department_id: data.dept,

            },
                function (err) {
                    if (err) throw err
                    console.log("New Role Entered!!!");
                    Prompt();
                }
            )

        });
    });
}

function addEmp() {
    db.query(`SELECT id, first_name, last_name FROM employees WHERE manager_id IS NULL`, function (err, results) {
        const managerOptions = results.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));

        inquirer.prompt([
            {
                type: "input",
                name: "first",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "manager",
                message: "Who is this employee's manager?",
                choices: managerOptions
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: chooseRole()
            }
        ]).then(function (data) {
            let finalroleId = chooseRole().indexOf(data.role) + 1;
            console.log(finalroleId)
            let managerId = managerOptions.indexOf(results.managerid)
            db.query("INSERT INTO employees SET ?", {
                first_name: data.first,
                last_name: data.last,
                manager_id: managerId,
                roles_id: finalroleId

            },
                function (err) {
                    if (err) throw err
                    console.table(data);
                    Prompt();
                }
            )

        });
    })
}

function updateRole (){
db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title FROM employees 
            JOIN roles ON employees.roles_id = roles.id`, (err, results) => {
                const empChoices = results.map(({id, first_name, last_name}) => ({name: `${first_name} ${last_name}`, value: id}));   
                inquirer.prompt([
                    {
                        name: "name",
                        type: "list",
                        message: "Please choose which employee:",
                        choices: empChoices
                    },
                    {
                        name: "role", 
                        type: "list", 
                        message: "Enter the Employee's new role:",
                        choices: chooseRole()
                    }
    ]).then((data) => {
        let roleId = chooseRole().indexOf(data.role) +1
        db.query(`UPDATE employees SET roles_id = ${roleId} WHERE id = ${data.name}`, 
            (err,results) => {
                if (err) console.log(err)
                else console.log('Employee Update was Successful\r\n')
                Prompt();
            }
                    
        )
     });
    });}


function Quit() { process.exit }

Prompt();



//app.listen(PORT, () => {
 //console.log(`Server running on port ${PORT}`);
 //});