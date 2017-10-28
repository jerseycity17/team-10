// in src/App.js
import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import restClient from './restClient'
import { PostList } from './posts';

const App = () => (
    <Admin restClient={restClient}>
        <Resource name="posts" list={PostList} />
    </Admin>
);

export default App;
