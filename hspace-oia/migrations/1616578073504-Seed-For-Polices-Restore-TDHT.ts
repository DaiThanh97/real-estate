import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedForPolicesRestoreTDHT1616578073504 implements MigrationInterface {
    name = "SeedForPolicesRestoreTDHT1616578073504"

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await EndpointPermissionSeed.run(queryRunner);
        // await FeatureSeed.run(queryRunner);
        // await PolicySeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
