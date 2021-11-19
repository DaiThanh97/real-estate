import { Property } from "../domain/models/Property";
import { Account, EAccountType } from "../domain/models/Account";
import { AccountAccountGroup } from "../domain/models/AccountAccountGroup";
import { AccountGroup } from "../domain/models/AccountGroup";
import { AccountGroupFeature } from "../domain/models/AccountGroupFeature";
import { AccountGroupResource } from "../domain/models/AccountGroupResource";
import { AccountMenu } from "../domain/models/AccountMenu";
import { Collaborator } from "../domain/models/Collaborator";
import { Employee } from "../domain/models/Employee";
import { EmployeeLimit } from "../domain/models/EmployeeLimit";
import { EmployeeRegion } from "../domain/models/EmployeeRegion";
import { Feature } from "../domain/models/Feature";
import { GroupValue } from "../domain/models/GroupValue";
import { MasterValue } from "../domain/models/MasterValue";
import { Menu } from "../domain/models/Menu";
import { Resource } from "../domain/models/Resource";

import * as uuid from "uuid";

export const createPropertyTest = () => {
  return Property.create("PropertyId", { name: "name" }, new Date());
};

export const createAccountTest = () => {
  return Account.create(
    "AccountId",
    {
      employeeId: `122 ${uuid.v4}`,
      collaboratorId: null,
      identityName: `05.np ${uuid.v4}`,
      code: "05.np",
      displayName: `HLT-05.np ${uuid.v4}`,
      lastLoginAt: new Date(),
      type: EAccountType.EMPLOYEE,
      connectedFirebaseAuthId: `${uuid.v4}`,
    },
    {
      isActive: true,
      accountAccountGroups: null,
    },
    null,
    new Date(),
  );
};

export const createAccountAccountGroupTest = () => {
  return AccountAccountGroup.create(
    "AccountAccountGroupId",
    {
      accountGroupId: `20 ${uuid.v4}`,
      accountId: `10 ${uuid.v4}`,
    },
    createAccountTest(),
    new Date(),
  );
};

export const createAccountGroupTest = () => {
  return AccountGroup.create(
    "AccountGroupId",
    {
      isActive: true,
      code: `CODE TEST1 ${uuid.v4}`,
      name: `TEST1 ${uuid.v4}`,
      description: `description ${uuid.v4}`,
      classes: [],
      isDeleted: false,
      accountGroupResources: null,
      accountGroupFeatures: null,
    },
    new Date(),
  );
};

export const createAccountGroupFeatureTest = () => {
  return AccountGroupFeature.create(
    "AccountGroupFeatureId",
    {
      featureId: `featureId ${uuid.v4}`,
      accountGroupId: `featureId ${uuid.v4}`,
    },
    new Date(),
  );
};

export const createAccountGroupResourceTest = () => {
  return AccountGroupResource.create(
    "AccountGroupResourceId",
    {
      resourceId: `20 ${uuid.v4}`,
      accountGroupId: `1 ${uuid.v4}`,
    },
    new Date(),
  );
};

export const createAccountMenuTest = () => {
  return AccountMenu.create(
    "AccountMenuId",
    {
      name: `${uuid.v4}`,
      parentId: `${uuid.v4}`,
      resourceId: `${uuid.v4}`,
      path: `${uuid.v4}`,
    },
    new Date(),
  );
};

export const createCollaboratorTest = () => {
  return Collaborator.create(
    "Collaborator",
    {
      fullName: `${uuid.v4}`,
      birthday: new Date(),
      joinedDate: new Date(),
      phone: `${uuid.v4}`,
      email: `${uuid.v4}`,
      companyId: 1,
      collaboratorTypeId: 2,
    },
    createAccountTest(),
    new Date(),
  );
};

export const createEmployeeTest = () => {
  return Employee.create(
    "EmployeeId",
    {
      code: `${uuid.v4}`,
      fullName: `${uuid.v4}`,
      birthday: new Date(),
      joinedDate: new Date(),
      phone: `${uuid.v4}`,
      email: `${uuid.v4}`,
      departmentId: 1,
      titleId: 2,
      statusId: 3,
      managerId: `${uuid.v4}`,
      department: null,
      title: null,
      status: null,
      manager: null,
      employeeLimits: [],
      employeeRegions: [],
    },
    new Date(),
  );
};

export const createEmployeeLimitTest = () => {
  return EmployeeLimit.create(
    "EmployeeLimitId",
    {
      isActive: true,
      typeId: 1,
      employee_id: `${uuid.v4}`,
      value: 100.0,
      type: null,
    },
    new Date(),
  );
};

export const createEmployeeRegionTest = () => {
  return EmployeeRegion.create(
    "EmployeeRegionId",
    {
      isActive: true,
      cityId: 1,
      districtId: 2,
      employeeId: `${uuid.v4}`,
      city: null,
      district: null,
    },
    new Date(),
  );
};

export const createFeatureTest = () => {
  return Feature.create(
    "FeatureId",
    {
      isActive: true,
      action: `${uuid.v4}`,
      name: `${uuid.v4}`,
      description: `Liên kết xem nhóm tài khoản ${uuid.v4}`,
      resourceId: `${uuid.v4}`,
      createdBy: null,
      updatedBy: null,
    },
    new Date(),
  );
};

export const createGroupValueTest = () => {
  return GroupValue.create(
    1,
    {
      code: `MD.CITY ${uuid.v4}`,
      name: `Thành phố ${uuid.v4}`,
      parentId: 1,
      isActive: true,
    },
    new Date(),
  );
};

export const createMasterValueTest = () => {
  return MasterValue.create(
    1,
    {
      groupId: 1,
      groupCode: `${uuid.v4}`,
      groupName: `${uuid.v4}`,
      valueCode: `${uuid.v4}`,
      parentId: 0,
      isActive: true,
      valueName: `${uuid.v4}`,
      customData: null,
      groupValue: null,
      parent: null,
      children: null,
    },
    new Date(),
  );
};

export const createMenuTest = () => {
  return Menu.create(
    "MenuId",
    {
      isActive: true,
      path: `${uuid.v4}`,
      name: `Nhân sự ${uuid.v4}`,
      description: `${uuid.v4}`,
      parentId: `${uuid.v4}`,
      resourceId: `${uuid.v4}`,
      resource: null,
    },
    new Date(),
  );
};

export const createResourceTest = () => {
  return Resource.create(
    "ResourceId",
    {
      isActive: true,
      path: `employee/list ${uuid.v4}`,
      name: `${uuid.v4}`,
      model: `${uuid.v4}`,
      api: `${uuid.v4}`,
      group: `${uuid.v4}`,
      seq: 0,
      description: `Tìm nhân viên đã tạo trong hệ thống ${uuid.v4}`,
      features: null,
      createdBy: null,
      updatedBy: null,
    },
    new Date(),
  );
};
