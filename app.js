const fs = require('fs');
// const open = require('open');
const inquirer = require('inquirer');
// const generateHTML = require('./generateHTML.js');
// const axios = require('axios');
// const convertFactory = require('electron-html-to');
const parse = require('node-html-parser').parse;
const Employee = require("./lib/employee.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const Manager = require("./lib/Manager.js");
const Generate = require("./lib/generateHTML.js");

const employeeArray = []
const managerArray = [];
const engineerArray = [];
const internArray = [];

const roleQues = [
    {
        type: 'list',
        message: 'What role are you adding to your team?',
        name: 'teamRole',
        choices: [
            'manager',
            'engineer',
            'intern',
            'no further team members required'
        ]
    }
]

const managerQues = [
    {
        type: 'input',
        message: 'What is your name?',
        name: 'employeeName',
    },
    {
        type: 'input',
        message: 'What is your ID number?',
        name: 'employeeID',
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'employeeEmail',
    },
    {
        type: 'input',
        message: 'What is your office number?',
        name: 'officeNum',
    }
]

const engineerQues = [
    {
        type: 'input',
        message: 'What is their name?',
        name: 'employeeName',
    },
    {
        type: 'input',
        message: 'What is their ID number?',
        name: 'employeeID',
    },
    {
        type: 'input',
        message: 'What is their email?',
        name: 'employeeEmail',
    },
    {
        type: 'input',
        message: 'What is their gitHub username?',
        name: 'gitHub',
    }
]

const internQues = [
    {
        type: 'input',
        message: 'What is their name?',
        name: 'employeeName',
    },
    {
        type: 'input',
        message: 'What is their ID number?',
        name: 'employeeID',
    },
    {
        type: 'input',
        message: 'What is their email?',
        name: 'employeeEmail',
    },
    {
        type: 'input',
        message: 'What school are they attending?',
        name: 'schoolName',
    }
]

const mainHTML = Generate.main();
fs.writeFile("./templates/main.html", mainHTML, function (err) {
    if (err) {
        return console.log(err);
    }
}) 

initiateQues();

function initiateQues() {
    inquirer.prompt(roleQues)
        .then((roleData) => {
            if (roleData.teamRole === 'manager') {
                // console.log('Manager Selected');
                managerQuestions(managerQues, roleData);
            }
            else if (roleData.teamRole === 'engineer') {
                // console.log('Engineer Selected');
                engineerQuestions(engineerQues, roleData);
            }
            else if (roleData.teamRole === 'intern') {
                // console.log('Intern Selected');
                internQuestions(internQues, roleData);
            }
            else {
                console.log('Done creating team');
                console.log(managerArray);
                console.log(engineerArray);
                console.log(internArray);
                // const inputArray = JSON.stringify(employeeArray);
                // console.log(inputArray);
                // console.log(employeeArray[0].employeeName);
            }
        })
}

function managerQuestions(ques, role) {
    return inquirer.prompt(ques)
    .then((data) => {
        console.log(data);
        console.log(role);
        managerArray.push(data);
        console.log(managerArray);
        const manager = new Manager(data.employeeName, data.employeeID, data.employeeEmail, data.officeNum);
        console.log(manager);
        console.log(manager.getName());
        // const managerHtml = JSON.stringify(manager);
        const managerHtml = Generate.manager(manager);
        console.log(managerHtml);

        fs.readFile('./templates/main.html', 'utf8', (err,html) =>{
            if(err) {
                throw err;
            }
            const root = parse(html);
            const body = root.querySelector('#managerContent');
            body.appendChild(managerHtml);

            console.log(root.toString());
            // const managerHtml = `${data.employeeName, data.employeeID, data.employeeEmail, data.schoolName}`
            fs.writeFile("./templates/main.html", root.toString(), function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            initiateQues();
        });
    })
}

function engineerQuestions(ques, role) {
    return inquirer.prompt(ques)
    .then((data) => {
        console.log(data);
        console.log(role);
        engineerArray.push(data);
        console.log(engineerArray);
        const engineer = new Engineer(data.employeeName, data.employeeID, data.employeeEmail, data.gitHub);
        console.log(engineer);
        // const engineerHtml = JSON.stringify(engineer);
        const engineerHtml = Generate.engineer(engineer);
        console.log(engineerHtml);
        // const internHtml = `${data.employeeName, data.employeeID, data.employeeEmail, data.schoolName}`
        fs.appendFile("./templates/main.html", engineerHtml, function (err) {
            if (err) {
                return console.log(err);
            }
        })
        initiateQues();
    })
}

function internQuestions(ques, role) {
    return inquirer.prompt(ques)
    .then((data) => {
        console.log(data);
        console.log(role);
        internArray.push(data);
        console.log(internArray);
        const intern = new Intern(data.employeeName, data.employeeID, data.employeeEmail, data.schoolName);
        console.log(intern);
        // const internHtml = JSON.stringify(intern);
        const internHtml = Generate.intern(intern);
        console.log(internHtml);
        // const internHtml = `${data.employeeName, data.employeeID, data.employeeEmail, data.schoolName}`
        fs.appendFile("./templates/main.html", internHtml, function (err) {
            if (err) {
                return console.log(err);
            }
        })
        initiateQues();
    })
}