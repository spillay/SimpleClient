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
    }
  }
`;

export const FormControlsListQuery = gql`
  query FormByName($name: String!) {
    getFormByName(name: $name) {
      id
      name
      controls {
        id
        key
        label
        mandatory
        type {
          name
        }
      }
    }
  }
`;

export const UserFormControlsListQuery = gql`
  query GetUFC($user: ID!, $form: ID!) {
    getUFC(user: $user, form: $form) {
      user {
        name
      }
      form {
        name
      }
      controls {
        id
        key
        label
        mandatory
        type {
          name
        }
      }
    }
  }
`;
