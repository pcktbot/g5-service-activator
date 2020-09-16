const { INTEGER, STRING, DATE } = require('sequelize')

module.exports = sequelize => sequelize.define('user', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  login: {
    type: STRING,
  },
  name: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  encrypted_password: {
    type: STRING(40),
  },
  password_salt: {
    type: STRING(40),
  },
  remember_token: {
    type: STRING,
  },
  remember_created_at: {
    type: DATE,
  },
  reset_password_token: {
    type: STRING(40),
  },
  current_sign_in_at: {
    type: DATE,
  },
  type: {
    type: STRING(40),
  },
  job_title_id: {
    type: INTEGER(11),
  },
  phone: {
    type: STRING,
  },
  picture_file_name: {
    type: STRING,
  },
  picture_content_type: {
    type: STRING,
  },
  picture_updated_at: {
    type: DATE,
  },
  picture_file_size: {
    type: INTEGER(11),
  },
  preferences: {
    type: INTEGER(11),
  },
  sign_in_count: {
    type: INTEGER(11),
  },
  last_sign_in_at: {
    type: DATE,
  },
  current_sign_in_ip: {
    type: STRING(20),
  },
  last_sign_in_ip: {
    type: STRING(20),
  },
  authentication_token: {
    type: STRING,
  },
  channel_token: {
    type: STRING,
  },
  pin: {
    type: STRING,
  },
  google_author_id: {
    type: STRING,
  }
})
