import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest'; // pacote npm que fornece uma abstração de alto nível para testar requisições HTTP
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    // isso aqui vai ser feito antes de cada teste
    //beforeEach(async () => {
    beforeAll(async() => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        // A variável App, é uma instância o runtime do nest como o todo
        // Salva na variável app uma referência da execução, para podemos simular requisições HTTP
        // Conseguimos simular toda a aplicação
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    // Fecha a conexão
    afterAll(async () => {
        await app.close()
    })

    it('/ (GET)', () => {
        return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
});
