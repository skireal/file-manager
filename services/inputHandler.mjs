import * as userService from './userService.mjs';
import * as fileService from './fileService.mjs';
import * as osService from './osService.mjs';
import * as hashService from './hashService.mjs';
import * as compressService from './compressService.mjs';
import { commandsMinArgsRequirements } from '../constants/common.js';

const commandActions = {
  '.exit': (_, username, rl) => {
    console.log(userService.exitMessage(username));
    rl.close();
  },
  up: () => fileService.goUpper(),
  cd: (args) => fileService.changeDirectory(args[0]),
  ls: () => fileService.listFiles(),
  cat: (args) => fileService.readFile(args[0]),
  add: (args) => fileService.createFile(args[0]),
  rn: (args) => fileService.renameFile(args[0], args[1]),
  cp: (args) => fileService.copyFile(args[0], args[1]),
  mv: (args) => fileService.moveFile(args[0], args[1]),
  rm: (args) => fileService.deleteFile(args[0]),
  os: (args) => osService.handleOSCommand(args[0]),
  hash: (args) => hashService.calculateHash(args[0]),
  compress: (args) => compressService.compressFile(args[0], args[1]),
  decompress: (args) => compressService.decompressFile(args[0], args[1]),
};

export const handleUserInput = (input, username, rl) => {
  const [command, ...args] = input.trim().split(' ');

  if (!command || args.length < commandsMinArgsRequirements[command]) {
    console.error('Invalid input');
    fileService.printCurrentWorkingDirectory();
    return;
  }

  const action = commandActions[command];
  if (action) {
    action(args, username, rl);
  } else {
    console.error('Invalid input');
  }

  fileService.printCurrentWorkingDirectory();
};
