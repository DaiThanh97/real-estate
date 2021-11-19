import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IProjectNegotiation } from "./ProjectNegotiation";
import { IMasterValue } from "./MasterValue";


interface IProjectNegotiationActionDetail {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  action: string;
  planStep: IProjectNegotiationPlanStep;
}

interface IProjectNegotiationOpinionDetail {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  opinion: string;
  planStep: IProjectNegotiationPlanStep;
}


export interface IProjectNegotiationPlanStep {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;

  projectNegotiationId: number;
  projectNegotiation: IProjectNegotiation;

  categoryId: number;
  category: IMasterValue;
  target: string;
  result: string;
  startDate: Date;
  endDate: Date;
  brokerId: number;
  broker: IAccount;
  actionDetailId: number;
  actionDetail: IProjectNegotiationActionDetail;
  opinionDetailId: number;
  opinionDetail: IProjectNegotiationOpinionDetail;
}

export const ProjectNegotiationActionDetail = new EntitySchema<IProjectNegotiationActionDetail>({
  name: "project_negotiation_action_detail",
  tableName: "project_negotiation_action_details",
  columns: {
    ...BaseColumnSchemaPart,
    action: {
      name: "action",
      type: String,
      nullable: true,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    planStep: {
      type: "one-to-one",
      target: "project_negotiation_plan_step",
      inverseSide: "actionDetail",
    }
  }
});

export const ProjectNegotiationOpinionDetail = new EntitySchema<IProjectNegotiationOpinionDetail>({
  name: "project_negotiation_opinion_detail",
  tableName: "project_negotiation_opinion_details",
  columns: {
    ...BaseColumnSchemaPart,
    opinion: {
      name: "opinion",
      type: String,
      nullable: true,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    planStep: {
      type: "one-to-one",
      target: "project_negotiation_plan_step",
      inverseSide: "opinionDetail",
    }
  }
});

export const ProjectNegotiationPlanStep = new EntitySchema<IProjectNegotiationPlanStep>({
  name: "project_negotiation_plan_step",
  tableName: "project_negotiation_plan_steps",
  columns: {
    ...BaseColumnSchemaPart,
    categoryId: {
      name: "category_id",
      type: Number,
      nullable: true,
    },
    projectNegotiationId: {
      name: "project_negotiation_id",
      type: Number,
      nullable: true,
    },
    target: {
      name: "target",
      type: String,
      nullable: true,
    },
    result: {
      name: "result",
      type: String,
      nullable: true,
    },
    startDate: {
      name: "start_date",
      type: "date",
      nullable: true,
    },
    endDate: {
      name: "end_date",
      type: "date",
      nullable: true,
    },
    brokerId: {
      type: "int",
      name: "broker_id",
      nullable: true
    },
    actionDetailId: {
      type: "int",
      name: "action_detail_id",
      nullable: true
    },
    opinionDetailId: {
      type: "int",
      name: "opinion_detail_id",
      nullable: true
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    projectNegotiation: {
      type: "many-to-one",
      target: "project_negotiation",
      joinColumn: { name: "project_negotiation_id", referencedColumnName: "id" },
    },
    category: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "category_id", referencedColumnName: "id" },
    },
    broker: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "broker_id", referencedColumnName: "id" },
    },
    actionDetail: {
      type: "one-to-one",
      target: "project_negotiation_action_detail",
      joinColumn: { name: "action_detail_id", referencedColumnName: "id" },
    },
    opinionDetail: {
      type: "one-to-one",
      target: "project_negotiation_opinion_detail",
      joinColumn: { name: "opinion_detail_id", referencedColumnName: "id" },
    }
  }
});
