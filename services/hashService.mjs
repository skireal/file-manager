import { createReadStream } from 'node:fs';
import { cwd } from 'node:process';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { join, isAbsolute } from 'node:path';

export const calculateHash = async (filePath) => {
  try {
    filePath = filePath.startsWith('\\') ? filePath.substring(1) : filePath;
    const absoluteFilePath = isAbsolute(filePath) ? filePath : join(cwd(), filePath);

    const hash = createHash('sha256');
    const readStream = createReadStream(absoluteFilePath);

    await pipeline(readStream, hash);
    console.log(hash.digest('hex'));
  } catch {
    console.error('Operation failed');
  }
};
