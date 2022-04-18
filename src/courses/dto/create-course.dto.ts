// nesta classe definimos qual a estrutura de uma requisição para o método create que esperamos receber
// colocamos readonly pra garantir que os dados são apenas lidos, ou seja, sem manipulação
// aqui inserimos também as validações do que precisam ser as informações no Dto
// caso algo não venha algo na requisição, vai dar um erro de validação com erro 400
import { IsString } from 'class-validator';
export class CreateCourseDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString({ each: true }) // valida cada atributo dentro do array e precisa ser string
  readonly tags: string[];
}
