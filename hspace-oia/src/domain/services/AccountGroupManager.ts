import { IAccountGroupManager, IAccountGroupRepository, IBaseRepository } from "./contract";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import _ from "lodash";
import constants from "../../infrastructure/config/constants";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";


@Service(ContainerTokens.AccountGroupManager)
export class AccountGroupManager implements IAccountGroupManager {
  private noteGroupClass: string[] = [
    constants.PropertyNoteIdPrefix.InspectionStatement,
    constants.PropertyNoteIdPrefix.AppraisalStatement,
    constants.PropertyNoteIdPrefix.InspectionExpectation,
    constants.PropertyNoteIdPrefix.InvestmentPlan,
    constants.PropertyNoteIdPrefix.AppraisalExpectation,
    constants.PropertyNoteIdPrefix.InvestmentEfficiency,
    constants.PropertyNoteIdPrefix.ProjectNegotiation,
  ];

  // @see docs/noteClasses.md
  private subClasses: string[] = [
    constants.NoteSubClasses.A,
    constants.NoteSubClasses.B,
    constants.NoteSubClasses.C,
  ];

  private featureActions = {
    GUI_DUYET: "Gửi duyệt",
    DUYET: "Duyệt",
    GIAO_VIEC: "Phân công thực hiện"
  };

  private groupOne = {
    "A": [
      [this.featureActions.GIAO_VIEC, this.featureActions.DUYET],
    ],
    "B": [
      [this.featureActions.GIAO_VIEC]
    ],
    "C": [
      [this.featureActions.DUYET]
    ],
  };

  private groupTwo = {
    "A": [
      [this.featureActions.GIAO_VIEC, this.featureActions.DUYET, this.featureActions.GUI_DUYET],
      [this.featureActions.GIAO_VIEC, this.featureActions.DUYET],
      [this.featureActions.GIAO_VIEC, this.featureActions.GUI_DUYET],
    ],
    "B": [
      [this.featureActions.GIAO_VIEC]
    ],
    "C": [
      [this.featureActions.DUYET, this.featureActions.GUI_DUYET],
      [this.featureActions.DUYET],
      [this.featureActions.GUI_DUYET],
    ],
  };

  private groupRules: any = {
    "KH": this.groupOne,
    "KU": this.groupOne,
    "TH": this.groupTwo,
    "TU": this.groupTwo,
    "PD": this.groupOne,
    "HD": this.groupOne,
    "TL": this.groupOne,
    "DH": this.groupOne,
  };

  constructor(
    @Inject(ContainerTokens.AccountGroupRepository)
    private accountGroupRepository: IAccountGroupRepository,
    @Inject(ContainerTokens.AccountGroupFeatureRepository)
    private accountGroupFeatureRepository: IBaseRepository,
  ) {
  }

  public inList(arr: string[], arrOfArray: any): boolean {
    for (const el of arrOfArray) {
      if (_.isEqual(_.sortBy(arr), _.sortBy(el))) {
        return true;
      }
    }
    return false;
  }

  public async classify(accountGroupId: number): Promise<string[]> {
    const result: string[] = [];
    for (const groupClass of this.noteGroupClass) {
      const res = await this.accountGroupFeatureRepository.find({
        join: {
          alias: "accountGroupFeature",
          leftJoinAndSelect: { feature: "accountGroupFeature.feature" }
        },
        where: (qb: SelectQueryBuilder<unknown>) => {
          qb.where({
            accountGroupId,
          });
          qb.andWhere("feature.isActive = :isActive", { isActive: true });
          qb.andWhere("feature.groupClass = :groupClass", { groupClass });
        },
      });
      if (!res || res.length === 0) {
        continue;
      }

      const accFeatureActions = _.uniq(_.map(res, (el) => el.feature.action));
      const rule = this.groupRules[groupClass] as any;
      for (const subClass of this.subClasses) {
        if (this.inList(accFeatureActions, rule[subClass])) {
          result.push(`${groupClass}.${subClass}`);
        }
      }
    }

    await this.accountGroupRepository.update(accountGroupId, {
      classes: result,
    });

    return result;
  }
}
