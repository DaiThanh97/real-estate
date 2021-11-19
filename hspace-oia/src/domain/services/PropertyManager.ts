import {
  IAccountRepository,
  IEmployeeManager,
  IMasterValueRepository,
  IPropertyBookmarkRepository,
  IPropertyManager,
  IPropertyRepository
} from "./contract";
import { PropertySerializer } from "../../interfaces/serializers/PropertySerializer";
import { Account, EAccountType } from "../models/Account";
import { PropertyBookmark } from "../models/PropertyBookmark";
import constants from "../../infrastructure/config/constants";
import { plainToClass } from "class-transformer";
import { BadRequestError, NotFoundError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import {
  BusinessStatus,
  IProperty,
  PropertyPrefix,
  PropertyStatus,
} from "../../infrastructure/orm/typeorm/models/Property";
import { MasterValue } from "../models/MasterValue";
import { ILike, IsNull, Not, Repository, Raw } from "typeorm";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import { BusinessStatusType, PropertyStatusType } from "../../infrastructure/types/Property";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Service(ContainerTokens.PropertyManager)
export class PropertyManager implements IPropertyManager {
  public constructor(
    @Inject(ContainerTokens.AccountRepository)
    private accountRepository: IAccountRepository,
    @Inject(ContainerTokens.MasterValueRepository)
    private masterValueRepository: IMasterValueRepository,
    @Inject(ContainerTokens.PropertyRepository)
    private propertyRepository: IPropertyRepository,
    @Inject(ContainerTokens.PropertyBookmarkRepository)
    private propertyBookmarkRepository: IPropertyBookmarkRepository,
    @Inject(ContainerTokens.EmployeeManager)
    private employeeManager: IEmployeeManager,
  ) {
  }

  // TODO: Should use domain model instead of Dto
  public async assignSource(property: PropertySerializer, currentAccountId: number): Promise<PropertySerializer> {
    if (!property.sourceId) {
      property.sourceId = currentAccountId;
    } else {
      let sourceAccount = await this.accountRepository.findOne({ id: property.sourceId, isActive: true });

      if (sourceAccount) {
        // TODO: Should use domain model to avoid unnecessary transformation
        sourceAccount = plainToClass(Account, sourceAccount);

        if (sourceAccount.type !== EAccountType.COLLABORATOR) {
          throw new BadRequestError("Source have to be collaborator!",
            ErrorCode.Property.InvalidBrokerType);
        }
      } else {
        throw new NotFoundError("Account id is not exists!", ErrorCode.EntityNotFound);
      }
    }
    return property;
  }

  public async updateStatus(property: PropertySerializer, newStatus: PropertyStatusType): Promise<PropertySerializer> {
    const currentStatus: PropertyStatusType = property.status;
    let expectStatuses: PropertyStatusType[] = [];
    switch (newStatus) {
      case PropertyStatus.Pending:
        expectStatuses = [PropertyStatus.Drafting];
        break;
      case PropertyStatus.Approved:
        expectStatuses = [PropertyStatus.Pending, PropertyStatus.Existed, PropertyStatus.Deleted];
        break;
      case PropertyStatus.Drafting:
        expectStatuses = [PropertyStatus.Pending, PropertyStatus.Existed];
        break;
      case PropertyStatus.Rejected:
        expectStatuses = [PropertyStatus.Pending, PropertyStatus.Existed];
        break;
      default:
        throw new BadRequestError(`Property New Status [${newStatus}] is don't support!`,
          ErrorCode.Property.NotSupportStatus);
    }
    if (!expectStatuses.includes(currentStatus)) {
      throw new BadRequestError(`Current Status [${currentStatus}] don't support change new status ${newStatus}!`,
        ErrorCode.Property.InvalidStatus);
    }
    property.status = newStatus;
    return property;
  }

  public async generateCode(property: PropertySerializer): Promise<PropertySerializer> {
   
    let year = new Date().getFullYear().toString();
    year = year.substr(year.length - 2);
    const masterValue: MasterValue = await this.masterValueRepository.findOneOrFail(property.districtId);
    const code = `${PropertyPrefix}${year}${property.districtId ? masterValue.valueCode : ""}`;

    if (property.code && property.code.includes(masterValue.valueCode)) {
      return property;
    }

    const sizeCode = 4;
    const fullSizeCode = code.length + sizeCode;
    const lastProperty = await this.propertyRepository.findOne({
      where: {
        code: Raw(
          (alias: string) => `${alias} ILike :code AND Length(${alias}) = :fullSizeCode`,
          {
            code: `${code}%`,
            fullSizeCode,
          }
        ),
        districtId: property.districtId ? Not(IsNull()) : IsNull(),
      },
      order: {
        code: "DESC"
      }
    });
    let wbs = "";
    if (lastProperty && lastProperty.code) {
      const number = lastProperty.code.toUpperCase().replace(code.toUpperCase(), "");
      wbs = (Number(number) + 1).toString().padStart(sizeCode, "0");
    } else {
      wbs = "1".padStart(sizeCode, "0");
    }
    property.code = `${code}${wbs}`;
    return property;
  }

  public async initStatus(property: PropertySerializer): Promise<PropertySerializer> {
    if (!property.status) {
      property.status = PropertyStatus.Drafting;
    }

    if (property.status !== PropertyStatus.Drafting && property.status !== PropertyStatus.Pending) {
      throw new BadRequestError("Property Invalid status", ErrorCode.Property.InvalidStatus);
    }

    return property;
  }

  public async checkExistAddress(property: PropertySerializer, propertyId: number): Promise<PropertySerializer> {
    const exist = await this.propertyRepository.findOne({
      where: {
        id: Not(propertyId), // so use query findOne, we need exclude by itself in the recovery case
        districtId: property.districtId,
        cityId: property.cityId,
        wardId: property.wardId,
        streetId: property.streetId,
        streetNumber: ILike(property.streetNumber),
        status: PropertyStatus.Approved,
        isActive: true,
      }
    });

    if (exist && (!propertyId || propertyId !== exist.id)) {
      property.status = PropertyStatus.Existed;
    }

    return property;
  }

  public async updatePropertiesSameAddressPendingToExisted(property: PropertySerializer, propertyId: number): Promise<void> {
    const properties = await this.propertyRepository.find({
      where: {
        id: Not(propertyId),
        districtId: property.districtId,
        cityId: property.cityId,
        wardId: property.wardId,
        streetId: property.streetId,
        streetNumber: ILike(property.streetNumber),
        status: PropertyStatus.Pending,
        isActive: true,
      }
    });

    if (properties && properties.length > 0) {
      for (const obj of properties) {
        await this.propertyRepository.update(obj.id, {
          status: PropertyStatus.Existed,
        });
      }
    }
  }

  public async processBookmark(propertyId: number, accountId: number, employeeId: number, type: string): Promise<boolean> {
    const existOtherAccountBookmark: PropertyBookmark = await this.propertyBookmarkRepository.findOne({
      select:  ["id"],
      where: {
        propertyId,
        bookmarkerId: Not(accountId),
        isActive: true
      }
    }) as Readonly<PropertyBookmark>;
    if (existOtherAccountBookmark) {
      throw new BadRequestError("Property is exist bookmark with other account.", ErrorCode.Property.InvalidBookmarkExist);
    }
    const totalBookmark = await this.findTotalBookmarkByUser(accountId, propertyId);
    await this.employeeManager.checkLimitTotal(employeeId, totalBookmark + 1, constants.EmployeeLimit.SLQT);

    await this.propertyBookmarkRepository.updateOrCreate({
      propertyId,
      type,
      accountId,
    });
    return true;
  }

  public async processUnBookmark(propertyId: number, accountId: number): Promise<boolean> {
    const existBookmark: PropertyBookmark = await this.propertyBookmarkRepository.findOne({
      select:  ["id"],
      where: {
        propertyId,
        bookmarkerId: accountId,
        isActive: true
      }
    }) as Readonly<PropertyBookmark>;
    if (!existBookmark) {
      throw new BadRequestError("Invalid account remove bookmark not found bookmark.", ErrorCode.Property.InvalidUnBookmarkNotExist);
    }
    await this.propertyBookmarkRepository.delete({ propertyId });
    return true;
  }

  private async findTotalBookmarkByUser(accountId: number, propertyId: number): Promise<number> {
    const [_, total] = await this.propertyBookmarkRepository.findAndCount({
      where: {
        bookmarkerId: accountId,
        propertyId: Not(propertyId),
        isActive: true,
      }
    }) as [Readonly<PropertyBookmark[]>, number];
    return total;
  }

  public async getNewBusinessStatus(
    currentStatus: PropertyStatusType,
    currentBusinessStatus: BusinessStatusType,
    newBusinessStatus: BusinessStatusType,
  ): Promise<string> {
    switch (newBusinessStatus) {
      case BusinessStatus.OnSubmit: {
        const expectedStatus: PropertyStatusType[] = [PropertyStatus.Approved];
        const expectedBusinessStatus: BusinessStatusType[] = [BusinessStatus.None];
        if (expectedStatus.indexOf(currentStatus) === -1 || expectedBusinessStatus.indexOf(currentBusinessStatus) === -1) {
          throw new BadRequestError(
            `Invalid data current status must is =${expectedStatus} and business status = ${expectedBusinessStatus}!`,
            ErrorCode.Property.InvalidBusinessStatus
          );
        }
        break;
      }
      case BusinessStatus.Submitted: {
        const expectedStatus: PropertyStatusType[] = [PropertyStatus.Approved];
        const expectedBusinessStatus: BusinessStatusType[] = [BusinessStatus.OnSubmit];
        if (expectedStatus.indexOf(currentStatus) === -1 || expectedBusinessStatus.indexOf(currentBusinessStatus) === -1) {
          throw new BadRequestError(
            `Invalid data current status must is =${expectedStatus} and business status = ${expectedBusinessStatus}!`,
            ErrorCode.Property.InvalidBusinessStatus
          );
        }
        break;
      }
      default:
        throw new BadRequestError(`Property New Business Status [${newBusinessStatus}] is don't support!`,
          ErrorCode.Property.NotSupportBusinessStatus);
    }
    return newBusinessStatus;
  }

  public async updateStatusWhenCreateNote(
    property: any,
    businessStatusNew: BusinessStatusType,
    updatedBy: number,
  ): Promise<any> {
    if (property && property.id && property.businessStatus !== businessStatusNew) {
      await this.propertyRepository.update(property.id, {
        businessStatus: businessStatusNew,
        updatedBy,
      });
      return true;
    }
    return false;
  }

  public async updateStatusWhenCreateKHNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.Verifying;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenApprovedTHNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.Verified;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenCreatePDNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.Planing;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenApprovedPDNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.VerifiedPADT;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenCreateKUNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.VerifyingKSUT;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenApprovedKUNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.VerifiedKSUT;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenCreateTUNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.VerifyingTDUT;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenApprovedTUNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.VerifiedTDUT;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenCreateHDNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.VerifyingHQDT;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenApproveHDNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.VerifiedHQDT;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenCreateTLNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.VerifyingTLDA;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async updateStatusWhenApprovedTLNote(property: any, updatedBy: number): Promise<any> {
    const businessStatusNew = BusinessStatus.VerifiedTLDA;
    return await this.updateStatusWhenCreateNote(property, businessStatusNew, updatedBy);
  }

  public async generateAddressPropertyForSendNotification(propertyId: number): Promise<any> {
    const note = await this.propertyRepository.findOneOrFail({
      where: {
        id: propertyId
      },
      relations: ["ward", "district", "street"]
    }) as any;
    return {
      streetNumber: note.streetNumber,
      street: note.street.valueName,
      ward: note.ward.valueName,
      district: note.district.valueName,
    };
  }

  async beforeUpdate(
    propertyId: number,
    partialEntity: QueryDeepPartialEntity<IProperty>,
    repository: Repository<IProperty>,
  ): Promise<QueryDeepPartialEntity<IProperty>> {
    if (partialEntity.status && !partialEntity.changedStatusTime) {
      const property = await repository.findOneOrFail({
        select: ["status"],
        where: {
          id: propertyId,
        }
      });
      if (partialEntity.status !== property.status) {
        partialEntity.changedStatusTime = new Date();
      }
    }

    return partialEntity;
  }
}
