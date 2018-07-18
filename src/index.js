import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'; // Package containing everything you need to set up Apollo Client An Apollo Link for remote data fetching
import { ApolloProvider } from 'react-apollo'; // provides an integration between react and our server side
import { HashRouter } from 'react-router-dom';
import App from './App'; // Routing
import 'normalize.css/normalize.css'; // provides better cross-browser consistency in the default styling of HTML elements. It's a modern, HTML5-ready,
import 'bootstrap'; // This line will only import the js part of bootstrap.
import '../node_modules/bootstrap-select'; // This line will only import the js part of bootstrap-select.
import '../node_modules/font-awesome/css/font-awesome.css'; //fontawesome  icons
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css'; // bootstrap-table
import '../node_modules/react-dates/lib/css/_datepicker.css'; // react-dates css
import '../node_modules/react-dates/initialize'; // react-dates js
import '../node_modules/react-block-ui/style.css'; //block-ui
import './styles/main.scss'; // only bootstrap scss
import './styles/style'; // application custom css

/*
 When Apollo tends to make a request to our GraphQL all server it's going to include cookies
 when the request hits our express Server, Express will automatically populate the request user field.
 so our GraphQL server will understand who the current user of our application is.
*/

const client = new ApolloClient({
  dataIdFromObject: o => o.id, // To identify every record that comes back from the server so that Appollo is able to say ah I just got back id=123.
  uri: `http://localhost:4002/graphql`, // A string representing your GraphQL server endpoint.
  credentials: 'same-origin' // indicate whether the user agent should send cookies with requests
});

const Root = () => {
  return (
    <HashRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </HashRouter>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
registerServiceWorker();
