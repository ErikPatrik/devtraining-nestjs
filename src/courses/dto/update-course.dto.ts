// Para update, ? é opcional
export class UpdateCourseDto {
  readonly name?: string;
  readonly description?: string;
  readonly tags?: string[];
}
