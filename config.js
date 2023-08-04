module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 27000,
    MONGODB: process.env.MONGODB || 'mongodb://127.0.0.1:27017/donavidaDB',
    URLCLIENT: process.env.URLCLIENT || 'http://127.0.0.1:27001',
    URLDSS: process.env.URLDSS || 'http://127.0.0.1:27002'
  }