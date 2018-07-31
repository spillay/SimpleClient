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
      name
      email
      cellNumber
      roles {
        name
      }
    }
  }
`;

export const User = gql`
  query User($email: String!) {
    getUserById(email: $email) {
      name
      email
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
      name
      email
      cellNumber
      roles {
        name
      }
    }
  }
`;

export const Forms = gql`
  {
    getForms {
      name
    }
  }
`;

export const FormControlsListQuery = gql`
  query FormByName($name: String!) {
    getFormByName(name: $name) {
      name
      controls {
        key
        label
        mandatory
        type
      }
    }
  }
`;

export const UserFormControlsListQuery = gql`
  query GetUFC($user: String!, $form: String!) {
    getUFC(user: $user, form: $form) {
      key
      label
    }
  }
`;

export const GetAllUFC = gql`
  query GetAllUFC($user: String!) {
    getAllUFC(user: $user) {
      user: email
      forms {
        form {
          name
        }
        controls
      }
    }
  }
`;
