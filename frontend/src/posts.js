// in src/posts.js
import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';
import { Show, SimpleShowLayout, DateField, ShowButton, EditButton, RichTextField } from 'admin-on-rest';

export const PostList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="userId" />
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
            <ShowButton />
        </Datagrid>
    </List>
);

export const PostShow = (props) => (
  <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="teaser" />
            <RichTextField source="body" />
            <DateField label="Publication date" source="created_at" />
        </SimpleShowLayout>
    </Show>

);
