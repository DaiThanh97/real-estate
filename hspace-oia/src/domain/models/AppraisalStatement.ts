import { BaseModel } from "./Base";
import { Account } from "./Account";
import { Contains, IsBoolean, IsNotEmpty, IsNumber, IsPositive, validateOrReject } from "class-validator";
import constants from "../../infrastructure/config/constants";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { plainToClass } from "class-transformer";
import logger from "../../infrastructure/logger";

export const AppraisalStatementStatus = {
  Drafting: "Nháp",
  Finished: "Hoàn thành",
  Pending: "Chờ duyệt",
  Approved: "Đã duyệt",
  Rejected: "Từ chối",
  Deleted: "Đã xoá",
} as const;

export const AppraisalStatementType = {
  Current: "Hiện trạng",
  Estimate: "Ước tính",
} as const;

export const AppraisalStatementCommentType = {
  Appraiser: "Người thẩm định",
  Controller: "Người kiểm soát",
  AppraisalBoard: "Hội đồng thẩm định",
};

export const AppraisalStatementAuditType = {
  Address1: "Địa chỉ 1",
  Address2: "Địa chỉ 2",
  Address3: "Địa chỉ 3",
  TSTD: "Khảo sát thẩm định",
};

export class AppraisalAuditDetail extends BaseModel {
  type: string;
  inspectionStatementId: number;
  propertyId: number;
  propertyInfo: string;
  useRightCertificate: string;
  construction: string;

  address: string;
  totalAdjustment : number;
  marketLandUnitPrice: number;
  totalLevelsAdvantage: number; 
  totalLevelsDisadvantage: number; 

  advantageLevels : string;
  disadvantageLevels: string;

  adjustments: string;
}

export class AppraisalStatement extends BaseModel {
  @Contains(constants.PropertyNoteIdPrefix.AppraisalStatement)
  noteId: string;

  version: string;

  @IsNotEmpty()
  noteType: string;

  executionDate: Date;

  assigneeId: number;

  companyId: number;

  instructorId: number;
  @IsNotEmpty()
  status: string;
  @IsBoolean()
  isDeleted: boolean;

  approvedAt: Date;
  approvedBy: Account;

  completedAt: Date;
  completedBy: Account;

  rejectedAt: Date;
  rejectedBy: Account;
  rejectionNote: string;

  @IsPositive()
  inspectionStatementId: number;
  @IsPositive()
  propertyId: number;
  @IsNotEmpty()
  address: string;
  streetNumber: string;
  @IsPositive()
  cityId: number;
  @IsPositive()
  districtId: number;
  @IsPositive()
  wardId: number;
  @IsPositive()
  streetId: number;

  property: any;

  comments: {
    type: string,
    comment: string,
  };

  auditDetails: AppraisalAuditDetail[];

  landUnitPricePPSS: number; // Đơn giá đất thẩm định (PPSS)
  @IsNumber()
  propertyUnitPricePPSS: number; // Giá trị tài sản thẩm định (PPSS)
  landUnitPricePPDG: number; // Đơn giá đất thẩm định (PPĐG)
  @IsNumber()
  propertyUnitPricePPDG: number; //

  resultAuditPPSS: string;

  generalInfoPPDG: string;
  adjustControlPPDG: string;
  resultAuditPPDG: string;

  public static async validate(note: any) {
    try {
      const data = plainToClass(AppraisalStatement, note);
      return await validateOrReject(data);
    } catch (err) {
      logger.error("Appraisal Statement Validation: ", err);
      throw new BadRequestError("Appraisal statement error fields.", ErrorCode.AppraisalStatement.InvalidFields);
    }
  }
}
