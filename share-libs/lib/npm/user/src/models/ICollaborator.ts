import { IMasterValue } from "./IMasterValue";

export interface ICollaborator {
  fullName: string;

  birthday: Date;

  joinedDate: Date;

  phone: string;
  email: string;

  companyId: number | string;
  company: IMasterValue;

  collaboratorTypeId: number | string;
  collaboratorType: IMasterValue;
}
