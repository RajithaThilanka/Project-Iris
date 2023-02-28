export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id
    ? users[1].firstname
    : users[0].firstname;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
