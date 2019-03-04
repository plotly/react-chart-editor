import {configure, getStorybook, setAddon} from '@storybook/react';

function loadStories() {
  require('../src/__stories__/index.js');
  // You can require as many stories as you need.
}
import createPercyAddon from '@percy-io/percy-storybook';
const {percyAddon, serializeStories} = createPercyAddon();
setAddon(percyAddon);

configure(loadStories, module);

// NOTE: if you're using the Storybook options addon, call serializeStories *BEFORE* the setOptions call
serializeStories(getStorybook);
