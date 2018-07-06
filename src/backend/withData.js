import ApolloClient from "apollo-boost";

export default function withData(UIComponent) {
    const client = new ApolloClient({
        uri: `http://localhost:4001/graphql`
    });
    return class DataWrapped extends UIComponent {
        componentWillMount() {
            client
                .query({
                    query: this.state.gql
                })
                .then(result => this.setState({ gdata: result }));
        }
        readData = (q) => {
            return client.query({
                query: q
            })
        }
        mutateData = (q, vdata) => {
            return client.mutate({
                variables: vdata,
                mutation: q
            })
        }
        render() {
            return super.render()
        }
    }
}
