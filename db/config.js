const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
    type: 'mysql', 
    host: 'localhost',
    port: 5432, 
    username: 'your_username',
    password: 'your_password',
    database: 'your_database',
    synchronize: true, 
    logging: true,
    entities: [__dirname + '/../Models/*.js'],
    subscribers: [],
    migrations: [],
});

module.exports = AppDataSource;
