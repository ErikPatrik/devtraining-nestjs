import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { create } from 'domain';

// 'courses' é o endpoint
// http://localhost:3000/courses
@Controller('courses')
export class CoursesController {
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
}
