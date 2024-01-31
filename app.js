const commandLineArgs = process.argv.slice(2);
const usernameFlagIndex = commandLineArgs.findIndex((arg) => arg.startsWith('--username'));

if (usernameFlagIndex === -1) {
  console.error('Please provide a valid username using --username argument.');
  process.exit(1);
}

const username = commandLineArgs[usernameFlagIndex].split('=')[1];
console.log(`Welcome to the File Manager, ${username}!`);
