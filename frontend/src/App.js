// in src/App.js
import Dashboard from './Dashboard';
import authClient from './authClient';
import React from 'react';
import { Admin, Resource } from 'admin-on-rest';

import { PostList, PostShow } from './posts';
import { FamilyList, FamilyShow } from './family';
import restClient from './restClient'

import FamilyIcon from 'material-ui/svg-icons/social/group';

const App = () => (
    <Admin title="Family Promise Admin" authClient = {authClient} restClient={restClient('http://localhost:8080')}>
        <Resource name="family" list={FamilyList} show={FamilyShow} icon={FamilyIcon}/>
    </Admin>
);

export default App;
