// in src/App.js
import Dashboard from './Dashboard';
import authClient from './authClient';
import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';

import { PostList, PostShow } from './posts';

const App = () => (
    <Admin authClient = {authClient} restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')}>
        <Resource name="posts" list={PostList} show={PostShow} />
    </Admin>
);

export default App;
