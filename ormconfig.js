module.exports = {
    //passa os parâmetros para se conectar com o banco de dados postgres
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'postgres',
    //autoLoadEntities: true, // carrega automaticamente as entidades
    //synchronize: true, // cria as tabelas no banco de dados automaticamente com o que for definido nas entidades, entretanto
    // em produção nao é recomendável, pois pode ser perdido todos os dados caso uma coluna for alterada por exemplo
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations',
    },
};
