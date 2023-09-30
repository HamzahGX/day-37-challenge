// models/user.js
const bcrypt = require('bcrypt');

const users = [
  {
    id: 1,
    username: 'whoville',
    password: '#issa#password#',
  },
];

async function createUser(username, password) {
  if (users.some((user) => user.username === username)) {
    return null; // Username already exists
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username: username,
    password: hashedPassword,
  };

  users.push(newUser);
  return newUser;
}

function findUserByUsername(username) {
  return users.find((user) => user.username === username);
}

module.exports = {
  createUser,
  findUserByUsername,
};
