INSERT INTO department (dept_name)
VALUES ("Operations"),
       ("Human Resources"),
       ("Sales"),
       ("Marketing"),
       ("Customer Services"),
       ("Accounting"),
       ("Tech Support"),
       ("Dev Team");

INSERT INTO roles (title, salary, department_id)
VALUES ("CEO", 150000, 1),
       ("Human Resources Director", 100000, 2),
       ("Sales Team Manager", 120000, 3),
       ("Marketing Manager", 120000, 4),
       ("Customer Support Manager", 90000, 5),
       ("Accountant", 125000, 6),
       ("Technical Support Agent", 75000, 7),
       ("Software Engineer", 125000, 8);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Emma", "Graham", 3, 4),
       ("Alec", "Schindler", 2, null),
       ("Adele", "Maxwell", 3, null),
       ("Marissa", "Tuttle", 4, null),
       ("Julia", "Graham", 5, 1),
       ("Oliver", "Graham", 6, null),
       ("Tim", "Graham", 7, null),
       ("Alfonso", "Gonzalez", 8, 8);
       
