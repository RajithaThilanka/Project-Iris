export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id
    ? users[1].firstname
    : users[0].firstname;
};
