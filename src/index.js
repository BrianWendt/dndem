import React from 'react';
import ReactDOM from 'react-dom';

import { Route, BrowserRouter as Router } from 'react-router-dom'

import EncounterPage from './pages/EncounterPage';
import IndexPage from './pages/IndexPage';
import MonsterPage from './pages/MonsterPage';
import MonstersPage from './pages/MonstersPage';

import * as serviceWorker from './serviceWorker';

const routing = (
        <Router>
            <div>
                <Route path="/" component={IndexPage} exact  />
                <Route path="/monsters/" component={MonstersPage} />
                <Route path="/monster/:id" component={MonsterPage} />
                <Route path="/encounter/" component={EncounterPage} />
            </div>
        </Router>
        )

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
