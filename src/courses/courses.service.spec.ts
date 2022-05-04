import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

// descreeve um conjunto/recursos de testes
describe('CoursesService', () => {
    let service: CoursesService;

    //beforeAll: executar antes de todos os testes
    //afterEach: executar depois de cada teste
    //afterAll: executar que todos os testes forem executados

    // função hook e executa antes de cada teste
    beforeEach(async () => {
        // cria uma const do tipo TestingModule
        // cria um módulo pra que dentro desse módulo chama o serviço CoursesService
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoursesService,
                { provide: Connection, useValue: {} }, // nos conectamos com o banco Typeorm
                { provide: getRepositoryToken(Course), useValue: {} }, // pegamos os 2 repositorios através do Typeorm
                { provide: getRepositoryToken(Tag), useValue: {} }, // pegamos os 2 repositorios através do Typeorm
            ],
            //controlers: também possui
            //exports: também possui
        }).compile();

        // atribuímos o valor, vai ser um CourseService que pego a partir do módule com um método get
        // no caso o método acima e compilado, pego serviço/instância dele
        // consigo usar nos testes
        service = module.get<CoursesService>(CoursesService);
    });

    // definiçao de um teste, onde recebe um nome e depois uma função pra executar o teste
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
