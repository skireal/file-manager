import { dirname, resolve, isAbsolute, join } from 'node:path';
import { cwd, chdir } from 'node:process';
import { existsSync, createReadStream, createWriteStream } from 'node:fs';
import { readdir, writeFile, rename, unlink } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';

export const printCurrentWorkingDirectory = () => {
  console.log(`You are currently in ${cwd()}`);
};

export const goUpper = () => {
  const parentDir = dirname(cwd());

  if (cwd() === parentDir) {
    console.log('You are already in the root directory. Cannot go up.');
    return;
  }

  chdir(parentDir);
};

export const changeDirectory = (path) => {
  const newPath = isAbsolute(path) ? path : resolve(cwd(), path);

  if (existsSync(newPath)) {
    chdir(newPath);
  } else {
    console.error('Operation failed');
  }
};

export const listFiles = async () => {
  const filesAndFolders = await readdir(cwd(), { withFileTypes: true });
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

export const readFile = (filePath) => {
  const absoluteFilePath = normalizePath(filePath);
  const readStream = createReadStream(absoluteFilePath, 'utf8');

  readStream.on('data', (chunk) => {
    console.log(chunk);
  });

  readStream.on('error', () => {
    console.error('Operation failed');
  });
};

export const createFile = async (fileName) => {
  const absoluteFilePath = join(cwd(), fileName);
  await writeFile(absoluteFilePath, '', 'utf8');
};

export const renameFile = async (filePath, newName) => {
  try {
    const absoluteFilePath = normalizePath(filePath);
    const fileDirectory = dirname(absoluteFilePath);
    const newFilePath = join(fileDirectory, newName);
    await rename(absoluteFilePath, newFilePath);
  } catch {
    console.error('Operation failed');
  }
};

export const copyFile = async (filePath, targetDir) => {
  try {
    const absoluteFilePath = normalizePath(filePath);
    const absoluteTargetDir = normalizePath(targetDir);
    const fileName = absoluteFilePath.split('\\').pop();
    const targetFilePath = join(absoluteTargetDir, fileName);

    await pipeline(createReadStream(absoluteFilePath), createWriteStream(targetFilePath));
  } catch (error) {
    console.error('Operation failed');
  }
};

export const moveFile = async (filePath, targetDir) => {
  try {
    await copyFile(filePath, targetDir);
    const absoluteFilePath = normalizePath(filePath);
    await unlink(absoluteFilePath);
  } catch (error) {
    console.error('Operation failed');
  }
};

export const deleteFile = async (filePath) => {
  try {
    const absoluteFilePath = normalizePath(filePath);
    await unlink(absoluteFilePath);
  } catch {
    console.error('Operation failed');
  }
};

function normalizePath(path) {
  const normalizedPath = path.startsWith('\\') ? path.substring(1) : path;
  return isAbsolute(normalizedPath) ? normalizedPath : join(cwd(), normalizedPath);
}
