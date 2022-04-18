import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

// Para update, ? é opcional
export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  // export class UpdateCourseDto() {}
  // Comentei pois vamos usar o mapped types
  //   readonly name?: string;
  //   readonly description?: string;
  //   readonly tags?: string[];
}
