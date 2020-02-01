const fs = require('fs');
const open = require('open');
const inquirer = require('inquirer');
// const joi = require('joi');
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

function validateName(name) {
    const inputName = name;
    // const nameRegex = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/
    const nameRegex = /^(?=.*?[a-zA-Z])[a-zA-Z\s]+$/
    const nameResult = nameRegex.test(inputName);
    if (nameResult) {
        return true;
    }
    else {
        console.log(' Enter at least one alphabetic character!');
    }
}

function validateNum(num) {
    const inputNum = num;
    const numRegex = /^(?=.*?[0-9])[0-9]+$/
    const numResult = numRegex.test(inputNum);
    if (numResult) {
        return true;
    }
    else {
        console.log(' Enter at least one numeric character!');
    }
}

function validateEmail(email) {
    const inputEmail = email;
    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    const emailRegex = /^\w+([\.-]?\w+)*@[a-z]+([\.-]?[a-z]+)*(\.[a-z]{2,4})+$/
    const emailResult = emailRegex.test(inputEmail);
    if (emailResult) {
        return true;
    }
    else {
        console.log(' Enter a valid email eg. pozengineer@hotmail.com');
    }
}

function validateAlphaNum(alphaNum) {
    const inputAlphaNum = alphaNum;
    const alphaNumRegex = /^(?=.*?[a-zA-Z])[a-zA-Z0-9\s!@#$-_%&]+$/
    const alphaNumResult = alphaNumRegex.test(inputAlphaNum);
    if (alphaNumResult) {
        return true;
    }
    else {
        console.log(' Enter at least one alphabetic character!');
    }
}

// function onValidation(err,val){
//     if(err) {
//         console.log(err.message);
//         return err.message;         
//     }
//     else {
//         return true;            
//     }        
// }

// function validate(name) {
//        var schema = joi.string().required();
//        return joi.validate(name, schema, onValidation);
// }

// function validate(num) {
//        var schema = joi.number().required().min(0).max(99);
//        return joi.validate(num, schema , onValidation);
// }

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
        validate: validateName
    },
    {
        type: 'input',
        message: 'What is your ID number?',
        name: 'employeeID',
        validate: validateNum
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'employeeEmail',
        validate: validateEmail
    },
    {
        type: 'input',
        message: 'What is your office number?',
        name: 'officeNum',
        validate: validateNum
    }
]

const engineerQues = [
    {
        type: 'input',
        message: 'What is their name?',
        name: 'employeeName',
        validate: validateName
    },
    {
        type: 'input',
        message: 'What is their ID number?',
        name: 'employeeID',
        validate: validateNum
    },
    {
        type: 'input',
        message: 'What is their email?',
        name: 'employeeEmail',
        validate: validateEmail
    },
    {
        type: 'input',
        message: 'What is their gitHub username?',
        name: 'gitHub',
        validate: validateAlphaNum
    }
]

const internQues = [
    {
        type: 'input',
        message: 'What is their name?',
        name: 'employeeName',
        validate: validateName
    },
    {
        type: 'input',
        message: 'What is their ID number?',
        name: 'employeeID',
        validate: validateNum
    },
    {
        type: 'input',
        message: 'What is their email?',
        name: 'employeeEmail',
        validate: validateEmail
    },
    {
        type: 'input',
        message: 'What school are they attending?',
        name: 'schoolName',
        validate: validateAlphaNum
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
            createManagerCard(managerArray);
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
        // console.log(managerArray);
        // const manager = new Manager(data.employeeName, data.employeeID, data.employeeEmail, data.officeNum);
        managerArray.push(data);
        // const managerHtml = Generate.manager(manager);
        // console.log(managerHtml);
        initiateQues();
    })
}

function createManagerCard(dataArray) {
    const allManagerContent = [];
    dataArray.forEach(data => {
        console.log(data);
        const newManager = new Manager(data.employeeName, data.employeeID, data.employeeEmail, data.officeNum);
        // console.log(manager.getName());
        // const managerHtml = JSON.stringify(manager);
        const managerHtml = Generate.manager(newManager);
        console.log(managerHtml);
        allManagerContent.push(managerHtml);
        // fs.appendFile("./templates/manager.html", managerHtml, function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        // })
    });
    // allManagerContent.join('');
    console.log(allManagerContent);
    fs.readFile('./templates/main.html', 'utf8', (err,html) =>{
        if(err) {
            throw err;
        }
        // const testbody = html.toString();
        // console.log("testbody: " + testbody);
        // const body = hparse.parse(testbody, {style: true});
        const root = parse(html);
        const body = root.querySelector('#managerContent');
        allManagerContent.forEach(element => body.appendChild(element));
        // body.appendChild(allManagerContent);

        // console.log(root.toString());
        // const managerHtml = `${data.employeeName, data.employeeID, data.employeeEmail, data.schoolName}`
        fs.writeFile("./templates/main.html", root.toString(), function (err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log(engineerArray);
        createEngineerCard(engineerArray);
    });
}

function engineerQuestions(ques, role) {
    return inquirer.prompt(ques)
    .then((data) => {
        console.log(data);
        console.log(role);
        // console.log(managerArray);
        // const manager = new Manager(data.employeeName, data.employeeID, data.employeeEmail, data.officeNum);
        engineerArray.push(data);
        // const managerHtml = Generate.manager(manager);
        // console.log(managerHtml);
        initiateQues();
    })
}

function createEngineerCard(dataArray) {
    const allEngineerContent = [];
    dataArray.forEach(data => {
        console.log(data);
        const newEngineer = new Engineer(data.employeeName, data.employeeID, data.employeeEmail, data.gitHub);
        // console.log(manager.getName());
        // const managerHtml = JSON.stringify(manager);
        const engineerHtml = Generate.engineer(newEngineer);
        console.log(engineerHtml);
        allEngineerContent.push(engineerHtml);
        // fs.appendFile("./templates/manager.html", managerHtml, function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        // })
    });
    // allEngineerContent.join('');
    console.log(allEngineerContent);
    fs.readFile('./templates/main.html', 'utf8', (err,html) =>{
        if(err) {
            throw err;
        }
        const root = parse(html);
        console.log(root.toString());
        const body = root.querySelector('#engineerContent');
        allEngineerContent.forEach(element => body.appendChild(element));
        // body.appendChild(allEngineerContent);

        // console.log(root.toString());
        // const managerHtml = `${data.employeeName, data.employeeID, data.employeeEmail, data.schoolName}`
        fs.writeFile("./templates/main.html", root.toString(), function (err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log(internArray);
        createInternCard(internArray);
    });
}

function internQuestions(ques, role) {
    return inquirer.prompt(ques)
    .then((data) => {
        console.log(data);
        console.log(role);
        // console.log(managerArray);
        // const manager = new Manager(data.employeeName, data.employeeID, data.employeeEmail, data.officeNum);
        internArray.push(data);
        // const managerHtml = Generate.manager(manager);
        // console.log(managerHtml);
        initiateQues();
    })
}

function createInternCard(dataArray) {
    const allInternContent = [];
    dataArray.forEach(data => {
        console.log(data);
        const newIntern = new Intern(data.employeeName, data.employeeID, data.employeeEmail, data.schoolName);
        // console.log(manager.getName());
        // const managerHtml = JSON.stringify(manager);
        const internHtml = Generate.intern(newIntern);
        console.log(internHtml);
        allInternContent.push(internHtml);
        // fs.appendFile("./templates/manager.html", managerHtml, function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        // })
    });
    // allInternContent.join('');
    console.log(allInternContent);
    fs.readFile('./templates/main.html', 'utf8', (err,html) =>{
        if(err) {
            throw err;
        }
        const root = parse(html);
        console.log(root.toString());
        const body = root.querySelector('#internContent');
        allInternContent.forEach(element => body.appendChild(element));
        // body.appendChild(allInternContent);

        // console.log(root.toString());
        // const managerHtml = `${data.employeeName, data.employeeID, data.employeeEmail, data.schoolName}`
        fs.writeFile("./templates/main.html", root.toString(), function (err) {
            if (err) {
                return console.log(err);
            }
            else {
                open(`./templates/main.html`);
            }
        });
    });
}