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
    $roles: [ID!]!
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
        roleId: id
        name
      }
    }
  }
`;
export const editUser = gql`
  mutation EditUser(
    $ID: userId!
    $name: String!
    $email: String!
    $cellNumber: String!
    $roles: [ID!]!
  ) {
    editUser(
      _id: $ID
      name: $name
      email: $email
      cellNumber: $cellNumber
      roles: $roles
    ) {
      userId: id
      name
      email
      cellNumber
      roles {
        roleId: id
        name
      }
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
