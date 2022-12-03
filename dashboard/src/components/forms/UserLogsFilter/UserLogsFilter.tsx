import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Button, Pane, SelectMenu, SelectMenuItem, TextInput } from 'evergreen-ui';
import styled from 'styled-components';

import { User } from 'schema/types';
import { useMultiSelectState } from 'hooks';
import { RangePicker } from 'components/core';

interface Props {
  users: User[];
  setFilter: (filter: {
    users?: string[];
    actions?: string[];
    entities?: string[];
    dates?: [Date, Date];
    body?: string;
  }) => void;
}

interface SelectRenderProps {
  title?: string;
  options: SelectMenuItem[];
  selected: string[];
  selectedLabel: string | React.ReactNode;
  onSelect: (selected: SelectMenuItem) => void;
  onDeselect: (selected: SelectMenuItem) => void;
}

const generateOptions = (items: string[]) =>
  items.map(
    (item) =>
      ({
        label: item,
        value: item,
      } as const),
  );

const logActionTypes = generateOptions(['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT']);
const logEntityTypes = generateOptions(['USER', 'LINK']);

const FilterValue = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
`;

export const UserLogsFilter: FC<Props> = React.memo(({ users, setFilter }) => {
  const [selectedRange, setSelectedRange] = React.useState<[Date, Date] | null | undefined>(null);
  const [bodyQuery, setBodyQuery] = React.useState<string | null | undefined>(null);
  const userOptions = useMemo(
    () =>
      users.map((user) => ({
        label: user.email,
        value: user.id ?? -1,
      })),
    [users],
  );

  const {
    selected: selectedUsers,
    selectedLabels: selectedUserNames,
    onSelect: onSelectUsers,
    onDeselect: onDeselectUsers,
    setSelected: setSelectedUsers,
  } = useMultiSelectState(userOptions);

  const {
    selected: selectedActions,
    selectedLabels: selectedActionsNames,
    onSelect: onSelectActions,
    onDeselect: onDeselectActions,
    setSelected: setSelectedActions,
  } = useMultiSelectState(logActionTypes);

  const {
    selected: selectedEntities,
    selectedLabels: selectedEntitiesNames,
    onSelect: onSelectEntities,
    onDeselect: onDeselectEntities,
    setSelected: setSelectedEntities,
  } = useMultiSelectState(logEntityTypes);

  const isResetDisabled = useMemo(
    () =>
      selectedUsers.length === 0 &&
      selectedActions.length === 0 &&
      selectedEntities.length === 0 &&
      !selectedRange &&
      !bodyQuery,
    [selectedUsers.length, selectedActions.length, selectedEntities.length, selectedRange, bodyQuery],
  );

  useEffect(() => {
    setFilter({
      users: selectedUsers.length > 0 ? selectedUsers : undefined,
      actions: selectedActions.length > 0 ? selectedActions : undefined,
      entities: selectedEntities.length > 0 ? selectedEntities : undefined,
      dates: selectedRange ?? undefined,
      body: bodyQuery ?? undefined,
    });
  }, [selectedActions, selectedEntities, selectedUsers, setFilter, selectedRange, bodyQuery]);

  const handleReset = useCallback(() => {
    setSelectedUsers([]);
    setSelectedActions([]);
    setSelectedEntities([]);
    setSelectedRange(null);
    setBodyQuery(null);
  }, [setSelectedActions, setSelectedEntities, setSelectedUsers]);

  const renderSelector = useCallback(
    (props: SelectRenderProps) => (
      <SelectMenu
        title={props.title}
        isMultiSelect
        options={props.options}
        selected={props.selected}
        onSelect={props.onSelect}
        onDeselect={props.onDeselect}
      >
        <Button minWidth='100%'>{props.selectedLabel}</Button>
      </SelectMenu>
    ),
    [],
  );

  const renderedUserSelect = useMemo(
    () =>
      renderSelector({
        title: 'Select user',
        options: userOptions,
        selected: selectedUsers,
        selectedLabel: <FilterValue>{selectedUserNames || 'Select user...'}</FilterValue>,
        onSelect: onSelectUsers,
        onDeselect: onDeselectUsers,
      }),
    [onDeselectUsers, onSelectUsers, renderSelector, selectedUserNames, selectedUsers, userOptions],
  );

  const renderedActionsSelect = useMemo(
    () =>
      renderSelector({
        title: 'Select action',
        options: logActionTypes,
        selected: selectedActions,
        selectedLabel: <FilterValue>{selectedActionsNames || 'Select action...'}</FilterValue>,
        onSelect: onSelectActions,
        onDeselect: onDeselectActions,
      }),
    [onDeselectActions, onSelectActions, renderSelector, selectedActions, selectedActionsNames],
  );

  const renderedEntitySelect = useMemo(
    () =>
      renderSelector({
        title: 'Select entity',
        options: logEntityTypes,
        selected: selectedEntities,
        selectedLabel: <FilterValue>{selectedEntitiesNames || 'Select entity...'}</FilterValue>,
        onSelect: onSelectEntities,
        onDeselect: onDeselectEntities,
      }),
    [onDeselectEntities, onSelectEntities, renderSelector, selectedEntitiesNames, selectedEntities],
  );

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setBodyQuery(event.target.value);
  }, []);

  return (
    <Pane
      display='grid'
      gridTemplateColumns='repeat(3, 2fr) 3fr 2fr 1fr'
      alignItems='flex-end'
      columnGap={24}
      padding={20}
      borderRadius={4}
      border='default'
      background='tint2'
      marginBottom={24}
    >
      {renderedUserSelect}
      {renderedActionsSelect}
      {renderedEntitySelect}
      <TextInput width='auto' name='text-input-name' placeholder='Search by body...' onBlur={handleSearchChange} />
      <RangePicker value={selectedRange} onChange={setSelectedRange} />
      <Button appearance='primary' onClick={handleReset} disabled={isResetDisabled}>
        Reset
      </Button>
    </Pane>
  );
});
