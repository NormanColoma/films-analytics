const env = process.env.NODE_ENV;

const development = {
    database: {
        connection_uri: 'mongodb://localhost:27017',
        name: 'films' 
    }
};

const config = {
    development
};

module.exports = config[env];