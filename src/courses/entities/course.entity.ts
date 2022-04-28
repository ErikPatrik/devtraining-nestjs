// Aqui é definido quais os atributos que a entidade curso (singular) possui
// export class Course {
//   id: number;
//   name: string;
//   description: string;
//   tags: string[];
// }

import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Tag } from './tag.entity';
import { v4 as uuidv4 } from 'uuid';

// Aqui vamos usar para criar a entidade com o TypeORM
@Entity('courses') // por padrão ele cria course, mas se passarmos um parâmetro cria o nome que eu quiser da tabela
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    //   @Column('json', { nullable: true }) // aqui dizemos que por padrão vai salvar como Json no banco, mas pode salvar como nulo
    //   tags: string[];

    // type: pra qual entidade está sendo criado o relacionamento, e o lado inverso, ou seja, la na entidade de tags, precisamos criar uma entidade courses
    //@JoinTable() // identifica a relação principal
    @JoinTable({ name: 'courses_tags' }) // identifica a relação principal
    @ManyToMany(() => Tag, (tag: Tag) => tag.courses, {
        cascade: true,
    })
    tags: Tag[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @BeforeInsert() // antes de inserir um registro, existe um método que verifica se já existe um ID, se não gera um automaticamente
    generatedId() {
        if (this.id) {
            return;
        }

        this.id = uuidv4();
    }
}
