// in src/App.js
import Dashboard from './Dashboard';
import authClient from './authClient';
import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';

import { PostList, PostShow } from './posts';
import { FamilyList, FamilyShow } from './family';
import restClient from './restClient'


const App = () => (
    <Admin title="Family Promise Admin" authClient = {authClient} restClient={restClient('http://localhost:8080')}>
        <Resource name="posts" list={PostList} show={PostShow} />
        <Resource name="family" list={FamilyList} show={FamilyShow} />
    </Admin>
);

export default App;
