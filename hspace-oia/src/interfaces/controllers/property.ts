import * as Hapi from "@hapi/hapi";
import Beans from "../../infrastructure/config/beans";
import { Account } from "../../domain/models/Account";
import { ClassConstructor, plainToClass } from "class-transformer";
import PropertyAppUseCases from "../../application/PropertyAppUseCases";
import {
  ChangeablePriceRequestSerializer,
  DealPropertyRequestSerializer,
  PropertyBusinessStatusSerializer,
  PropertyGeneralInfoSerializer,
  PropertyItemSerializer,
  PropertyListSerializer,
  PropertyNoteItemSerializer,
  PropertyQuerySerializer,
  PropertySerializer,
  PropertyShortItemSerializer,
  PropertyShortListSerializer,
  PropertyStatusSerializer,
} from "../serializers/PropertySerializer";
import { BusinessStatus, PropertyStatus } from "../../infrastructure/orm/typeorm/models/Property";
import { PagingSerializer } from "../serializers/PagingSerializer";
import { BasicAccountSerializer } from "../serializers/Base";
import { Controller } from "../routing-controllers/decorator/Controller";
import {
  bookmarksQuerySchema,
  dealPropertyRequestSchema,
  propertyFullInfoSchema,
  propertyGeneralInfoSchema,
  propertyGeneralQuerySchema,
  propertyNoteListSchema,
  propertyQuerySchema,
  propertyStatisticSchema,
  propertyStatusSchema,
  propertyViewListSchema,
  updatingChangeablePriceRequestSchema
} from "../schemas/property";
import {
  listBasicAccountsResponse,
  propertyGeneralResponse,
  propertyListResponse,
  propertyResponse,
  propertyShortListResponse
} from "../schemas/response";
import { Delete, Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Payload } from "../routing-controllers/decorator/Payload";
import { getResponseSchema, idSchema } from "../schemas/base";
import { Param } from "../routing-controllers/decorator/Param";
import { Request } from "../routing-controllers/decorator/Request";
import { Queries } from "../routing-controllers/decorator/Queries";
import { pagingQuerySchema } from "../schemas/query";
import { NOTIFICATION } from "../../infrastructure/config/constants/notification";
import { ACTIVITY } from "../../infrastructure/config/constants/activity";
import AccountActivityAppUseCases from "../../application/AccountActivityAppUseCases";
import { ActivityGroup } from "../../infrastructure/orm/typeorm/models/ActivityTemplate";
import { AccountActivitySerializer } from "../serializers/AccountActivitySerializer";
import { activitiesSchema } from "../schemas/accountActivity";
import { changeablePropertyPurchaseSchema, propertyPurchaseSchema } from "../schemas/properyPurchase";
import {
  ChangeablePropertyPurchaseSerializer,
  PropertyPurchaseSerializer
} from "../serializers/PropertyPurchaseSerializer";
import { changeablePropertySaleSchema, propertySaleSchema } from "../schemas/properySale";
import { ChangeablePropertySaleSerializer, PropertySaleSerializer } from "../serializers/PropertySaleSerializer";
import Joi from "joi";
import { Query } from "../routing-controllers/decorator/Query";
import { PropertyViewQuerySerializer, PropertyViewSerializer } from "../serializers/PropertyViewSerializer";

const listPropertyNoteSchemasResponse = getResponseSchema(
  propertyNoteListSchema,
  "ListPropertyNoteSchemasResponse"
);

const activitiesSchemaResponse = getResponseSchema(
  activitiesSchema,
  "ActivitiesSchemaResponse"
);

const propertyPurchaseSchemaResponse = getResponseSchema(
  propertyPurchaseSchema,
  "PropertyPurchaseSchemaResponse"
);

const propertySaleSchemaResponse = getResponseSchema(
  propertySaleSchema,
  "PropertySaleSchemaResponse"
);

const propertyViewSchemaResponse = getResponseSchema(
  propertyViewListSchema,
  "PropertyViewListSchemaResponse"
);

const propertyStatisticSchemaResponse = getResponseSchema(
  propertyStatisticSchema,
  "PropertyStatisticSchemaResponse"
);


@Controller("properties", ["property"])
export default class PropertyController {
  @Post({
    route: "/_general",
    description: "Create property with only general info",
    validateSchemas: {
      payload: propertyGeneralInfoSchema
    },
    responseSchema: propertyGeneralResponse,
    policy: {
      res: "mobile_property",
      act: "create_general_info",
    },
    platforms: ["mobile"],
  })
  public async createWithOnlyGeneralInfo(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: PropertySerializer
    }) dto: PropertySerializer,
  ): Promise<any> {
    const property = await PropertyAppUseCases.create(dto, account, serviceLocator);
    return plainToClass(PropertyGeneralInfoSerializer, property, { excludeExtraneousValues: true });
  }

  @Post({
    description: "Create property with full information",
    validateSchemas: {
      payload: propertyFullInfoSchema
    },
    responseSchema: propertyResponse,
    platforms: ["web", "mobile"],
  })
  public async createWithFullInfo(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: PropertySerializer
    }) dto: PropertySerializer,
  ): Promise<any> {
    const property = await PropertyAppUseCases.create(dto, account, serviceLocator);
    return plainToClass(PropertySerializer, property, { excludeExtraneousValues: true });
  }

  @Post({
    route: "/{id}/_deal",
    description: "Change or update deal stage of the property",
    validateSchemas: {
      params: idSchema,
      payload: dealPropertyRequestSchema,
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "deal",
    },
    platforms: ["web"],
  })
  public async deal(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: DealPropertyRequestSerializer
    }) dto: DealPropertyRequestSerializer,
  ): Promise<any> {
    const property = await PropertyAppUseCases.deal(id, dto, account, serviceLocator);
    return plainToClass(PropertySerializer, property, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_changeable_price",
    description: "Update the changeable price of the property",
    validateSchemas: {
      params: idSchema,
      payload: updatingChangeablePriceRequestSchema,
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "update_changeable_price",
    },
    platforms: ["web"],
  })
  public async updateChangeablePrice(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: ChangeablePriceRequestSerializer
    }) dto: ChangeablePriceRequestSerializer,
  ): Promise<any> {
    const property = await PropertyAppUseCases.updateChangeablePrice(id, dto, account, serviceLocator);
    return plainToClass(PropertySerializer, property, { excludeExtraneousValues: true });
  }

  @Get({
    route: "/{id}/_purchase",
    description: "Get the property purchase information with property ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: propertyPurchaseSchemaResponse,
    policy: {
      res: "property",
      act: "purchase",
    },
    platforms: ["web"],
  })
  public async getPropertyPurchase(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const propertyPurchase = await PropertyAppUseCases.getPropertyPurchase(id, serviceLocator);

    return plainToClass(PropertyPurchaseSerializer,
      propertyPurchase,
      { excludeExtraneousValues: true }
    );
  }

  @Post({
    route: "/{id}/_purchase",
    description: "Change the property purchase information with property ID",
    validateSchemas: {
      params: idSchema,
      payload: changeablePropertyPurchaseSchema,
    },
    responseSchema: propertyPurchaseSchemaResponse,
    policy: {
      res: "property",
      act: "purchase",
    },
    platforms: ["web"],
  })
  public async purchase(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: ChangeablePropertyPurchaseSerializer
    }) dto: ChangeablePropertyPurchaseSerializer,
  ): Promise<any> {
    const propertyPurchase = await PropertyAppUseCases.purchase(
      id,
      account,
      dto,
      serviceLocator
    );

    return plainToClass(PropertyPurchaseSerializer,
      propertyPurchase,
      { excludeExtraneousValues: true }
    );
  }

  @Get({
    route: "/{id}/_sale",
    description: "Get the property sale information with property ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: propertySaleSchemaResponse,
    policy: {
      res: "property",
      act: "sale",
    },
    platforms: ["web"],
  })
  public async getPropertySale(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const propertySale = await PropertyAppUseCases.getPropertySale(id, serviceLocator);

    return plainToClass(PropertySaleSerializer,
      propertySale,
      { excludeExtraneousValues: true }
    );
  }

  @Post({
    route: "/{id}/_sale",
    description: "Change the property sale information with property ID",
    validateSchemas: {
      params: idSchema,
      payload: changeablePropertySaleSchema,
    },
    responseSchema: propertySaleSchemaResponse,
    policy: {
      res: "property",
      act: "sale",
    },
    platforms: ["web"],
  })
  public async sale(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: ChangeablePropertySaleSerializer
    }) dto: ChangeablePropertySaleSerializer,
  ): Promise<any> {
    const propertySale = await PropertyAppUseCases.sale(
      id,
      account,
      dto,
      serviceLocator
    );

    return plainToClass(PropertySaleSerializer,
      propertySale,
      { excludeExtraneousValues: true }
    );
  }

  @Get({
    route: "/_truncate",
    description: "Get property list with truncate fields",
    validateSchemas: {
      query: propertyGeneralQuerySchema,
    },
    responseSchema: propertyShortListResponse,
    policy: {
      res: "mobile_property",
      act: "get_short_list"
    },
    platforms: ["mobile"],
  })
  public async getAllShortList(
    @Request() request: Hapi.Request,
  ): Promise<any> {
    const [rv, total] = await this.doGetAll(request);
    const serialize = plainToClass(PropertyShortListSerializer, rv, { excludeExtraneousValues: true });
    return {
      items: serialize,
      total
    };
  }

  @Get({
    description: "Get property list",
    validateSchemas: {
      query: propertyQuerySchema,
    },
    responseSchema: propertyListResponse,
    policy: {
      res: "property",
      act: "get_list"
    },
    platforms: ["web"],
  })
  public async getAll(
    @Request() request: Hapi.Request,
  ): Promise<any> {
    const [rv, total] = await this.doGetAll(request);
    const serialize = plainToClass(PropertyListSerializer, rv, { excludeExtraneousValues: true });
    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/{id}",
    description: "Get a property by ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "get"
    },
    platforms: ["web"],
    secure: true,
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const property = await PropertyAppUseCases.get(id, serviceLocator);
    const propertyRatio = await PropertyAppUseCases.getPropertyRatio(id, serviceLocator);
    const latestProgress = await PropertyAppUseCases.getPropertyProgress(id, serviceLocator);
    return plainToClass(PropertyItemSerializer, {
      ...property,
      propertyRatio,
      latestProgress,
    }, {
      excludeExtraneousValues: true
    });
  }

  @Get({
    route: "/{id}/_truncate",
    description: "Get a property with truncate fields by ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: propertyGeneralResponse,
    policy: {
      res: "mobile_property",
      act: "get_short"
    },
    platforms: ["mobile"],
  })
  public async getShort(
    @ServiceLocator() serviceLocator: Beans,
    @Param("id") id: number,
  ): Promise<any> {
    return await this.doGet(id, serviceLocator, PropertyShortItemSerializer);
  }

  @Put({
    route: "/{id}",
    description: "Update property with full information",
    validateSchemas: {
      params: idSchema,
      payload: propertyFullInfoSchema,
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "update",
    },
    platforms: ["web"],
  })
  public async updateWithFullInfo(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
    @Payload({
      type: PropertySerializer
    }) dto: PropertySerializer,
  ): Promise<any> {
    return await this.doUpdate(id, dto, account, serviceLocator, PropertySerializer);
  }

  @Put({
    route: "/{id}/_general",
    description: "Update property with only general info",
    validateSchemas: {
      params: idSchema,
      payload: propertyGeneralInfoSchema,
    },
    responseSchema: propertyGeneralResponse,
    policy: {
      res: "mobile_property",
      act: "update_general_info",
    },
    platforms: ["mobile"],
  })
  public async updateWithOnlyGeneralInfo(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
    @Payload({
      type: PropertySerializer
    }) dto: PropertySerializer,
  ): Promise<any> {
    return await this.doUpdate(id, dto, account, serviceLocator, PropertyGeneralInfoSerializer);
  }

  @Put({
    route: "/{id}/_rejected",
    description: "Change property rejected action",
    validateSchemas: {
      params: idSchema,
      payload: propertyStatusSchema,
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "reject",
    },
    platforms: ["web"],
  })
  public async updateRejected(
    @Request() request: Hapi.Request,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
    @Payload({
      type: PropertyStatusSerializer,
    }) dto: PropertyStatusSerializer,
  ): Promise<any> {
    const result = await this.putStatus(request, PropertyStatus.Rejected);
    PropertyAppUseCases.sendPropertyNotification(
      result,
      account,
      NOTIFICATION.BDS.TU_CHOI,
      serviceLocator
    );
    PropertyAppUseCases.triggerAccountActivity(
      result,
      account,
      ACTIVITY.BDS.TU_CHOI,
      serviceLocator,
      dto.notes,
    );
    return result;
  }

  @Put({
    route: "/{id}/_approved",
    description: "Change property approved action",
    validateSchemas: {
      params: idSchema,
      payload: propertyStatusSchema,
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "approve",
    },
    platforms: ["web"],
  })
  public async updateApproved(
    @Request() request: Hapi.Request,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const result = await this.putStatus(request, PropertyStatus.Approved);
    PropertyAppUseCases.sendPropertyNotification(
      result,
      account,
      NOTIFICATION.BDS.PHE_DUYET,
      serviceLocator,
    );
    PropertyAppUseCases.triggerAccountActivity(
      result,
      account,
      ACTIVITY.BDS.PHE_DUYET,
      serviceLocator,
    );
    return result;
  }

  @Post({
    route: "/{id}/_submit",
    description: "Submit a property by id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: propertyGeneralResponse,
    platforms: ["web", "mobile"],
  })
  public async submit(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
  ): Promise<any> {
    const data = { "id": id, "status": PropertyStatus.Pending, "notes": "Submit" };
    const dto = plainToClass(PropertyStatusSerializer, data);
    const rv = await PropertyAppUseCases.submit(dto, account, serviceLocator);
    return plainToClass(PropertyShortItemSerializer, rv, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_bookmark",
    description: "Update bookmark property",
    validateSchemas: {
      params: idSchema,
      payload: bookmarksQuerySchema
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "bookmark"
    },
    platforms: ["web"],
  })
  public async bookmark(
    @Request() request: Hapi.Request,
  ): Promise<any> {
    const createBook = true;
    return this.createOrUnBookmark(createBook, request);
  }

  @Put({
    route: "/{id}/_unBookmark",
    description: "Update unBookmark property",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "bookmark"
    },
    platforms: ["web"],
  })
  public async unBookmark(
    @Request() request: Hapi.Request,
  ): Promise<any> {
    const createBook = false;
    return this.createOrUnBookmark(createBook, request);
  }

  @Put({
    route: "/{id}/_reqOnSubmit",
    description: "Update property request on submit action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "req_on_submit"
    },
    platforms: ["web"]
  })
  public async reqOnSubmit(
    @Request() request: Hapi.Request,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    const result = await this.putBusinessStatus(request, BusinessStatus.OnSubmit);
    PropertyAppUseCases.sendPropertyNotification(
      result,
      account,
      NOTIFICATION.BDS.YEU_CAU_DINH_GIA,
      serviceLocator,
    );
    PropertyAppUseCases.triggerAccountActivity(
      result,
      account,
      ACTIVITY.BDS.YEU_CAU_DINH_GIA,
      serviceLocator,
    );
    return result;
  }

  @Put({
    route: "/{id}/_reqSubmitted",
    description: "Update property request submitted action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "req_submitted"
    },
    platforms: ["web"]
  })
  public async reqSubmitted(
    @Request() request: Hapi.Request,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    const result = await this.putBusinessStatus(request, BusinessStatus.Submitted);
    PropertyAppUseCases.sendPropertyNotification(
      result,
      account,
      NOTIFICATION.BDS.TIEP_NHAN,
      serviceLocator,
    );
    PropertyAppUseCases.triggerAccountActivity(
      result,
      account,
      ACTIVITY.BDS.TIEP_NHAN,
      serviceLocator,
    );
    return result;
  }

  @Get({
    route: "/{id}/_sources",
    description: "Get the property sources same property address",
    validateSchemas: {
      params: idSchema,
      query: pagingQuerySchema,
    },
    responseSchema: listBasicAccountsResponse,
    policy: {
      res: "property",
      act: "get_sources"
    },
    platforms: ["web"],
  })
  public async getSources(
    @ServiceLocator() serviceLocator: Beans,
    @Param("id") id: number,
    @Queries({
      type: PagingSerializer,
    }) queryOptions: PagingSerializer,
  ): Promise<any> {

    const { items, total } = await PropertyAppUseCases.getSources(id, queryOptions, serviceLocator);
    const serialize = plainToClass(BasicAccountSerializer, items, { excludeExtraneousValues: true });
    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/{id}/_notes",
    description: "Get list note of property",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: listPropertyNoteSchemasResponse,
    policy: {
      res: "property",
      act: "get_notes"
    },
    platforms: ["web"]
  })
  public async getNoteList(
    @ServiceLocator() serviceLocator: Beans,
    @Param("id") id: number,
  ): Promise<any> {
    const noteList = await PropertyAppUseCases.getNoteList(id, serviceLocator);
    const serialize = plainToClass(PropertyNoteItemSerializer, noteList, { excludeExtraneousValues: true });
    return {
      items: serialize,
    };
  }

  @Get({
    route: "/_sources/_for_approved_existed",
    description: "Get the property sources has property status 'Đã tồn tại' và 'Đã duyệt'",
    validateSchemas: {
      query: pagingQuerySchema,
    },
    responseSchema: listBasicAccountsResponse,
    policy: {
      res: "property",
      act: "get_other_sources"
    },
    platforms: ["web"]
  })
  public async getSourcesApprovedExist(
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: PagingSerializer,
    }) queryOptions: PagingSerializer,
  ): Promise<any> {
    const statuses = [PropertyStatus.Approved, PropertyStatus.Existed];
    const { items, total } = await PropertyAppUseCases.getSourcesByStatuses(
      statuses,
      queryOptions,
      serviceLocator,
    );
    const serialize = plainToClass(BasicAccountSerializer, items, { excludeExtraneousValues: true });
    return {
      items: serialize,
      total
    };
  }

  @Delete({
    route: "/{id}",
    description: "Delete property by ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: propertyResponse,
    platforms: ["web", "mobile"]
  })
  public async delete(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
  ): Promise<any> {
    const property = await PropertyAppUseCases.delete(id, account, serviceLocator);
    return plainToClass(PropertySerializer, property, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_restore",
    description: "Restore property by ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: propertyResponse,
    policy: {
      res: "property",
      act: "restore"
    },
    platforms: ["web"]
  })
  public async reqRestored(
    @Param("id") id: number,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const property = await PropertyAppUseCases.restore(id, account, serviceLocator);
    return plainToClass(PropertySerializer, property, {
      excludeExtraneousValues: true,
    });
  }

  @Get({
    route: "/{id}/_activities",
    description: "Get activities of the property",
    validateSchemas: {
      params: idSchema,
      query: pagingQuerySchema,
    },
    responseSchema: activitiesSchemaResponse,
    platforms: ["web"],
  })
  public async getActivities(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: PagingSerializer,
    }) queries: PagingSerializer,
  ): Promise<any> {
    const { items, total } = await AccountActivityAppUseCases.getActivities(
      id,
      ActivityGroup.BDS,
      queries,
      serviceLocator,
    );

    const serialize = plainToClass(
      AccountActivitySerializer,
      items,
      { excludeExtraneousValues: true },
    );

    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/_search",
    description: "Get property search",
    responseSchema: propertyViewSchemaResponse,
    policy: {
      res: "property",
      act: "get_advance_list"
    },
    platforms: ["web"],
    validateSchemas: {
      query: Joi.object().keys({
        q: Joi.string().base64().required().allow(""),
      }).label("QueryPropertyViewSearchSchema"),
    },
  })
  public async getViewSearch(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Query("q", {
      type: PropertyViewQuerySerializer
    }) query: PropertyViewQuerySerializer,
  ): Promise<any> {
    const { items, total } = await PropertyAppUseCases.getPropertyView(query, account, serviceLocator);
    const serialize = plainToClass(PropertyViewSerializer, items, { excludeExtraneousValues: true });
    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/statistics",
    description: "Get property statistics",
    platforms: ["web"],
    responseSchema: propertyStatisticSchemaResponse,
  })
  public async getStatistics(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    return await PropertyAppUseCases.getFullPropertyStatistic(account, serviceLocator);
  }

  private doGet = async (id: number, serviceLocator: Beans,
                         serializerClass: ClassConstructor<any>): Promise<any> => {
    const rv = await PropertyAppUseCases.get(id, serviceLocator);
    return plainToClass(serializerClass, rv, { excludeExtraneousValues: true });
  };

  private putStatus = async (request: Hapi.Request, status: string): Promise<any> => {
    const serviceLocator: Beans = (request.server.app as any).serviceLocator;
    const account: Account = (request.app as any).currentAccount as Account;
    const { id } = request.params as { id: number };
    if (!(request.payload as any).id) {
      (request.payload as any).id = id;
    }
    (request.payload as any).status = status;

    const dto = plainToClass(PropertyStatusSerializer, request.payload);
    const property = await PropertyAppUseCases.updateStatus(dto, account, serviceLocator);

    return plainToClass(PropertySerializer, property, { excludeExtraneousValues: true });
  };

  private doGetAll = async (request: Hapi.Request): Promise<any> => {
    const account: Account = (request.app as any).currentAccount as Account;
    const serviceLocator: Beans = (request.server.app as any).serviceLocator;
    const dto = plainToClass(PropertyQuerySerializer, request.query, { excludeExtraneousValues: true });
    return await PropertyAppUseCases.getAll(dto, account, serviceLocator);
  };

  private doUpdate = async (
    id: number,
    dto: PropertySerializer,
    account: Account,
    serviceLocator: Beans,
    serializerClass: ClassConstructor<any>
  ): Promise<any> => {
    const rv = await PropertyAppUseCases.update(id, dto, account, serviceLocator);
    return plainToClass(serializerClass, rv, { excludeExtraneousValues: true });
  };

  private createOrUnBookmark = async (createBook: boolean, request: Hapi.Request): Promise<any> => {
    const serviceLocator: Beans = (request.server.app as any).serviceLocator;
    const account: Account = (request.app as any).currentAccount as Account;
    const { id } = request.params as { id: number };
    const { type } = request.payload ? request.payload as { type: string } : {type: undefined};
    const property = await PropertyAppUseCases.createOrUnBookmark(id, account, createBook, serviceLocator, type);
    return plainToClass(PropertySerializer, property, { excludeExtraneousValues: true });
  };

  private putBusinessStatus = async (request: Hapi.Request, businessStatus: string): Promise<any> => {
    const serviceLocator: Beans = (request.server.app as any).serviceLocator;
    const account: Account = (request.app as any).currentAccount as Account;
    const { id } = request.params as { id: number };
    const dto = plainToClass(PropertyBusinessStatusSerializer, { id, businessStatus });

    const rv = await PropertyAppUseCases.updateBusinessStatus(dto, account, serviceLocator);
    return plainToClass(PropertySerializer, rv, { excludeExtraneousValues: true });
  };
}
