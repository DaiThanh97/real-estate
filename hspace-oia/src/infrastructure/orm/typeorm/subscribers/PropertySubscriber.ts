import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { InsertEvent } from "typeorm/subscriber/event/InsertEvent";
import { PropertyRatioViewName } from "../views/PropertyRatioView";

@EventSubscriber()
export class PropertySubscriber implements EntitySubscriberInterface {
  listenTo() {
    return "property";
  }

  async afterInsert(event: InsertEvent<any>) {
    await event.queryRunner.query(`REFRESH MATERIALIZED VIEW ${PropertyRatioViewName};`);
  }

  async afterUpdate(event: UpdateEvent<any>) {
    await event.queryRunner.query(`REFRESH MATERIALIZED VIEW ${PropertyRatioViewName};`);
  }
}
