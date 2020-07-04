import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

// Reusable queries
import { TOTAL_ORDERS_QUERY } from "./Queries";

// Mutations
const ADD_ORDER_MUTATION = gql`
  mutation newOrder($input: AddOrderInput!) {
    addOrder(input: $input) {
      id
      date
      product
      status
    }
  }
`;

const REMOVE_ORDER_MUTATION = gql`
  mutation remove($id: ID!) {
    removeOrder(id: $id) {
      removed
      totalAfter
      removedOrder {
        id
        date
        product
        status
      }
    }
  }
`;

// Local apollo cache updater function to avoid using `refetchQueries` prop
// to keep the UI in sync after a mutation operation.
const updateLocalCache = (client, { data }) => {
  const { totalOrders, allOrders } = client.readQuery({
    query: TOTAL_ORDERS_QUERY
  });

  let updatedOrderCount = 0;
  let updatedOrders = [];

  // For add mutation
  if (data.addOrder) {
    updatedOrderCount = totalOrders + 1;
    updatedOrders = [...allOrders, data.addOrder];

    // For remove mutation
  } else if (data.removeOrder) {
    if (data.removeOrder.removed) {
      updatedOrderCount = data.removeOrder.totalAfter;
      updatedOrders = allOrders.filter(
        order => order.id !== data.removeOrder.removedOrder.id
      );
    }
  }

  client.writeQuery({
    query: TOTAL_ORDERS_QUERY,
    data: {
      totalOrders: updatedOrderCount,
      allOrders: updatedOrders
    }
  });
};

// Add order component to render a simple order entry form to place
// orders via the local graphql endpoint.
export class AddOrder extends Component {
  state = {
    product: "",
    date: new Date().toISOString().substring(0, 10),
    status: this.props.status[0]
  };

  render() {
    const { status } = this.props;
    return (
      <form
        onSubmit={evt => {
          evt.preventDefault();
          this.setState({ product: "" });
        }}
      >
        <div className="mt-4 mb-4">
          <input
            className="border border-indigo-400 rounded-md h-6 p-2"
            type="text"
            value={this.state.product}
            onChange={e => this.setState({ product: e.target.value })}
            placeholder="Product name..."
          />
          <input
            className="border border-indigo-400 rounded-md h-6 ml-2 p-2"
            type="date"
            value={this.state.date}
            onChange={e => this.setState({ date: e.target.value })}
          />
          <select
            className="border border-indigo-400 ml-2"
            value={this.state.status}
            onChange={e => this.setState({ status: e.target.value })}
          >
            {status.map(status => (
              <option key={status} value={status}>
                {status.toLowerCase()}
              </option>
            ))}
          </select>
          <Mutation mutation={ADD_ORDER_MUTATION} update={updateLocalCache}>
            {addOrder => (
              <button
                className="ml-2 border bg-indigo-400 rounded-md text-white px-2"
                onClick={() =>
                  addOrder({
                    variables: {
                      input: this.state
                    }
                  })
                }
              >
                Add Order
              </button>
            )}
          </Mutation>
        </div>
      </form>
    );
  }
}

// Remove order component to remove products via a local graphql endpoint.
export const RemoveOrder = ({ orderId }) => (
  <Mutation mutation={REMOVE_ORDER_MUTATION} update={updateLocalCache}>
    {removeOrder => (
      <button
        onClick={() =>
          removeOrder({
            variables: { id: orderId }
          })
        }
      >
        ⛔️
      </button>
    )}
  </Mutation>
);
