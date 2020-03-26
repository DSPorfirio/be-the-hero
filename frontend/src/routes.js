import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import UpdateIncident from './pages/UpdateIncident';
import { PrivateRoute } from './privateRoute';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />

                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/incident/new" component={NewIncident} />

                <PrivateRoute path="/incident/update" component={UpdateIncident} />
            </Switch>
        </BrowserRouter>
    );
}