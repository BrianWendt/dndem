import React from 'react';
import ReactDOM from 'react-dom';

import { Route, HashRouter as Router } from 'react-router-dom'

import EncounterPage from './pages/EncounterPage';
import IndexPage from './pages/IndexPage';
import MonsterPage from './pages/MonsterPage';
import MonstersPage from './pages/MonstersPage';
import ErrorPage from './pages/ErrorPage';

import * as serviceWorker from './serviceWorker';

const routing = (
        <Router basename={process.env.PUBLIC_URL}>
            <div>
                <Route path="/" component={IndexPage} exact  />
                <Route path="/monsters/:query?" component={MonstersPage} />
                <Route path="/monster/:id" component={MonsterPage} />
                <Route path="/encounter/" component={EncounterPage} />
                <Route path="/error/:code" component={ErrorPage} />
            </div>
        </Router>
        )

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();

window.$ = window.jQuery = require('jquery')
