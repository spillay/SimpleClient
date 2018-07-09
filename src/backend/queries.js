import gql from "graphql-tag";

export const Users = gql`
{
    getAllUsers{
		userId:id name email password cellNumber roles{
		  roleId:id name
		}
	  }
}
`




export const User = gql`
 query User($ID:ID!) {
    getUserById(_id: $ID) {
		userId:id name email cellNumber roles{
		  roleId:id
		}
	  }
	}

`