const REGEX = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  REGEX,
  MONGO_URL,
};
