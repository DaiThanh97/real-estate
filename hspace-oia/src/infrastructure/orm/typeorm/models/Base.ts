import { EntitySchemaColumnOptions, EntitySchemaRelationOptions } from "typeorm";

export const BaseColumnSchemaPart = {
  id: {
    type: Number,
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: "created_at",
    type: "timestamp without time zone",
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: "updated_at",
    type: "timestamp without time zone",
    updateDate: true,
  } as EntitySchemaColumnOptions,
};


export const AccountLogColumnSchemaPart = {
  createdBy: {
    type: "many-to-one",
    target: "account",
    joinColumn: { name: "created_by" },
  } as EntitySchemaRelationOptions,
  updatedBy: {
    type: "many-to-one",
    target: "account",
    joinColumn: { name: "updated_by" },
  } as EntitySchemaRelationOptions,
};

export const ActiveStatusColumnSchemaPart = {
  isActive: {
    name: "is_active",
    type: Boolean,
    default: true,
    nullable: false,
  },
};


export const BasePropertyNote = {
  version: {
    type: "varchar",
    name: "version",
    length: 8,
    default: "1.000"
  } as EntitySchemaColumnOptions,
  noteId: {
    name: "note_id",
    type: String,
    nullable: true,
  } as EntitySchemaColumnOptions,
  noteType: {
    name: "note_type",
    type: String,
    nullable: true,
  } as EntitySchemaColumnOptions,
  executionDate: {
    name: "execution_date",
    type: Date,
    nullable: true,
  } as EntitySchemaColumnOptions,
  assigneeId: {
    name: "assignee_id",
    type: Number,
    nullable: true,
  } as EntitySchemaColumnOptions,
  companyId: {
    name: "company_id",
    type: Number,
    nullable: true,
  } as EntitySchemaColumnOptions,
  instructorId: {
    name: "instructor_id",
    type: Number,
    nullable: true,
  } as EntitySchemaColumnOptions,
  status: {
    name: "status",
    type: String,
    nullable: true,
  } as EntitySchemaColumnOptions,
  isDeleted: {
    name: "is_deleted",
    type: Boolean,
    default: false,
  } as EntitySchemaColumnOptions,
  rejectionNote: {
    name: "rejection_note",
    type: String,
    default: "",
  } as EntitySchemaColumnOptions,
  propertyId: {
    name: "property_id",
    type: Number,
    nullable: true,
  } as EntitySchemaColumnOptions,
  approvedAt: {
    name: "approved_at",
    type: Date,
    nullable: true,
  } as EntitySchemaColumnOptions,
  rejectedAt: {
    name: "rejected_at",
    type: Date,
    nullable: true,
  } as EntitySchemaColumnOptions,
  classes: {
    name: "classes",
    type: "jsonb",
    nullable: true,
  } as EntitySchemaColumnOptions,
  topicId: {
    type: Number,
    name: "topic_id",
    nullable: true,
  } as EntitySchemaColumnOptions,
  changedStatusTime: {
    type: Date,
    name: "changed_status_time",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  } as EntitySchemaColumnOptions,
};

export const RelationsOfNoteSchemaPart = {
  approvedBy: {
    type: "many-to-one",
    target: "account",
    joinColumn: { name: "approved_by", referencedColumnName: "id" },
  } as EntitySchemaRelationOptions,
  property: {
    type: "many-to-one",
    target: "property",
    joinColumn: { name: "property_id", referencedColumnName: "id" },
  } as EntitySchemaRelationOptions,
  assignee: {
    type: "many-to-one",
    target: "account",
    joinColumn: { name: "assignee_id", referencedColumnName: "id" },
  } as EntitySchemaRelationOptions,
  company: {
    type: "many-to-one",
    target: "masterValue",
    joinColumn: { name: "company_id", referencedColumnName: "id" },
  } as EntitySchemaRelationOptions,
  instructor: {
    type: "many-to-one",
    target: "account",
    joinColumn: { name: "instructor_id", referencedColumnName: "id" },
  } as EntitySchemaRelationOptions,
  rejectedBy: {
    type: "many-to-one",
    target: "account",
    joinColumn: { name: "rejected_by", referencedColumnName: "id" },
  } as EntitySchemaRelationOptions,
  topic: {
    type: "many-to-one",
    target: "topic",
    joinColumn: { name: "topic_id", referencedColumnName: "id" }
  } as EntitySchemaRelationOptions,
};

export const BasePropertyAddressNote = {
  address: {
    type: String,
    name: "address",
    nullable: true,
  },
  streetNumber: {
    type: String,
    name: "street_number",
    length: 64,
    nullable: true
  },
  cityId: {
    type: Number,
    name: "city_id",
    nullable: true
  },
  districtId: {
    type: Number,
    name: "district_id",
    nullable: true
  },
  wardId: {
    type: Number,
    name: "ward_id",
    nullable: true
  },
  streetId: {
    type: Number,
    name: "street_id",
    nullable: true
  },
};

export const RelationsPropertyAddressOfNoteSchema = {
  city: {
    type: "many-to-one",
    target: "masterValue",
    joinColumn: {name: "city_id", referencedColumnName: "id"},
  } as EntitySchemaRelationOptions,
  district: {
    type: "many-to-one",
    target: "masterValue",
    joinColumn: {name: "district_id", referencedColumnName: "id"},
  } as EntitySchemaRelationOptions,
  ward: {
    type: "many-to-one",
    target: "masterValue",
    joinColumn: {name: "ward_id", referencedColumnName: "id"},
  } as EntitySchemaRelationOptions,
  street: {
    type: "many-to-one",
    target: "masterValue",
    joinColumn: {name: "street_id", referencedColumnName: "id"},
  } as EntitySchemaRelationOptions,
};

export const BaseColumnSourceNote = {
  sourceId: {
    type: Number,
    name: "source_id",
    nullable: true,
  },
};

export const BaseTemplate = {
  group: {
    type: "varchar",
    length: 128,
    nullable: true,
    name: "group",
  } as EntitySchemaColumnOptions,
  action: {
    type: "varchar",
    length: 128,
    nullable: true,
    name: "action",
  } as EntitySchemaColumnOptions,
  raw: {
    type: String,
    name: "raw",
    nullable: true,
  } as EntitySchemaColumnOptions,
  isActive: {
    name: "is_active",
    type: Boolean,
    default: true,
    nullable: false,
  } as EntitySchemaColumnOptions,
  description: {
    type: String,
    name: "description",
    nullable: true,
  } as EntitySchemaColumnOptions,
};
