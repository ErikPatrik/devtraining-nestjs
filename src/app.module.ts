import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CoursesController } from './courses/courses.controller';
// import { CoursesService } from './courses/courses.service';
import { CoursesModule } from './courses/courses.module';

@Module({
    imports: [
        CoursesModule,
        TypeOrmModule.forRoot({
            //passa os parâmetros para se conectar com o banco de dados postgres
            type: 'postgres',
            host: 'db',
            port: 5432,
            username: 'postgres',
            password: 'docker',
            database: 'cursonestjs', // mudamos o banco para docker
            entities: [__dirname + '/**/*.entity.js'], //busca as entidades da aplicação, de qualquer nível de subdiretório através do nível atual
            autoLoadEntities: false, // antes era true, mas queremos indicar aonde vamos buscar informações das entidades, carrega automaticamente as entidades
            synchronize: false, // antes era true antes do docker, cria as tabelas no banco de dados automaticamente com o que for definido nas entidades, entretanto
            // em produção nao é recomendável, pois pode ser perdido todos os dados caso uma coluna for alterada por exemplo
        }),
    ], // aqui recebe os módulos específicos
    controllers: [AppController],
    providers: [AppService], // são decorados com o injectable
})
export class AppModule {}
