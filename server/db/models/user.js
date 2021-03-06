const crypto = require('crypto'); // Node's built-in crypto pkg
const Sequelize = require('sequelize');
const _ = require('lodash');
const db = require('../_db');

const User = db.define('user', {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  // email: {
  //   type: Sequelize.STRING,
  //   unique: true,
  //   allowNull: false,
  //   validate: {
  //     isEmail: true,
  //   },
  // },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

module.exports = User;


User.prototype.correctPassword = (candidatePwd) => (
  User.encryptPassword(candidatePwd, this.salt) === this.password
);


User.prototype.sanitize = () => (
  _.omit(this.toJSON(), ['password', 'salt'])
);

User.generateSalt = () => (
  crypto.randomBytes(32).toString('hex')
);

User.encryptPassword = (plainText, salt) => (
  crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
);


const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
