import * as userService from './userService.mjs';
import * as fileService from './fileService.mjs';

const commandsMinArgsRequirements = {
  cd: 1,
};

export const handleUserInput = (input, username, rl) => {
  const [command, ...args] = input.trim().split(' ');

  if (!command || (commandsMinArgsRequirements[command] && args.length < commandsMinArgsRequirements[command])) {
    console.log('Invalid input');
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
    default:
      console.log('Invalid input');
  }

  fileService.printCurrentWorkingDirectory();
};
