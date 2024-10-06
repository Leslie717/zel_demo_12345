/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderHook } from '@testing-library/react-hooks';
import useZellerCustomers from '../src/utils/hooks/useZellerCust';
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
          ],
          nextToken: null,
        },
      },
    },
  },
];

test('fetches zeller customers', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useZellerCustomers(), {
    wrapper: MockedProvider,
    // client: { mocks },
  });

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBe(undefined);
  expect(result.current.customers).toEqual([   
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
  ]);
});