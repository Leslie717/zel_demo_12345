import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import UserListScreen from '../src/screens/userList';
import { MockedProvider } from '@apollo/client/testing';
import { LIST_ZELLER_CUSTOMERS } from '../src/utils/hooks/useZellerCust';
import { test, expect } from '@jest/globals'; 

const mocks = [
  {
    request: {
      query: LIST_ZELLER_CUSTOMERS,
    },
    result: {
      data: {
        listZellerCustomers: {
          items: [
            { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
            { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Manager' },
          ],
          nextToken: null,
        },
      },
    },
  },
];

test('renders user list screen', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserListScreen />
    </MockedProvider>
  );

  await screen.findByText('John Doe');
  await screen.findByText('Jane Doe');
});

test('filters users by role', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserListScreen />
    </MockedProvider>
  );

  await screen.findByText('Ben');
  await screen.findByText('Jane');

  fireEvent.press(screen.getByText('Admin'));
  expect(screen.queryByText('Jane')).toBeNull();

  fireEvent.press(screen.getByText('All'));
  await screen.findByText('Ben');
  await screen.findByText('Jane');
});