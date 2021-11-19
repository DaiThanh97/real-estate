import { getResponseWrapperSchema } from "./shared/base";
import { msgSchema } from "./msg";

export const msgResponse = getResponseWrapperSchema(msgSchema, "MsgResponse");
