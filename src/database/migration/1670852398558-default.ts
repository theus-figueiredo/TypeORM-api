import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670852398558 implements MigrationInterface {
    name = 'default1670852398558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cost_center" DROP CONSTRAINT "FK_84121d0dc2c55a4a18cb31a22b4"`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "budget" numeric NOT NULL, "endDate" date, "expectedEndDate" TIMESTAMP NOT NULL, "contractTypeId" integer, "customerId" integer, CONSTRAINT "REL_ea9927c92b23af6a16a76e68e8" UNIQUE ("contractTypeId"), CONSTRAINT "REL_936abe955fb4bf453631ba04de" UNIQUE ("customerId"), CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP COLUMN "contract_status"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP COLUMN "contract_start"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP COLUMN "contract_end"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP CONSTRAINT "REL_84121d0dc2c55a4a18cb31a22b"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP COLUMN "contractTypeId"`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD "contractId" integer`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD CONSTRAINT "UQ_feee36c27808c8c4408024d75fa" UNIQUE ("contractId")`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD CONSTRAINT "FK_feee36c27808c8c4408024d75fa" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD CONSTRAINT "FK_c9c65f7ca5dac17694db74dcc54" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_ea9927c92b23af6a16a76e68e8f" FOREIGN KEY ("contractTypeId") REFERENCES "contract_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_936abe955fb4bf453631ba04de9" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_936abe955fb4bf453631ba04de9"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_ea9927c92b23af6a16a76e68e8f"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP CONSTRAINT "FK_c9c65f7ca5dac17694db74dcc54"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP CONSTRAINT "FK_feee36c27808c8c4408024d75fa"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP CONSTRAINT "UQ_feee36c27808c8c4408024d75fa"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP COLUMN "contractId"`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD "contractTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD CONSTRAINT "REL_84121d0dc2c55a4a18cb31a22b" UNIQUE ("contractTypeId")`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD "contract_end" date`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD "contract_start" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD "contract_status" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD CONSTRAINT "FK_84121d0dc2c55a4a18cb31a22b4" FOREIGN KEY ("contractTypeId") REFERENCES "contract_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
