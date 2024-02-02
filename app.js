import * as readline from 'node:readline';
import { stdin as input, stdout as output, chdir } from 'node:process';
import * as userService from './services/userService.mjs';
import * as inputHandler from './services/inputHandler.mjs';
import * as fileService from './services/fileService.mjs';
import os from 'node:os';

const setInitialWorkingDirectory = () => {
  const homeDirectory = os.homedir();
  chdir(homeDirectory);
};

const main = async () => {
  setInitialWorkingDirectory();

  const commandLineArgs = process.argv.slice(2);
  const username = userService.getUsernameFromCommandLineArgs(commandLineArgs);

  console.log(userService.welcomeMessage(username));
  fileService.printCurrentWorkingDirectory();

  const rl = readline.createInterface({ input, output });

  rl.on('line', (input) => {
    inputHandler.handleUserInput(input, username, rl);
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
