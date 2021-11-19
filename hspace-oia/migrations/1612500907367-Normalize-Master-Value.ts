import { MigrationInterface, QueryRunner } from "typeorm";
import { MasterValue } from "../src/infrastructure/orm/typeorm/models/MasterValue";
import { Employee } from "../src/infrastructure/orm/typeorm/models/Employee";
import { Collaborator } from "../src/infrastructure/orm/typeorm/models/Collaborator";

export class NormalizeMasterValue1612500907367 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const MasterValueRepo = queryRunner.manager.getRepository(MasterValue);
    const data = await MasterValueRepo.find();
    for (const obj of data) {
      await MasterValueRepo.update(obj.id, {
        valueName: obj.valueName.normalize(),
        valueCode: obj.valueCode.normalize(),
        groupCode: obj.groupCode.normalize(),
        groupName: obj.groupName.normalize()
      });
    }

    const EmployeeRepo = queryRunner.manager.getRepository(Employee);
    const employees = await EmployeeRepo.find();
    for (const obj of employees) {
      await EmployeeRepo.update(obj.id, {
        fullName: obj.fullName.normalize()
      });
    }

    const CollaboratorRepo = queryRunner.manager.getRepository(Collaborator);
    const collaborators = await CollaboratorRepo.find();
    for (const obj of collaborators) {
      await CollaboratorRepo.update(obj.id, {
        fullName: obj.fullName.normalize()
      });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }

}
