import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import * as userService from './services/userService.mjs';

const printCurrentWorkingDirectory = () => {
  const cwd = process.cwd();
  console.log(`You are currently in ${cwd}`);
};

const handleUserInput = (input, username, rl) => {
  printCurrentWorkingDirectory();
  if (input === '.exit') {
    console.log(userService.exitMessage(username));
    rl.close();
  }
};

const main = async () => {
  const commandLineArgs = process.argv.slice(2);
  const username = userService.getUsernameFromCommandLineArgs(commandLineArgs);

  console.log(userService.welcomeMessage(username));
  printCurrentWorkingDirectory();

  const rl = readline.createInterface({ input, output });

  rl.on('line', (input) => {
    handleUserInput(input, username, rl);
  });

  rl.on('SIGINT', () => {
    console.log(userService.exitMessage(username));
    rl.close();
  });

  rl.on('close', () => {
    process.exit(0);
  });
};

main();
