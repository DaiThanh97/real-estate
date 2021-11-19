import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { InsertEvent } from "typeorm/subscriber/event/InsertEvent";
import { PropertyRatioViewName } from "../views/PropertyRatioView";
import { AppraisalStatementRatioViewName } from "../views/AppraisalStatementRatioView";

@EventSubscriber()
export class LatestApprovedNoteSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return "latest_approved_note";
  }

  async afterInsert(event: InsertEvent<any>) {
    await event.queryRunner.query(`REFRESH MATERIALIZED VIEW ${PropertyRatioViewName};`);
    await event.queryRunner.query(`REFRESH MATERIALIZED VIEW ${AppraisalStatementRatioViewName};`);
  }

  async afterUpdate(event: UpdateEvent<any>) {
    await event.queryRunner.query(`REFRESH MATERIALIZED VIEW ${PropertyRatioViewName};`);
    await event.queryRunner.query(`REFRESH MATERIALIZED VIEW ${AppraisalStatementRatioViewName};`);
  }
}
