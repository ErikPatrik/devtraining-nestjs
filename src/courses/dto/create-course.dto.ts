// nesta classe definimos qual a estrutura de uma requisição para o método create que esperamos receber
// colocamos readonly pra garantir que os dados são apenas lidos, ou seja, sem manipulação
export class CreateCourseDto {
  readonly name: string;
  readonly description: string;
  readonly tags: string[];
}
