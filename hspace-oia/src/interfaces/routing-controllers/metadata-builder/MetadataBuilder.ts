import { ControllerMetadata } from "../metadata/ControllerMetadata";
import { ActionMetadata } from "../metadata/ActionMetadata";
import { getMetadataArgsStorage } from "../index";
import { ActionMetadataArgs } from "../metadata/args/ActionMetadataArgs";
import { ParamMetadata } from "../metadata/ParamMetadata";

export class MetadataBuilder {
  buildControllerMetadata(classes?: any[]): ControllerMetadata[] {
    return this.createControllers(classes);
  }

  protected createControllers(classes?: any[]): ControllerMetadata[] {
    const controllers = !classes ? getMetadataArgsStorage().controllers : getMetadataArgsStorage().filterControllerMetadatasForClasses(classes);
    return controllers.map(controllerArgs => {
      const controller = new ControllerMetadata(controllerArgs);
      controller.options = controllerArgs.options;
      controller.actions = this.createActions(controller);

      return controller;
    });
  }

  protected createActions(controller: ControllerMetadata): ActionMetadata[] {
    let target = controller.target;
    const actionsWithTarget: ActionMetadataArgs[] = [];
    while (target) {
      actionsWithTarget.push(
        ...getMetadataArgsStorage()
          .filterActionsWithTarget(target)
          .filter((action: any) => {
            return actionsWithTarget
              .map(a => a.method)
              .indexOf(action.method) === -1;
          })
      );
      target = Object.getPrototypeOf(target);
    }
    return actionsWithTarget
      .map(actionArgs => {
        const action = new ActionMetadata(controller, actionArgs);
        action.options = { ...controller.options, ...actionArgs.options };
        action.params = this.createParams(action);

        return action;
      });
  }

  protected createParams(action: ActionMetadata): ParamMetadata[] {
    return getMetadataArgsStorage()
      .filterParamsWithTargetAndMethod(action.target, action.method)
      .map(paramArgs => new ParamMetadata(action, paramArgs));
  }
}
