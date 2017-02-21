

import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { render } from 'react-dom';

import App from './Components/App';

require(`./main.scss`);

document.addEventListener(`DOMContentLoaded`, () => {
    render((
        <Router history={ browserHistory }>
            <Route path='/' component={ App } />
        </Router>
    ), document.querySelector(`#app`));
}, true);
