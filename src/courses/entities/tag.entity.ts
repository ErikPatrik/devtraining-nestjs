import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('tags') // nome da tabela: tags
export class Tag {
    //@PrimaryGeneratedColumn()
    //id: number
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    // Array de cursos
    @ManyToMany(() => Course, (course) => course.tags)
    courses: Course[];

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
