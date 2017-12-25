import React from 'react';
import { render as renderDOM } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import '../public/style.scss';

const render = (Component) => {
  renderDOM(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const nextRoot = require('./components/Root');
    render(nextRoot);
  });
}
