module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '190.15.158.240',
    PORT: process.env.PORT || 27000,
    MONGODB: process.env.MONGODB || 'mongodb://127.0.0.1:27017/donavidaDB',
    TOKEN_SECRET: process.env.TOKEN_SECRET || "a2389sbnsyeuwnQsjd5830",
    JWT_EXPIRE: process.env.JWT_EXPIRE || "2d",
    URLCLIENT: process.env.URLCLIENT || 'http://127.0.0.1:27001',
    URLDSS: process.env.URLDSS || 'http://127.0.0.1:27002',
    GEOPORT: process.env.GEOPORT || '27003',
    GEOURL: process.env.GEOURL || '127.0.0.1'
  }