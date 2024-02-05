import os from 'node:os';

const commandActions = {
  '--EOL': () => {
    console.log(JSON.stringify(os.EOL));
  },
  '--cpus': () => {
    const cpus = os.cpus().map((cpu, index) => ({
      [`CPU ${index + 1}`]: {
        Model: cpu.model,
        ClockRate: `${cpu.speed / 1000} GHz`,
      },
    }));
    console.log(cpus);
  },
  '--homedir': () => {
    console.log(os.homedir());
  },
  '--username': () => {
    console.log(os.userInfo().username);
  },
  '--architecture': () => {
    console.log(os.arch());
  },
  default: () => {
    console.log('Invalid input');
  },
};

export const handleOSCommand = (key) => {
  const action = commandActions[key] || commandActions.default;
  action();
};
