import { FC } from 'react';
import { Table, Badge, Switch, Button } from 'evergreen-ui';

import { User } from 'schema/types';

interface Props {
  users: User[];
  onUserRoleChange?: (id: number, role: string) => void;
  onUserBlock?: (id: number, blocked: boolean) => void;
}

const userRoles = [
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'BASIC', label: 'BASIC' },
];

const getUserRole = (role: string) => {
  return userRoles.find((userRole) => userRole.value === role);
};

export const UsersTable: FC<Props> = ({ users, onUserBlock, onUserRoleChange }) => {
  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell maxWidth={64}>id</Table.TextHeaderCell>
        <Table.TextHeaderCell>First name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Last name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Email</Table.TextHeaderCell>
        <Table.TextHeaderCell maxWidth={100}>Blocked</Table.TextHeaderCell>
        <Table.TextHeaderCell maxWidth={120}>Role</Table.TextHeaderCell>
        <Table.TextHeaderCell maxWidth={100} />
      </Table.Head>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.TextCell maxWidth={64}>{user.id}</Table.TextCell>
            <Table.TextCell>{user.name}</Table.TextCell>
            <Table.TextCell>{user.surname}</Table.TextCell>
            <Table.TextCell>{user.email}</Table.TextCell>
            <Table.TextCell maxWidth={100}>
              <Switch
                checked={user.isBlocked}
                onChange={() => (user.id ? onUserBlock?.(Number(user.id), !user.isBlocked) : null)}
              />
            </Table.TextCell>
            <Table.SelectMenuCell
              maxWidth={120}
              selectMenuProps={{
                options: userRoles,
                selected: getUserRole(user.role)?.value,
                onSelect: (role) => onUserRoleChange?.(Number(user.id), role.label),
                hasFilter: false,
                height: 'max-content',
                width: 120,
                hasTitle: false,
                closeOnSelect: true,
              }}
            >
              <Badge color={getUserRole(user.role)?.value === 'ADMIN' ? 'orange' : 'blue'} marginRight={8}>
                {getUserRole(user.role)?.label}
              </Badge>
            </Table.SelectMenuCell>
            <Table.TextCell maxWidth={100}>
              <Button>Logs</Button>
            </Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
