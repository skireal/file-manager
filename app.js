const commandLineArgs = process.argv.slice(2);
const usernameFlagIndex = commandLineArgs.findIndex((arg) => arg.startsWith('--username'));

if (usernameFlagIndex === -1) {
  console.error('Please provide a valid username using --username argument.');
  process.exit(1);
}

const username = commandLineArgs[usernameFlagIndex].split('=')[1];
const exitMessage = `Thank you for using File Manager, ${username}, goodbye!`;
const welcomeMessage = `Welcome to the File Manager, ${username}!`;
console.log(welcomeMessage);

process.stdin.resume();

process.on('SIGINT', () => {
  console.log(exitMessage);
  process.exit(0);
});

process.on('exit', () => {
  console.log(exitMessage);
});
