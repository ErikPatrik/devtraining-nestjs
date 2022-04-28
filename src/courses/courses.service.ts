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
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
    // CONSTRUCTOR NECESSÁRIO
    constructor(
        @InjectRepository(Course) // cria um repositório com base na nossa entidade, assim conseguimos acessar os métodos para manipular os dados
        private readonly courseRepository: Repository<Course>, // passamos o tipo do repositório que vamos manipular, no caso Course, já trabalhando com o banco de dados

        // Agora conseguimos manipular as tags também
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    // BUSCA TODOS
    findAll() {
        //return this.courseRepository.find(); // traz todos os registros do banco
        return this.courseRepository.find({
            relations: ['tags'],
        });
    }

    // BUSCA UM ÚNICO REGISTRO PELO ID
    async findOne(id: string) {
        //const course = this.courseRepository.findOne(id);
        const course = await this.courseRepository.findOne(id, {
            relations: ['tags'],
        });

        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return course;
    }

    // CRIA
    //async create(createCourseDto: CreateCourseDto) {
    async create(createCourseDto: any) {
        // antes de criar, verificamos todas as tags enviadas pra criar ou não
        // só retorna se todas as promessas foram concluídas
        // percorre tag por tag, pega o name e executa o método preload..
        // o que encontra retorna, se não cria e retorna
        const tags = await Promise.all(
            createCourseDto.tags.map((name) => this.preloadTagByName(name)),
        );

        const course = this.courseRepository.create({
            ...createCourseDto,
            tags,
        });

        return this.courseRepository.save(course);
    }

    // ATUALIZA
    async update(id: string, updateCourseDto: any) {
        // se foi enviado tags na atualização, se possui valor ai chama o método
        const tags =
            updateCourseDto.tags &&
            (await Promise.all(
                updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
            ));

        // preload: prepara/precarrega o objeto com base no ID
        const course = await this.courseRepository.preload({
            // id: +id, //converte o ID para numérico
            // ...updateCourseDto, // os demais dados
            id: id,
            ...updateCourseDto,
            tags,
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

    // a tag que buscar do banco retorna, se não cria
    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({ name });

        if (tag) {
            return tag;
        }

        // se não encntrou, cria
        return this.tagRepository.create({ name });
    }
}
