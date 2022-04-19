// Aqui é definido quais os atributos que a entidade curso (singular) possui
// export class Course {
//   id: number;
//   name: string;
//   description: string;
//   tags: string[];
// }

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Aqui vamos usar para criar a entidade com o TypeORM
@Entity('courses') // por padrão ele cria course, mas se passarmos um parâmetro cria o nome que eu quiser da tabela
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('json', { nullable: true }) // aqui dizemos que por padrão vai salvar como Json no banco, mas pode salvar como nulo
  tags: string[];
}
