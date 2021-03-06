import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

// Aqui é definido esta classe como um módulo
@Module({
    imports: [TypeOrmModule.forFeature([Course, Tag])], // passando o nome das entidades deste módulo para o TypeORM
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule {}
