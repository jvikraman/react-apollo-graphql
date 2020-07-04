// A local apollo server for your graphql needs.
const { ApolloServer } = require("apollo-server");
const { generate } = require("shortid");
const { GraphQLScalarType } = require("graphql");

// Our schema type definitions.
const typeDefs = `
  "Date is a custom GraphQLScalarType"
  scalar Date

  "Order type"
  type Order {
    id: ID!,
    date: Date!,
    product: String!,
    status: Status
  }

  "Order status"
  enum Status {
    PROCESSING
    PENDING
    COMPLETE
  }

  "Our custom input for 'addOrder' mutation"
  input AddOrderInput {
    date: Date!
    product: String!
    status: Status
  }
  
  "Our custom payload for when an order is removed"
  type RemoveOrderPayload {
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
    removedOrder: Order
  }

  "Available queries"
  type Query {
    totalOrders: Int,
    allOrders: [Order!]!
  }

  "Available mutations"
  type Mutation {
    addOrder(input: AddOrderInput!): Order
    removeOrder(id: ID!): RemoveOrderPayload
  }
`;

// Our orders object.
let orders = [
  {
    id: "ord-123",
    date: "2020-03-23T00.00.000Z",
    product: "Mountain Bike",
    status: "PENDING"
  },
  {
    id: "ord-456",
    date: "2020-04-08T00.00.000Z",
    product: "Desktop Monitor",
    status: "COMPLETE"
  },
  {
    id: "ord-789",
    date: "2020-01-12T00.00.000Z",
    product: "Charcoal Grill",
    status: "PROCESSING"
  }
];

// Our resolvers.
const resolvers = {
  Query: {
    totalOrders: () => orders.length,
    allOrders: () => orders
  },
  Mutation: {
    // Destructure required params from incoming new order, add it to the list
    // of orders and return details about the operation.
    addOrder: (parent, { input: { date, product, status } }) => {
      if (product === "") {
        throw new Error("A product name must be provided!");
      }

      let newOrder = {
        id: generate(),
        date,
        product,
        status
      };
      orders = [...orders, newOrder];
      return newOrder;
    },

    // Find the order passed in by the client, remove it from the list
    // and return details about the operation.
    removeOrder: (parent, { id }) => {
      const totalBefore = orders.length;
      let removedOrder = orders.find(order => order.id === id);

      if (removedOrder) {
        orders = orders.filter(order => order.id !== id);
        removed = true;
      } else {
        throw new Error("Order not found!");
      }

      const totalAfter = orders.length;

      return {
        removed,
        totalBefore,
        totalAfter,
        removedOrder
      };
    }
  },
  // Date is a graphql scalar type with custom formatting
  // using serialize() function.
  Date: new GraphQLScalarType({
    name: "Date",
    description: "A valid date value",
    serialize: value => value.substring(0, 10),
    parseValue: value => new Date(value).toISOString(),
    parseLiteral: literal => literal.value
  })
};

// Setup our apollo server on `http://localhost:4000`
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers
})
  .listen(PORT)
  .then(({ url }) => console.log(`🚀 ready at ${url}`))
  .catch(console.error());
