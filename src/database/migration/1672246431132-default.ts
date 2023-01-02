import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672246431132 implements MigrationInterface {
    name = 'default1672246431132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_order" ("id" SERIAL NOT NULL, "OS_ID" character varying NOT NULL, CONSTRAINT "PK_b01a59b48a0dfbd84dd8221364a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "service_order"`);
    }

}
