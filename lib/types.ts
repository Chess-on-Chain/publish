import type { Principal } from "@dfinity/principal";

interface WebsocketMessageQueue {
  method: string;
  principal: Principal;
  body: Uint8Array;
}

export interface ActorType {
  pop_messages: () => Promise<WebsocketMessageQueue[]>;
}
