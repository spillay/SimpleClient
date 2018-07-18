import gql from 'graphql-tag';

export const authUser = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId: id
      email
    }
  }
`;

export const addUser = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $password: String!
    $cellNumber: String!
    $roles: [String!]!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      cellNumber: $cellNumber
      roles: $roles
    ) {
      userId: id
      name
      email
      cellNumber
      roles {
        id
        name
      }
    }
  }
`;
export const addFormControls = gql`
  mutation AddFormControls(
    $key: String!
    $label: String!
    $type: String!
    $form: ID!
  ) {
    addFormControls(key: $key, label: $label, type: $type, form: $form) {
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

export const editUser = gql`
  mutation EditUser(
    $ID: ID!
    $name: String!
    $email: String!
    $cellNumber: String!
    $roles: [String!]!
  ) {
    editUser(
      _id: $ID
      name: $name
      email: $email
      cellNumber: $cellNumber
      roles: $roles
    ) {
      userId: id
    }
  }
`;

export const deleteUser = gql`
  mutation DeleteUser($ID: ID!) {
    deleteUser(_id: $ID) {
      userId: id
    }
  }
`;
