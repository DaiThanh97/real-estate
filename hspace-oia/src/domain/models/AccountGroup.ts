import { Feature } from "./Feature";
import { Resource } from "./Resource";
import { ConflictError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { AccountGroup as AccountGroupModelLib } from "@halato/user/lib/models";

export {
  AccountGroupFeature,
  AccountGroupResource,
} from "@halato/user/lib/models";

export class AccountGroup extends AccountGroupModelLib {
  static checkFeatures(resources: Resource[], features: Feature[]) {
    for (const feature of features) {
      const found = resources.some(
        (el: Resource) => el.id === feature.resourceId
      );
      if (!found)
        throw new ConflictError(
          `The feature is not valid: ${feature.id}`,
          ErrorCode.AccountGroup.FeatureInvalid
        );
    }
  }
}
