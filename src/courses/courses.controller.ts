import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { create } from 'domain';
import { CoursesService } from './courses.service';

// 'courses' é o endpoint
// http://localhost:3000/courses
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {} // temos aqui todos os métodos para acessar no serviço pra usar no controller

  @Get()
  findAll() {
    return 'Listagem de cursos';
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
    return `Curso numero: ${id}  `;
  }

  // Dados dp corpo de uma requisição // Post
  // Cadastrando algo por exemplo
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT) // não retorna conteúdo, caso desejar, muito utilizado quando o retorno é estático
  // criação padrão
  //create(@Body() body) {
  // Como pegar um atributo individual
  create(@Body('name') body) {
    return body;
  }

  // Requisições HTTP Update:
  // Put é enviado todos dados de uma vez, e se o registro não existir, criar o mesmo
  // Patch atualização de alguns dados, parcialmente, só o nome por exemplo
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    // recebe o ID pra buscar, e o body pra atualizar a informação
    return `Atualização do curso #${id}`;
  }

  // remover um registro
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Exclusão do curso ${id}`;
  }
}
