module.exports = {
  stories: ['../src/__stories__/*.stories.js'],
  core: {
    disableTelemetry: true, // Disables telemetry
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: false,
  },
};
