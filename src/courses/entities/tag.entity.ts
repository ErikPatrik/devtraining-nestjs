import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity('tags') // nome da tabela: tags
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // Array de cursos
    @ManyToMany(() => Course, (course: Course) => course.tags)
    courses: Course[];
}
