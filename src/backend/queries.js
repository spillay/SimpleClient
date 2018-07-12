import gql from 'graphql-tag';

export const Users = gql`
  {
    getAllUsers {
      userId: id
      name
      email
      password
      cellNumber
      roles {
        ID: id
        name
      }
    }
  }
`;

export const User = gql`
  query User($ID: ID!) {
    getUserById(_id: $ID) {
      userId: id
      name
      email
      password
      cellNumber
      roles {
        id
      }
    }
  }
`;

export const SearchUsersQuery = gql`
  query SearchUsersQuery($name: String) {
    searchUsers(name: $name) {
      userId: id
      name
      email
      cellNumber
      roles {
        ID: id
        name
      }
    }
  }
`;
