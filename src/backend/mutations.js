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

export const editUser = gql`
  mutation EditUser(
    $name: String!
    $email: String!
    $cellNumber: String!
    $roles: [String!]!
  ) {
    editUser(
      name: $name
      email: $email
      cellNumber: $cellNumber
      roles: $roles
    ) {
      email
    }
  }
`;

export const deleteUser = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email) {
      email
    }
  }
`;

export const addFormControls = gql`
  mutation AddFormControls(
    $key: String!
    $label: String!
    $type: String!
    $form: String!
    $mandatory: String!
  ) {
    addFormControls(
      key: $key
      label: $label
      type: $type
      form: $form
      mandatory: $mandatory
    ) {
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

export const addUFC = gql`
  mutation AddUFC($user: String!, $form: String!, $controls: [String!]!) {
    addUFC(user: $user, form: $form, controls: $controls) {
      user {
        name
      }
      form {
        name
      }
      controls {
        key
        label
        type
        mandatory
      }
    }
  }
`;

export const removeUFC = gql`
  mutation RemoveUFC($user: String!, $form: String!, $controls: [String!]!) {
    removeUFC(user: $user, form: $form, controls: $controls) {
      user {
        name
      }
      form {
        name
      }
      controls {
        key
        label
        type
        mandatory
      }
    }
  }
`;

export const addFCT = gql`
  mutation AddFormControlType($type: [String!]!) {
    addFormControlType(name: $type) {
      name
    }
  }
`;

export const addForm = gql`
  mutation AddForm($name: String!) {
    addForm(name: $name) {
      name
    }
  }
`;
