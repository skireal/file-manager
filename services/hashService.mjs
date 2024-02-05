import { createReadStream } from 'node:fs';
import { cwd } from 'node:process';
import { createHash } from 'node:crypto';
import { join, isAbsolute } from 'node:path';

export const calculateHash = (filePath) => {
  filePath = filePath.startsWith('\\') ? filePath.substring(1) : filePath;
  const absoluteFilePath = isAbsolute(filePath) ? filePath : join(cwd(), filePath);

  const hash = createHash('sha256');
  const stream = createReadStream(absoluteFilePath);

  stream.on('data', (data) => {
    hash.update(data);
  });

  stream.on('end', () => {
    console.log(hash.digest('hex'));
  });

  stream.on('error', (err) => {
    console.error('Operation failed');
  });
};
