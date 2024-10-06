import { gql, useQuery } from '@apollo/client';
import client from '../../config/gql/client';
import { ZellerCustomer } from '../../constants/zelCust';

export const LIST_ZELLER_CUSTOMERS = gql`
  query ListZellerCustomers($filter: TableZellerCustomerFilterInput, $limit: Int, $nextToken: String) {
    listZellerCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        role
      }
      nextToken
    }
  }
`;

const useZellerCustomers = (filter?: { role?: { eq?: string | number } }, limit?: number, nextToken?: string) => {
    const { loading, error, data, fetchMore, refetch } = useQuery(LIST_ZELLER_CUSTOMERS, //data
        {
            client,
            variables: { ...(filter && filter.role?.eq !== 'All') && {filter}, limit, nextToken },
        }
    );

    const customers: ZellerCustomer[] = data?.listZellerCustomers?.items || [];

    return { loading, error, customers, data, fetchMore, refetch };
};

export default useZellerCustomers;