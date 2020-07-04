// This file contains all our reusable graphql queries.
import { gql } from "apollo-boost";

// Reusable queries
export const TOTAL_ORDERS_QUERY = gql`
  query total {
    totalOrders
    allOrders {
      id
      date
      product
      status
    }
  }
`;

export const TOTAL_ORDERS_WITH_STATUS_QUERY = gql`
  query totalWithStatus {
    totalOrders
    allOrders {
      id
      date
      product
      status
    }
    status: __type(name: "Status") {
      enumValues {
        name
      }
    }
  }
`;
