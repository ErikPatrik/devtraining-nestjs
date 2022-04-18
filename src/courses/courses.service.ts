import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  // estrutura de dados em memória para que seja possível manipular os recursos de cursos, do tipo da entidade
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos Nest',
      description: 'Descrição do curso de Nest',
      tags: ['curso'],
    },
  ];

  //aqui criamos os métodos para serem chamados no controller
  findAll() {
    return this.courses;
  }

  // procuramos na estrutura de dados com esse ID passando
  findOne(id: string) {
    // busca dentro do array de Course, onde pra cada id percorrido compara com o ID recebido no parâmetro
    //return this.courses.find((course: Course) => course.id === Number(id));

    // COM TRATAMENTO DE ERROS
    const course = this.courses.find(
      (course: Course) => course.id === Number(id),
    );

    // se não encontrou
    if (!course) {
      throw new HttpException(
        `Course id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.courses.find((course: Course) => course.id === Number(id));
  }

  // Cria o curso recebendo o body(dto)
  // Não sabemos o que vem, definicomo any
  create(createCourseDto: any) {
    // pegamos o que recebemos no método e colocamos no array
    this.courses.push(createCourseDto);
    // depois de criado, retornamos o objeto
    return createCourseDto;
  }

  // ATUALIZA
  update(id: string, updateCourseDto: any) {
    // pega a posição dentro do array buscando pelo ID
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    // agora só atualizar com base na posição do ID no array
    this.courses[indexCourse] = updateCourseDto;
  }

  // REMOVER
  remove(id: string) {
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    // Se retornar -1, significa que não encontrou a posição no array com esse ID
    // Se retornar 0 ou maior, siginifica que encontrou a posição no array com o ID e pode ser excluído
    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1); // apago um registro de acordo com a posição informada
    }
  }
}
