import { FC } from 'react';
import { Table, Badge } from 'evergreen-ui';

import { User } from 'schema/types';

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
        <Table.TextHeaderCell maxWidth={64}>id</Table.TextHeaderCell>
        <Table.TextHeaderCell>First name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Last name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Email</Table.TextHeaderCell>
        <Table.TextHeaderCell>Role</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.TextCell maxWidth={64}>{user.id}</Table.TextCell>
            <Table.TextCell>{user.name}</Table.TextCell>
            <Table.TextCell>{user.surname}</Table.TextCell>
            <Table.TextCell>{user.email}</Table.TextCell>
            <Table.SelectMenuCell selectMenuProps={{ options: userRoles, selected: getUserRole(user.role)?.value, hasFilter: false, height: 'max-content', hasTitle: false, closeOnSelect: true }}>
              <Badge color={getUserRole(user.role)?.value === 'ADMIN' ? 'orange' : 'blue'} marginRight={8}>
                {getUserRole(user.role)?.label}
              </Badge>
            </Table.SelectMenuCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
