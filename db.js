

// mongo-connect
module.exports.conf = {
  db: {
    db: 'projectdb',
    host: 'localhost',
    port: 27017,  // optional, default: 27017
    username: 'admin', // optional
    password: 'secret', // optional
    collection: 'sessions', // optional, default: sessions
    auto_reconnect: 'true'
  },
  secret: '076ee61d63aa10a125ea872411e433b9',
  connectionString: 'mongodb://localhost/projectdb?auto_reconnect=true'
};

