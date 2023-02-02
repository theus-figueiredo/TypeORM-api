import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674556230395 implements MigrationInterface {
    name = 'default1674556230395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_07d20d769c7b0de44f6367bab1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "budget" numeric NOT NULL, "endDate" date, "expectedEndDate" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "contractTypeId" integer, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contractId" integer, CONSTRAINT "REL_7e0828a32d24a2013dc3bf7294" UNIQUE ("contractId"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cost_center" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "monthlyBudget" numeric NOT NULL, "customerId" integer, CONSTRAINT "PK_814d737123e3a42d0a37e97b393" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_category" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_9d513b39d251063f98f2a7b941d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_6468f21b77a828e8aeac179d6c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_order" ("id" SERIAL NOT NULL, "identifier" character varying NOT NULL, "description" character varying NOT NULL, "creationDate" character varying NOT NULL, "requestedAt" character varying NOT NULL, "exectutionValue" numeric, "chargedValue" numeric, "costCenterId" integer, "statusId" integer, CONSTRAINT "PK_b01a59b48a0dfbd84dd8221364a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "serviceOrderId" integer, "userId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_costCenter" ("costCenter_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_442143eb7602d2448e3a114ca62" PRIMARY KEY ("costCenter_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae077bf1ab02d9f388d06ffbbf" ON "user_costCenter" ("costCenter_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_acd12e620b4234b566451eba1e" ON "user_costCenter" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "ServiceOrder_category" ("serviceOrder_id" integer NOT NULL, "serviceCategory_id" integer NOT NULL, CONSTRAINT "PK_cfa708a0db28d3429f06b77eaa8" PRIMARY KEY ("serviceOrder_id", "serviceCategory_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f261acdb9150e9ec62b79aebf9" ON "ServiceOrder_category" ("serviceOrder_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_26be25633506f74e9d578313e3" ON "ServiceOrder_category" ("serviceCategory_id") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6620cd026ee2b231beac7cfe578" FOREIGN KEY ("role") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_ea9927c92b23af6a16a76e68e8f" FOREIGN KEY ("contractTypeId") REFERENCES "contract_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_7e0828a32d24a2013dc3bf72947" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cost_center" ADD CONSTRAINT "FK_c9c65f7ca5dac17694db74dcc54" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_order" ADD CONSTRAINT "FK_1632924c511330aabdeab807a14" FOREIGN KEY ("costCenterId") REFERENCES "cost_center"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_order" ADD CONSTRAINT "FK_5aa690a6ea0697ac1a9c887af99" FOREIGN KEY ("statusId") REFERENCES "service_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_644b5b7fff4156d3eadc35fff42" FOREIGN KEY ("serviceOrderId") REFERENCES "service_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_costCenter" ADD CONSTRAINT "FK_ae077bf1ab02d9f388d06ffbbfd" FOREIGN KEY ("costCenter_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_costCenter" ADD CONSTRAINT "FK_acd12e620b4234b566451eba1e9" FOREIGN KEY ("user_id") REFERENCES "cost_center"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ServiceOrder_category" ADD CONSTRAINT "FK_f261acdb9150e9ec62b79aebf92" FOREIGN KEY ("serviceOrder_id") REFERENCES "service_order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ServiceOrder_category" ADD CONSTRAINT "FK_26be25633506f74e9d578313e35" FOREIGN KEY ("serviceCategory_id") REFERENCES "service_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ServiceOrder_category" DROP CONSTRAINT "FK_26be25633506f74e9d578313e35"`);
        await queryRunner.query(`ALTER TABLE "ServiceOrder_category" DROP CONSTRAINT "FK_f261acdb9150e9ec62b79aebf92"`);
        await queryRunner.query(`ALTER TABLE "user_costCenter" DROP CONSTRAINT "FK_acd12e620b4234b566451eba1e9"`);
        await queryRunner.query(`ALTER TABLE "user_costCenter" DROP CONSTRAINT "FK_ae077bf1ab02d9f388d06ffbbfd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_644b5b7fff4156d3eadc35fff42"`);
        await queryRunner.query(`ALTER TABLE "service_order" DROP CONSTRAINT "FK_5aa690a6ea0697ac1a9c887af99"`);
        await queryRunner.query(`ALTER TABLE "service_order" DROP CONSTRAINT "FK_1632924c511330aabdeab807a14"`);
        await queryRunner.query(`ALTER TABLE "cost_center" DROP CONSTRAINT "FK_c9c65f7ca5dac17694db74dcc54"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_7e0828a32d24a2013dc3bf72947"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_ea9927c92b23af6a16a76e68e8f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6620cd026ee2b231beac7cfe578"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26be25633506f74e9d578313e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f261acdb9150e9ec62b79aebf9"`);
        await queryRunner.query(`DROP TABLE "ServiceOrder_category"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_acd12e620b4234b566451eba1e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae077bf1ab02d9f388d06ffbbf"`);
        await queryRunner.query(`DROP TABLE "user_costCenter"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "service_order"`);
        await queryRunner.query(`DROP TABLE "service_status"`);
        await queryRunner.query(`DROP TABLE "service_category"`);
        await queryRunner.query(`DROP TABLE "cost_center"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "contract_type"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
