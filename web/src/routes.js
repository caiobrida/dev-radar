import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Profile from './pages/profile/Profile';


function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/profile/:id' component={Profile} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;