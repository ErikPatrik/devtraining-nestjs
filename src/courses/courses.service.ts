import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    // CONSTRUCTOR NECESSÁRIO
    constructor(
        @InjectRepository(Course) // cria um repositório com base na nossa entidade, assim conseguimos acessar os métodos para manipular os dados
        private readonly courseRepository: Repository<Course>, // passamos o tipo do repositório que vamos manipular, no caso Course, já trabalhando com o banco de dados
    ) {}

    // BUSCA TODOS
    findAll() {
        return this.courseRepository.find(); // traz todos os registros do banco
    }

    // BUSCA UM ÚNICO REGISTRO PELO ID
    findOne(id: string) {
        const course = this.courseRepository.findOne(id);

        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return course;
    }

    // CRIA
    create(createCourseDto: CreateCourseDto) {
        const course = this.courseRepository.create(createCourseDto);
        return this.courseRepository.save(course);
    }

    // ATUALIZA
    async update(id: string, updateCourseDto: any) {
        // preload: prepara/precarrega o objeto com base no ID
        const course = await this.courseRepository.preload({
            id: +id, //converte o ID para numérico
            ...updateCourseDto, // os demais dados
        });

        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return this.courseRepository.save(course);
    }

    // REMOVER
    async remove(id: string) {
        const course = await this.courseRepository.findOne(id);

        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return this.courseRepository.remove(course);
    }
}
