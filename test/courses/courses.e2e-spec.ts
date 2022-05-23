import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CoursesModule } from '../../src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCourseDto } from '../../src/courses/dto/create-course.dto';

// testamos o método post pra rota abaixo
describe('Courses: /courses (e2e)', () => {
    let app: INestApplication; // recebe a instância da aplicação

    // informações que queremos armazenar no banco de dados de teste
    const course: CreateCourseDto = {
        name: 'NestJS com TypeORM',
        description: 'Criando APIs Restful com nestjs',
        tags: ['nestjs', 'typeorm', 'nodejs', 'typescript']
    }

    beforeAll(async() => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [CoursesModule, TypeOrmModule.forRoot({
                // aqui estamos criando e passando como parâmetro um banco de testes levantado no docker
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'docker',
                database: 'testdb',
                autoLoadEntities: true,
                synchronize: true,
            })],
        }).compile();

        app = moduleFixture.createNestApplication(); // cria no app uma aplicação Nest em execução

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true, // não permite novos atributos no payload, só os informados no Dto
                forbidNonWhitelisted: true, // ocorrerá erros caso novos atributos sejam enviados que não estejam no Dto
                transform: true, // transforma os dados/objetos das informações que chegarem no payload, tipando o objeto com o Dto, sabendo lidar com o que tipo que está chegando na informação
            }),
        );

        await app.init();
    });

    afterAll(async () => {
        await app.close()
    })

    it('Create POST /courses', () => {
        return request(app.getHttpServer())
            .post('/courses')
            .send(course)
            .expect(HttpStatus.CREATED)
            .then(({body}) => { // um pouco de jasmine
                // console.log(body)
                const expectdCourse = jasmine.objectContaining({
                    ...course,
                    tags: jasmine.arrayContaining( // pega o array que contem pra construir um conjunto de objetos, e não um array
                        course.tags.map(name => jasmine.objectContaining({name})
                        )
                    )
                })
                // espero que o body seja igual expectedCourse
                expect(body).toEqual(expectdCourse)
            })
    })
});
