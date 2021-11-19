import { ControllerMetadataArgs } from "../metadata/args/ControllerMetadataArgs";
import { ActionMetadataArgs } from "../metadata/args/ActionMetadataArgs";
import { ParamMetadataArgs } from "../metadata/args/ParamMetadataArgs";

export class MetadataArgsStorage {
  controllers: ControllerMetadataArgs[] = [];

  actions: ActionMetadataArgs[] = [];

  params: ParamMetadataArgs[] = [];

  filterControllerMetadatasForClasses(classes: any[]): ControllerMetadataArgs[] {
    return this.controllers.filter(ctrl => {
      return classes.filter(cls => ctrl.target === cls).length > 0;
    });
  }

  filterActionsWithTarget(target: any): ActionMetadataArgs[] {
    return this.actions.filter(action => action.target === target);
  }

  filterParamsWithTargetAndMethod(target: any, methodName: string): ParamMetadataArgs[] {
    return this.params.filter(param => {
      return param.object.constructor === target && param.method === methodName;
    });
  }
}
