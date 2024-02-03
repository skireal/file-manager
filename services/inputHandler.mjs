import * as userService from './userService.mjs';
import * as fileService from './fileService.mjs';
import { commandsMinArgsRequirements } from '../constants/common.js';

export const handleUserInput = (input, username, rl) => {
  const [command, ...args] = input.trim().split(' ');

  if (!command || args.length < commandsMinArgsRequirements[command]) {
    console.error('Invalid input');
    fileService.printCurrentWorkingDirectory();
    return;
  }

  switch (command) {
    case '.exit':
      console.log(userService.exitMessage(username));
      rl.close();
      break;
    case 'up':
      fileService.goUpper();
      break;
    case 'cd':
      fileService.changeDirectory(args[0]);
      break;
    case 'ls':
      fileService.listFiles();
      break;
    case 'cat':
      fileService.readFile(args[0]);
      break;
    case 'add':
      fileService.createFile(args[0]);
      break;
    case 'rn':
      fileService.renameFile(args[0], args[1]);
      break;
    default:
      console.error('Invalid input');
  }

  fileService.printCurrentWorkingDirectory();
};
