import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesController } from './courses/courses.controller';
import { CoursesService } from './courses/courses.service';

@Module({
  imports: [],
  controllers: [AppController, CoursesController],
  providers: [AppService, CoursesService], // são decorados com o injectable
})
export class AppModule {}
