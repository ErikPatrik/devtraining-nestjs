import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';

// aqui definimos essa classe como um módulo
@Module({
    imports: [TypeOrmModule.forFeature([Course])], // passando o nome das entidades deste módulo para o TypeORM
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule {}
