import { createReadStream, createWriteStream } from 'node:fs';
import { cwd } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { join, isAbsolute, basename } from 'node:path';

async function processFile(filePath, targetDir, transformStream, extension = '') {
  try {
    filePath = filePath.startsWith('\\') ? filePath.substring(1) : filePath;
    targetDir = targetDir.startsWith('\\') ? targetDir.substring(1) : targetDir;
    const absoluteFilePath = isAbsolute(filePath) ? filePath : join(cwd(), filePath);
    const absoluteTargetDir = isAbsolute(targetDir) ? targetDir : join(cwd(), targetDir);
    const outputFileName = basename(absoluteFilePath, '.br') + extension;
    const outputFilePath = join(absoluteTargetDir, outputFileName);

    await pipeline(createReadStream(absoluteFilePath), transformStream(), createWriteStream(outputFilePath));
  } catch {
    console.error('Operation failed');
  }
}

export const compressFile = async (filePath, targetDir) => {
  await processFile(filePath, targetDir, createBrotliCompress, '.br');
};

export const decompressFile = async (filePath, targetDir) => {
  await processFile(filePath, targetDir, createBrotliDecompress);
};
