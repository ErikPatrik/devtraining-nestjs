import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

// aqui definimos essa classe como um módulo
@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
