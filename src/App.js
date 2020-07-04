import React, { Fragment } from "react";
import { Query } from "react-apollo";

import ListOrders from "./ListOrders";
import { AddOrder } from "./Order";

// Reusable queries
import { TOTAL_ORDERS_WITH_STATUS_QUERY } from "./Queries";

// App component that lets us order and remove items
// from a local apollo server endpoint.
const App = () => (
  <div className="p-4">
    <h1 className="text-xl">React Apollo Client!</h1>
    <div className="mt-2">
      <Query query={TOTAL_ORDERS_WITH_STATUS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;

          const status = data.status.enumValues.map(status => status.name);

          return (
            <div>
              <AddOrder status={status} />
              <ListOrders
                totalOrders={data.totalOrders}
                allOrders={data.allOrders}
              />
            </div>
          );
        }}
      </Query>
    </div>
  </div>
);

export default App;
