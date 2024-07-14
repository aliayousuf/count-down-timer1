#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import Color from 'color';
console.log(chalk.bgMagenta.bold("\n\t*******COUNT DOWN TIMER******* \n\t"));
let timerId; // Type for setTimeout return value
// Function to start the timer
function startTimer(duration) {
    let count = duration / 1000; // Convert milliseconds to seconds for countdown
    console.log(chalk.blue(`Timer started for ${count} seconds.`));
    function tick() {
        const minutes = Math.floor(count / 60);
        const seconds = Math.floor(count % 60);
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const dynamicColor = Color({ r: 123, g: 45, b: 67 });
        console.log(chalk.yellow(formattedTime));
        count--;
        if (count >= 0) {
            timerId = setTimeout(tick, 1000);
        }
        else {
            console.log(chalk.red("Timer stopped."));
        }
    }
    tick(); // Start the countdown
}
// Prompt user to start the timer and for the duration
async function promptUser() {
    const startAnswer = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'start',
            message: chalk.magenta('Do you want to start the timer?'),
            default: false
        }
    ]);
    if (startAnswer.start) {
        const durationAnswer = await inquirer.prompt([
            {
                type: 'input',
                name: 'duration',
                message: chalk.greenBright('Enter the duration in seconds for how long the timer should run:')
            }
        ]);
        const duration = parseFloat(durationAnswer.duration) * 1000; // Convert to milliseconds
        if (!isNaN(duration) && duration > 0) {
            startTimer(duration);
        }
        else {
            console.log(chalk.red('Invalid duration entered. Timer not started.'));
        }
    }
    else {
        console.log(chalk.blue('Timer not started.'));
    }
}
promptUser();
