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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'postgres',
      autoLoadEntities: true, // carrega automaticamente as entidades
      synchronize: true, // cria as tabelas no banco de dados automaticamente com o que for definido nas entidades
    }),
  ], // aqui recebe os módulos específicos
  controllers: [AppController],
  providers: [AppService], // são decorados com o injectable
})
export class AppModule {}
