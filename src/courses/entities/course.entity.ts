// Aqui é definido quais os atributos que a entidade curso (singular) possui
// export class Course {
//   id: number;
//   name: string;
//   description: string;
//   tags: string[];
// }

import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

// Aqui vamos usar para criar a entidade com o TypeORM
@Entity('courses') // por padrão ele cria course, mas se passarmos um parâmetro cria o nome que eu quiser da tabela
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    //   @Column('json', { nullable: true }) // aqui dizemos que por padrão vai salvar como Json no banco, mas pode salvar como nulo
    //   tags: string[];

    // type: pra qual entidade está sendo criado o relacionamento, e o lado inverso, ou seja, la na entidade de tags, precisamos criar uma entidade courses
    @JoinTable() // identifica a relação principal
    @ManyToMany(() => Tag, (tag) => tag.courses, {
        cascade: true,
    })
    tags: string[];
}
