import React from "react";
import { RemoveOrder } from "./Order";

// List orders component that renders a product table including
// the option to remove products via a local graphql endpoint.
const ListOrders = ({ totalOrders = 0, allOrders = [] }) => (
  <table className="border-2" cellPadding={5}>
    <thead>
      <tr>
        <th colSpan={3}>Total Orders: {totalOrders}</th>
      </tr>
    </thead>
    <tbody className="border">
      {allOrders.map(({ id, date, product, status }) => (
        <tr className="border" key={id}>
          <td>{id}</td>
          <td>{date}</td>
          <td>{product}</td>
          <td>{status.toLowerCase()}</td>
          <td>
            <RemoveOrder orderId={id} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ListOrders;
