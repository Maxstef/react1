import React from 'react';
import config from 'react-global-configuration';

config.set({ 
  api: 'http://localhost:3000/'
});

export default class Config extends React.Component {}