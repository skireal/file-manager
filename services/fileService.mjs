import { dirname, resolve, isAbsolute } from 'node:path';
import { cwd, chdir } from 'node:process';
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';

export const printCurrentWorkingDirectory = () => {
  const currentDir = cwd();
  console.log(`You are currently in ${currentDir}`);
};

export const goUpper = () => {
  const currentDir = cwd();
  const parentDir = dirname(currentDir);

  if (currentDir === parentDir) {
    console.log('You are already in the root directory. Cannot go up.');
    return;
  }

  chdir(parentDir);
};

export const changeDirectory = (path) => {
  const currentDir = cwd();
  const newPath = isAbsolute(path) ? path : resolve(currentDir, path);

  if (existsSync(newPath)) {
    chdir(newPath);
  } else {
    console.log('Operation failed.');
  }
};

export const listFiles = async () => {
  const currentDir = cwd();
  const filesAndFolders = await readdir(currentDir, { withFileTypes: true });

  const dataForTable = [];

  filesAndFolders.forEach((dirent) => {
    const type = dirent.isDirectory() ? 'Directory' : 'File';
    dataForTable.push({
      name: dirent.name,
      type,
    });
  });

  dataForTable.sort((a, b) => {
    return a.type === 'Directory' ? -1 : 1;
  });

  console.table(dataForTable);
};
