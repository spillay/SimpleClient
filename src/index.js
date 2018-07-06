import registerServiceWorker from './registerServiceWorker';
import React from "react";
import { render } from "react-dom";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider, Query } from "react-apollo";
// import gql from "graphql-tag";
import User from "./User";

// const client = new ApolloClient({
//     uri: `http://localhost:4001/graphql`
// });

// client
//   .query({
//     query: gql`
//     {
//         owners{
//             id name properties{
//                 id description
//             }
//         }
//     }
//     `
//   })
//   .then(result => console.log(result));

// // Fetch GraphQL data with a Query component
// const ExchangeRates = () => (
//     <Query
//         query={gql`
//         {
//             owners{
//                 id name properties{
//                     id description
//                 }
//             }
//         }
//     `}
//     >
//         {({ loading, error, data }) => {
//             if (loading) return <p>Loading...</p>;
//             if (error) return <p>Error :(</p>;

//             return data.owners.map(({ id, name }) => (
//                 <div key={id}>
//                     <p>{`${id}: ${name}`}</p>
//                 </div>
//             ));
//         }}
//     </Query>
// );

const App = () => (
    <User/>
);

render(<App />, document.getElementById("root"));
registerServiceWorker();
/*
<ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app</h2>
            <ExchangeRates />
        </div>
    </ApolloProvider>
*/