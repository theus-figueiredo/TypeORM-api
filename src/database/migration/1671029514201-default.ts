import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671029514201 implements MigrationInterface {
    name = 'default1671029514201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contract_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_07d20d769c7b0de44f6367bab1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "budget" numeric NOT NULL, "endDate" date, "expectedEndDate" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "contractTypeId" integer, CONSTRAINT "REL_ea9927c92b23af6a16a76e68e8" UNIQUE ("contractTypeId"), CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contractId" integer, CONSTRAINT "REL_7e0828a32d24a2013dc3bf7294" UNIQUE ("contractId"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cost_center" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "monthlyBudget" numeric NOT NULL, "userId" integer, "customerId" integer, CONSTRAINT "PK_814d737123e3a42d0a37e97b393" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roleId" integer, CONSTRAINT "REL_c28e52f758e7bbc53828db9219" UNIQUE ("roleId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_ea9927c92b23af6a16a76e68e8f" FOREIGN KEY ("contractTypeId") REFERENCES "contract_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_7e0828a32d24a2013dc3bf72947" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD CONSTRAINT "FK_f5309a803e4031b6f149c44e16c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD CONSTRAINT "FK_c9c65f7ca5dac17694db74dcc54" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP CONSTRAINT "FK_c9c65f7ca5dac17694db74dcc54"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP CONSTRAINT "FK_f5309a803e4031b6f149c44e16c"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_7e0828a32d24a2013dc3bf72947"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_ea9927c92b23af6a16a76e68e8f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "cost_center"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "contract_type"`);
    }

}
