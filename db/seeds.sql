INSERT INTO department (name)
VALUES ("Operations"),
       ("Human Resources"),
       ("Sales"),
       ("Marketing"),
       ("Customer Services"),
       ("Accounting"),
       ("Tech Support"),
       ("Dev Team");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 150000, 1),
       ("Human Resources Director", 100000, 2),
       ("Sales Team Manager", 120000, 3),
       ("Marketing Manager", 120000, 4),
       ("Customer Support Manager", 90000, 5),
       ("Accountant", 125000, 6),
       ("Technical Support Agent", 75000, 7),
       ("Software Engineer", 125000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emma", "Graham", 3, 1),
       ("Alec", "Schindler", 2, null),
       ("Adele", "Maxwell", 3, null),
       ("Marissa", "Tuttle", 4, null),
       ("Julia", "Graham", 5, 1),
       ("Ollie", "Graham", 6, null),
       ("Tim", "Graham", 7, null),
       ("Alfonso", "Gonzalez", 8, 1);
       
