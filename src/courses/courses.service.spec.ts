import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

// definindo mock, tipo genẽrico T que pode ser qualquer coisa
// Partial significa que qualquer propriedade é opcional, nada é obrigatório
// Record constrói um tipo com um conjunto de propriedades, com a chave e o tipo que cada chave vai ter
// keyof é um tipo, o Repository é do typeorm
// o tipo de informação do Repository é o T, mesmo tipo passado no começo como chave
// e chamamos o jest.Mock, dizemos que temos as proprieades são compostas por um registro, que são funções mockadas

// tipoe Mock é um tipo genérico e de acordo com seu tipo Repository, conseguimos inferir os métodos
// assim conseguimos definir uma função com este tipo, e esta função retorna todos os métodos que precisamos usar
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// definimos uma função que o tipo de retorno que for passado aqui, é o mesmo tipo de retorno que o MockRepository
const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
    // aqui podemos ir criando os métodos, caso necessário
});

// descreeve um conjunto/recursos de testes
describe('CoursesService', () => {
    let service: CoursesService;
    let courseRepository: MockRepository;

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
                {
                    provide: getRepositoryToken(Course),
                    useValue: createMockRepository(),
                }, // pegamos os 2 repositorios através do Typeorm
                {
                    provide: getRepositoryToken(Tag),
                    useValue: createMockRepository(),
                }, // pegamos os 2 repositorios através do Typeorm
            ],
            //controlers: também possui
            //exports: também possui
        }).compile();

        // atribuímos o valor, vai ser um CourseService que pego a partir do módule com um método get
        // no caso o método acima e compilado, pego serviço/instância dele
        // consigo usar nos testes
        service = module.get<CoursesService>(CoursesService);

        // criamos a instância do repositório
        courseRepository = module.get<MockRepository>(getRepositoryToken);
    });

    // definiçao de um teste, onde recebe um nome e depois uma função pra executar o teste
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // devemos testar quando o curso é retornado
    // mas também devemos testar quando não é retornado
    describe('findOne', () => {
        describe('Buscar curso pelo ID', () => {
            it('Deve retornar o objeto Course', async () => {
                const courseId = '1';
                const expectedCourse = {};

                // simulamos um valor retornado
                courseRepository.findOne.mockReturnValue(expectedCourse);

                // depois de procura o findOne por um ID especifico
                const course = await service.findOne(courseId);
                expect(course).toEqual(expectedCourse);
            });

            it('Deve retornar um NotFoundException', async () => {
                const courseId = '1';

                courseRepository.findOne.mockReturnValue(undefined);

                try {
                    await service.findOne(courseId);
                } catch (error) {
                    // espero que esse erro seja uma instância desta classe NotFoundException
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toEqual(
                        `Course ID ${courseId} not found`,
                    );
                }
            });
        });
    });
});
