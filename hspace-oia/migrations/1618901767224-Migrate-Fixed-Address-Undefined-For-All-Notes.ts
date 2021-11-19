import { MigrationInterface, QueryRunner } from "typeorm";
import { Utilities } from "../src/application/utils";
import { ILike, Not, IsNull } from "typeorm";
import Beans from "../src/infrastructure/config/beans";
import buildBeans from "../src/infrastructure/config/service-locator";

export class MigrateFixedAddressUndefinedForAllNotes1618901767224
  implements MigrationInterface {
  name = "MigrateFixedAddressUndefinedForAllNotes1618901767224";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const beans: Beans = await buildBeans(queryRunner.manager);
    const noteManagers: { repo: any }[] = [
      {
        repo: beans.inspectionStatementRepository,
      },
      {
        repo: beans.inspectionExpectationRepository,
      },
      {
        repo: beans.investmentPlanRepository,
      },
      {
        repo: beans.investmentEfficiencyRepository,
      },
      {
        repo: beans.appraisalStatementRepository,
      },
      {
        repo: beans.appraisalExpectationRepository,
      },
      {
        repo: beans.projectNegotiationRepository,
      },
    ];

    for (const noteManager of noteManagers) {
      const repo = noteManager.repo;
      const notes = await repo.find({
        select: ["id", "streetNumber", "city", "ward", "district", "street"],
        where: {
          address: ILike("%undefined%"),
          streetNumber: Not(IsNull()),
          cityId: Not(IsNull()),
          wardId: Not(IsNull()),
          districtId: Not(IsNull()),
          streetId: Not(IsNull()),
        },
        relations: ["city", "ward", "district", "street"],
      });

      for (const note of notes) {
        const address = Utilities.generateAddress(note.streetNumber, note.street, note.ward, note.district, note.city);
        await repo.update(note.id, {
            address,
        });
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
