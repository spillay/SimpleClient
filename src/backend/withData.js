import ApolloClient from "apollo-boost";


export default function withData(UIComponent) {
    const client = new ApolloClient({
        uri: `http://localhost:4002/graphql`
    });
	return class DataWrapped extends UIComponent {
		
        readData = (q,vdata) => {
			return client.query({
				variables: vdata,
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
