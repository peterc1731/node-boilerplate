module.exports = {
  env: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/car-share-api',
  secret: process.env.SECRET || 'car-share-api-secret',
  port: process.env.PORT || '2000',
};
