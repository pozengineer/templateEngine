const fs = require('fs');
// const open = require('open');
const inquirer = require('inquirer');
// const generateHTML = require('./generateHTML.js');
// const axios = require('axios');
// const convertFactory = require('electron-html-to');
const Employee = require("./lib/employee.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const Manager = require("./lib/Manager.js");
const htmlString = require("./lib/htmlString.js");
const team = htmlString;

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

initiateQues();

function initiateQues() {
    inquirer.prompt(roleQues)
    .then((roleData) => {
        if(roleData.teamRole === 'manager') {
            // console.log('Manager Selected');
            managerQuestions(managerQues, roleData);
        }
        else if(roleData.teamRole === 'engineer') {
            // console.log('Engineer Selected');
            engineerQuestions(engineerQues, roleData);
        }
        else if(roleData.teamRole === 'intern') {
            // console.log('Intern Selected');
            internQuestions(internQues, roleData);
        }
        else {
            console.log('Done creating team');
            console.log(employeeArray);
            const inputArray = JSON.stringify(employeeArray);
            console.log(inputArray);
            console.log(employeeArray[0].employeeName);
        }
    })
}

function managerQuestions(ques, role) {
    inquirer.prompt(ques)
    .then((data) => {
        console.log(data);
        console.log(role);
        employeeArray.push(data);
        console.log(employeeArray);
        const manager = new Manager(data.employeeName, data.employeeID, data.employeeEmail, data.officeNum);
        console.log(manager);
        const managerHtml = JSON.stringify(manager);
        console.log(managerHtml);
        // const managerHtml = `${data.employeeName, data.employeeID, data.employeeEmail, data.schoolName}`
        fs.appendFile("manager.html", managerHtml, function (err) {
            if (err) {
                return console.log(err);
            }
        })
        initiateQues();
    })
}

function engineerQuestions(ques, role) {
    inquirer.prompt(ques)
    .then((data) => {
        console.log(data);
        console.log(role);
        employeeArray.push(data);
        console.log(employeeArray);
        const engineer = new Engineer(data.employeeName, data.employeeID, data.employeeEmail, data.gitHub);
        console.log(engineer);
        const engineerHtml = JSON.stringify(engineer);
        console.log(engineerHtml);
        // const internHtml = `${data.employeeName, data.employeeID, data.employeeEmail, data.schoolName}`
        fs.appendFile("engineer.html", engineerHtml, function (err) {
            if (err) {
                return console.log(err);
            }
        })
        initiateQues();
    })
}

function internQuestions(ques, role) {
    inquirer.prompt(ques)
    .then((data) => {
        console.log(data);
        console.log(role);
        employeeArray.push(data);
        console.log(employeeArray);
        const intern = new Intern(data.employeeName, data.employeeID, data.employeeEmail, data.schoolName);
        console.log(intern);
        const internHtml = JSON.stringify(intern);
        console.log(internHtml);
        // const internHtml = `${data.employeeName, data.employeeID, data.employeeEmail, data.schoolName}`
        fs.appendFile("intern.html", internHtml, function (err) {
            if (err) {
                return console.log(err);
            }
        })
        initiateQues();
    })
}