// in src/posts.js
import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';
import { Show, SimpleShowLayout, DateField, ShowButton, EditButton, RichTextField } from 'admin-on-rest';

export const FamilyList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="houseHead" />
            <TextField source="employment" />
            <TextField source="graduated" />
            <ShowButton />
        </Datagrid>
    </List>
);

export const FamilyShow = (props) => (
  <Show {...props}>
        <SimpleShowLayout>
          <TextField source="houseHead" />
          <TextField source="primaryPhone" />
          <TextField source="secondaryPhone" />
          <TextField source="email" />
          <TextField source="employment" />
          <TextField source="placeOfStay" />
          <TextField source="wage" />
          <TextField source="graduated" />
        </SimpleShowLayout>
    </Show>

);
