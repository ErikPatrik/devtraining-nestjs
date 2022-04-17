import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CoursesController } from './courses/courses.controller';
// import { CoursesService } from './courses/courses.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [CoursesModule], // aqui recebe os módulos específicos
  controllers: [AppController],
  providers: [AppService], // são decorados com o injectable
})
export class AppModule {}
