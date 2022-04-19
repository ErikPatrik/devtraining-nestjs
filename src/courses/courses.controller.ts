import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

// 'courses' é o endpoint
// http://localhost:3000/courses
@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {} // temos aqui todos os métodos para acessar no serviço pra usar no controller

    @Get()
    findAll() {
        //return 'Listagem de cursos';
        return this.coursesService.findAll();
    }
    //Ou
    //findAll(@Res() response) {
    //  return response.status(200).send('Listagem de cursos');
    //}

    // Como lidar com parâmetros de rotas
    // Get /courses/100
    @Get(':id')
    findOne(
        //Exemplo sem desestruturação
        // @Param() params -- {params.id}
        // Decorando um parâmetro
        @Param('id') id: string,
    ) {
        //return `Curso numero: ${id}  `;
        return this.coursesService.findOne(id);
    }

    // Dados dp corpo de uma requisição // Post
    // Cadastrando algo por exemplo
    @Post()
    //@HttpCode(HttpStatus.NO_CONTENT) // não retorna conteúdo, caso desejar, muito utilizado quando o retorno é estático
    // criação padrão
    //create(@Body() body) {
    // Como pegar um atributo individual
    // create(@Body('name') body)
    // create(@Body() body)
    create(@Body() createCourseDto: CreateCourseDto) {
        //return body;
        return this.coursesService.create(createCourseDto);
    }

    // Requisições HTTP Update:
    // Put é enviado todos dados de uma vez, e se o registro não existir, criar o mesmo
    // Patch atualização de alguns dados, parcialmente, só o nome por exemplo
    @Patch(':id')
    //update(@Param('id') id: string, @Body() body) {
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        // recebe o ID pra buscar, e o body pra atualizar a informação
        // return `Atualização do curso #${id}`;
        // return this.coursesService.update(id, body);
        return this.coursesService.update(id, updateCourseDto);
    }

    // remover um registro
    @Delete(':id')
    remove(@Param('id') id: string) {
        //return `Exclusão do curso ${id}`;
        return this.coursesService.remove(id);
    }
}
