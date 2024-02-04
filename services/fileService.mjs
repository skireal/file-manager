import { dirname, resolve, isAbsolute, join } from 'node:path';
import { cwd, chdir } from 'node:process';
import { existsSync, createReadStream, createWriteStream } from 'node:fs';
import { readdir, writeFile, rename, unlink } from 'node:fs/promises';

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
  filePath = filePath.startsWith('\\') ? filePath.substring(1) : filePath;
  const absoluteFilePath = isAbsolute(filePath) ? filePath : join(cwd(), filePath);
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
  filePath = filePath.startsWith('\\') ? filePath.substring(1) : filePath;
  try {
    const absoluteFilePath = isAbsolute(filePath) ? filePath : join(cwd(), filePath);
    const fileDirectory = dirname(absoluteFilePath);
    const newFilePath = join(fileDirectory, newName);
    await rename(absoluteFilePath, newFilePath);
  } catch {
    console.error('Operation failed');
  }
};

export const copyFile = async (filePath, targetDir) => {
  filePath = filePath.startsWith('\\') ? filePath.substring(1) : filePath;
  targetDir = targetDir.startsWith('\\') ? targetDir.substring(1) : targetDir;

  const absoluteFilePath = isAbsolute(filePath) ? filePath : join(process.cwd(), filePath);
  const absoluteTargetDir = isAbsolute(targetDir) ? targetDir : join(process.cwd(), targetDir);
  const fileName = absoluteFilePath.split('\\').pop();
  const targetFilePath = join(absoluteTargetDir, fileName);

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(absoluteFilePath);
    const writeStream = createWriteStream(targetFilePath);

    readStream.on('error', () => reject(new Error('Operation failed ййй')));
    writeStream.on('error', () => reject(new Error('Operation failed ссм')));
    writeStream.on('finish', () => resolve());

    readStream.pipe(writeStream);
  });
};

export const moveFile = async (filePath, targetDir) => {
  await copyFile(filePath, targetDir);
  const absoluteFilePath = isAbsolute(filePath) ? filePath : join(process.cwd(), filePath);
  await unlink(absoluteFilePath);
};
