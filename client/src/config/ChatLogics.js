export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id
    ? users[1].firstname
    : users[0].firstname;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const isAPhoneNumber = (myStr) => {
  let filtered = myStr.replace(/\D/g, "");
  var myRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  var result = myRegex.test(filtered);
  return result;
};

export const imageMap = new Map();
imageMap.set(
  "Creator",
  "https://live.staticflickr.com/65535/52780158942_5e2d97be64_k.jpg"
);
imageMap.set(
  "Music",
  "https://live.staticflickr.com/65535/52780679751_5e2dfec2a4_k.jpg"
);
imageMap.set(
  "Food",
  "https://live.staticflickr.com/65535/52780143632_aa45e490d0_k.jpg"
);
imageMap.set(
  "Travel",
  "https://live.staticflickr.com/65535/52791594687_8fffec4907_k.jpg"
);
imageMap.set(
  "Coffee",
  "https://live.staticflickr.com/65535/52780146787_3d59fc259f_k.jpg"
);
imageMap.set(
  "Introvert",
  "https://live.staticflickr.com/65535/52792571455_f38fa27f1d_k.jpg"
);
imageMap.set(
  "Animal",
  "https://live.staticflickr.com/65535/52791646297_808b26c667_k.jpg"
);
