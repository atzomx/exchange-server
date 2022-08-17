const user = `
  query UserById($user: String!) {
    userById(id: $user) {
      birthday
      firstName
      lastName
      secondLastName
      email
      userName
      phoneNumber
      status
      gender
      curp
    }
  }
`;

export default { user };
