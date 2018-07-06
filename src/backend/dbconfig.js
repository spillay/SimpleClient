import gql from "graphql-tag";

export const owners = gql`
{
    owners{
        id name properties{
            id description
        }
    }
}
`
export const addUser = gql`
mutation AddOwner($name:String!,$email:String!,$cellNumber:String!){
    addOwner(name:$name,email:$email,cellNumber:$cellNumber){
		id 
		name 
		email 
		cellNumber
    }
  }
`