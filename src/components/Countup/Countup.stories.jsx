import React from 'react';

import Countup from './';


export default {
  title: 'Example/Countup',
  component: Countup,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Countup {...args} />;

export const Paused = Template.bind({});
Paused.args = {
  time: [1651068386964, 1651068686964],
};

export const Playing = Template.bind({});
Playing.args = {
  time: [1651068404941], // modify this timestamp to be a past date
};



