import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670520825040 implements MigrationInterface {
    name = 'default1670520825040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contract_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_07d20d769c7b0de44f6367bab1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cost_center" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contract_status" character varying NOT NULL, "contract_start" TIMESTAMP NOT NULL, "contract_end" date, "monthly_budget" numeric NOT NULL, "contractTypeId" integer, "userId" integer, CONSTRAINT "REL_84121d0dc2c55a4a18cb31a22b" UNIQUE ("contractTypeId"), CONSTRAINT "PK_814d737123e3a42d0a37e97b393" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roleId" integer, CONSTRAINT "REL_c28e52f758e7bbc53828db9219" UNIQUE ("roleId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD CONSTRAINT "FK_84121d0dc2c55a4a18cb31a22b4" FOREIGN KEY ("contractTypeId") REFERENCES "contract_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD CONSTRAINT "FK_f5309a803e4031b6f149c44e16c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP CONSTRAINT "FK_f5309a803e4031b6f149c44e16c"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP CONSTRAINT "FK_84121d0dc2c55a4a18cb31a22b4"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "cost_center"`);
        await queryRunner.query(`DROP TABLE "contract_type"`);
    }

}
