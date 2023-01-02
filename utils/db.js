import knexObj from 'knex';

export default knexObj({
    client: 'pg',
    version: '15.1',
    connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'your_database_user',
        password : '1234',
        database : 'academy'
    }
});