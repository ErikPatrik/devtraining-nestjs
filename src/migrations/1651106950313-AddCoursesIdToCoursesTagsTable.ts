import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class AddCoursesIdToCoursesTagsTable1651106950313
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'courses_tags',
            new TableColumn({
                name: 'coursesId',
                type: 'uuid',
                isNullable: true,
            }),
        ); // parâmetro nome da tabela e a função nova coluna

        // segunda tarefa: adicionar uma chave estrangeira
        // criamos uma chave estrangeira, da tabela cursos
        // onde o ID da tabela cursos vai se relacionar com o courses ID da tabela Courses_tags
        await queryRunner.createForeignKey(
            'courses_tags',
            new TableForeignKey({
                name: 'courses_tags_courses', //nome do campo referenciado
                columnNames: ['coursesId'],
                referencedColumnNames: ['id'], // na tabela de cursos, o campo ID se releciona com esta tabela com este campo
                referencedTableName: 'courses',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // remove da tabela courses tags, a chave estrangeira courses_tags_courses
        await queryRunner.dropForeignKey(
            'courses_tags',
            'courses_tags_courses',
        );

        // depois remove a coluna passando o nome da tabela e a coluna
        await queryRunner.dropColumn('courses_tags', 'coursesId');
    }
}
