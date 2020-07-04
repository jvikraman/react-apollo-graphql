# ✨ React Apollo Client - Demo App

### 📌 A simple react app that demonstrates how to:

- Use GraphQL data in react
- Setup a local apollo server for development using the `apollo-boost npm` package
- Setup a react apollo client using the `react-apollo npm` package
- Perform common graphql operations like `queries, mutations` etc.

---

### 📌 Usage

The local apollo server related code can be found under the `server` folder. A separate `npm install` is required inside this folder to install server dependencies.

The client related code resides in the root of this repo under the `src` folder and has its own dependencies. Below are the steps to run an instance of this application:

- First, clone the repo to your local
- Then `cd` in to the repo and at the root level, install the client dependencies using `npm install` or `yarn install`
- Then `cd` in to the `server` folder and install server dependencies using `npm` or `yarn install`
- Then run the command `npm run server` in a terminal to bring up the local apollo server. The server will be available on `http://localhost:4000`
- Next up, navigate back to the root and run `npm start` to bring up the react apollo client app. The app will open-up automatically on `http://localhost:3000`
- Once both the client and server are up and runnning, you can interact with the client app by placing new orders, removing orders etc.

#### 📚 Last but not least, be sure to check out the following reference guides if you 'd like to brush-up on the concepts demoed in this app:

- [Apollo Server Ref](https://github.com/jvikraman/apollo-server-ref)
- [React Apollo Client Ref](https://github.com/jvikraman/react-apollo-graphql-ref)
