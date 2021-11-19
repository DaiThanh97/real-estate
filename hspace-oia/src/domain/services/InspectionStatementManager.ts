import {
  IBaseRepository,
  IFeatureRepository,
  IInspectionStatementManager,
  IInspectionStatementRepository
} from "./contract";
import constants from "../../infrastructure/config/constants";
import { InspectionStatementStatus, } from "../../infrastructure/orm/typeorm/models/InspectionStatement";
import { NoteManager } from "./NoteManager";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import { InspectionStatementStatusType } from "../../infrastructure/types/Note";


@Service(ContainerTokens.InspectionStatementManager)
export class InspectionStatementManager extends NoteManager<InspectionStatementStatusType> implements IInspectionStatementManager<InspectionStatementStatusType> {
  public constructor(
    @Inject(ContainerTokens.InspectionStatementRepository)
      inspectionStatementRepository: IInspectionStatementRepository,
    @Inject(ContainerTokens.FeatureRepository)
      featureRepository: IFeatureRepository,
    @Inject(ContainerTokens.AccountGroupFeatureRepository)
      accountGroupFeatureRepository: IBaseRepository,
  ) {
    super();
    this.noteRepository = inspectionStatementRepository;
    this.statusErrCode = ErrorCode.InspectionStatement.InvalidStatus;
    this.prefix = constants.PropertyNoteIdPrefix.InspectionStatement;
    this.statusWorkflow = [
      {
        status: InspectionStatementStatus.Pending,
        expectedStatus: [InspectionStatementStatus.Drafting],
      },
      {
        status: InspectionStatementStatus.Approved,
        expectedStatus: [InspectionStatementStatus.Pending],
      },
      {
        status: InspectionStatementStatus.Rejected,
        expectedStatus: [InspectionStatementStatus.Pending],
      }
    ];

    this.featureRepository = featureRepository;
    this.accountGroupFeatureRepository = accountGroupFeatureRepository;
    this.fullSearchAccessFeatures = [
      {
        action: "Duyệt",
        resourcePath: "/inspection/statement/view",
      },
      {
        action: "Phân công thực hiện",
        resourcePath: "/inspection/statement/edit"
      }
    ];

    // @see docs/noteClasses.md
    this.groupStatuses = {
      A: {},
      B: {
        only: [InspectionStatementStatus.Drafting],
      },
      C: {
        exclude: [InspectionStatementStatus.Drafting],
      }
    };
  }

  public async updateUnitPrice(property: Readonly<any>, accountId: number) {
    const notes = await this.noteRepository.find({
      where: {
        propertyId: property.id,
        isDeleted: false,
      },
    });
    const giaDGD = property.closedDealValue;
    const keys = [
      "KHDTKCN20", "KHTL21", "KHDTKV27", "KHHS22", "KHDTCNQH23", "KHTLDTCN24", "KHDTCN19", "KHHSDCN25",
      "KHDTVT1481", "KHHSVT1482", "KHDTVT2483", "KHHSVT2484", "KHDTVT3485", "KHHSVT3486",
    ];

    for (const note of notes) {
      if (!note.construction || !note.landUseRights) {
        continue;
      }
      if (!("KHGTCTXD42" in note.construction) || note.construction["KHGTCTXD42"] === null) {
        continue;
      }

      let valid = true;
      for (const keyName of keys) {
        if (!(keyName in note.landUseRights) || note.landUseRights[keyName] === null) {
          valid = false;
          break;
        }
      }

      if (!valid) {
        continue;
      }
      const giaCTXD = note.construction["KHGTCTXD42"];
      const dienTichKCN = note.landUseRights["KHDTKCN20"];
      const tiLeDienTichKCN = note.landUseRights["KHTL21"];
      const heSoDGDKCN = note.landUseRights["KHHS22"];
      const dienTichCNBQH = note.landUseRights["KHDTCNQH23"];
      const tiLeDTCNBQH = note.landUseRights["KHTLDTCN24"];
      const heSoDGDCNBQH = note.landUseRights["KHHSDCN25"];
      const dienTichVT1 = note.landUseRights["KHDTVT1481"];
      const heSoVT1 = note.landUseRights["KHHSVT1482"];
      const dienTichVT2 = note.landUseRights["KHDTVT2483"];
      const heSoVT2 = note.landUseRights["KHHSVT2484"];
      const dienTichVT3 = note.landUseRights["KHDTVT3485"];
      const heSoVT3 = note.landUseRights["KHHSVT3486"];


      const donGiaDatDGD = (giaDGD - giaCTXD) / (
        dienTichKCN * (1 - tiLeDienTichKCN) * heSoDGDKCN
        + dienTichCNBQH * (1 - tiLeDTCNBQH) * heSoDGDCNBQH
        + dienTichVT1 * heSoVT1 + dienTichVT2 * heSoVT2 + dienTichVT3 * heSoVT3
      );

      const donGiaDTT = Math.round(donGiaDatDGD) / (1 + note.totalAdjustment);

      await this.noteRepository.update(note.id, {
        closedDealValue: property.closedDealValue,
        marketLandUnitPrice: Math.round(donGiaDTT),
        closedDealUnitPrice: Math.round(donGiaDatDGD),
        updatedBy: accountId,
      });
    }
  }
}
