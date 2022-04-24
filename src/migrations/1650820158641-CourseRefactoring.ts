import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseRefactoring1650820158641 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "courses" RENAME column "name" to "course" `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "courses" RENAME column "course" to "name" `,
        );
    }
}
