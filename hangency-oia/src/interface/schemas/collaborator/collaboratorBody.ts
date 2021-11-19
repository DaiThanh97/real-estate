import Joi from "joi";

export const collaboratorBodySchema = Joi.object()
  .keys({
    fullName: Joi.string().normalize(),
    birthday: Joi.date(),
    joinedDate: Joi.date(),
    phone: Joi.string(),
    email: Joi.string().email(),
    companyId: Joi.number().optional().allow(null),
    collaboratorTypeId: Joi.number().optional().allow(null),
    // for create account
    isActive: Joi.bool(),
    accountAccountGroups: Joi.array()
      .items({
        accountGroupId: Joi.string(),
      })
      .label("addingAccountAccountGroupItemsSchema"),
  })
  .label("collaboratorBodySchema");
