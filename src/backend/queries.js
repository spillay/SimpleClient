import gql from 'graphql-tag';

export const Role = gql`
  query Role($name: String!) {
    getRoleByName(name: $name) {
      id
    }
  }
`;

export const Users = gql`
  {
    getAllUsers {
      userId: id
      name
      email
      password
      cellNumber
      roles {
        id
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
        name
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

export const Forms = gql`
  {
    getForms {
      id
      name
      user {
        name
      }
    }
  }
`;
export const FormControlsListQuery = gql`
  query FormById($ID: ID!) {
    getFormById(_id: $ID) {
      id
      name
      user {
        name
      }
      controls {
        id
        key
        label
        type {
          name
        }
      }
    }
  }
`;
