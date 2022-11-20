import React, { FC } from 'react';
import { Table } from 'evergreen-ui';

import { User } from 'schema/types';
import { Select } from 'components/core/Select';

interface Props {
  users: User[];
}

const userRoles = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'BASIC', label: 'Basic' },
];

const getUserRole = (role: string) => {
  return userRoles.find((userRole) => userRole.value === role);
};

export const UsersTable: FC<Props> = ({ users }) => {
  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>id</Table.TextHeaderCell>
        <Table.TextHeaderCell>First name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Last name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Email</Table.TextHeaderCell>
        <Table.TextHeaderCell>Role</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.TextCell>{user.id}</Table.TextCell>
            <Table.TextCell>{user.name}</Table.TextCell>
            <Table.TextCell>{user.surname}</Table.TextCell>
            <Table.TextCell>{user.email}</Table.TextCell>
            <Table.TextCell>
              <Select options={userRoles} defaultValue={getUserRole(user.role)?.value} width='100%' />
            </Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
