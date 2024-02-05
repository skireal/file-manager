export const getUsernameFromCommandLineArgs = (args) => {
  const usernameFlagIndex = args.findIndex((arg) => arg.startsWith('--username'));

  if (usernameFlagIndex === -1) {
    console.error('Please provide a valid username using --username argument.');
    process.exit(1);
  }

  return args[usernameFlagIndex].split('=')[1];
};

export const welcomeMessage = (username) => `Welcome to the File Manager, ${username}!`;

export const exitMessage = (username) => `Thank you for using File Manager, ${username}, goodbye!`;
